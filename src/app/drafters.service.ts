import { Injectable } from '@angular/core';
import { 
  Drafter, 
  CURRENT_DRAFTERS, 
  CURRENT_PROFILE_DRAFTER,
  CURRENT_DASHBOARD_NAME
} from './data.model';

@Injectable()
export class DraftersService {
  dashboardName: string = "";
  drafters: Drafter[] = [];
  profileDrafter: Drafter;
  constructor() {
    //check if anything is cached and if so use it to reinstate drafters
    var draftersJson = JSON.parse(sessionStorage.getItem(CURRENT_DRAFTERS));
    if(draftersJson != null){
      draftersJson.forEach(item => {
        this.drafters.push(new Drafter(item["name"], 
                                       item["draftPosition"], 
                                       item["isProfile"], 
                                       item["picks"]));
      });
    }

    //check if anything is cached and if so use it to reinstate profile drafter
    var profileJSON = JSON.parse(sessionStorage.getItem(CURRENT_PROFILE_DRAFTER));
    if(profileJSON != null){
      this.profileDrafter = new Drafter(profileJSON["name"], 
                                        profileJSON["draftPosition"], 
                                        profileJSON["isProfile"], 
                                        profileJSON["picks"])
    }

    if (sessionStorage.getItem(CURRENT_DASHBOARD_NAME) != null){
      this.dashboardName = sessionStorage.getItem(CURRENT_DASHBOARD_NAME);
    }
  }

  setDrafters(dashboardName: string, drafterMaps: {}, profileNum: number){
    this.dashboardName = dashboardName;
    this.drafters = [];
    this.profileDrafter = null;
    for (var draftPick in drafterMaps){
      var drafter = new Drafter(drafterMaps[draftPick], parseInt(draftPick), false); 
      if(parseInt(draftPick) == profileNum){
        drafter["isProfile"] = true;
        this.profileDrafter = drafter;
      }
      this.drafters.push(drafter);
    }

    //since not guaranteed keys will be in order by draft pick. sort to confirm.
    this.drafters.sort(function(a, b){
      return a["draftPosition"] - b["draftPosition"];
    });

    
    //save in case of browser refresh
    sessionStorage.setItem(CURRENT_DASHBOARD_NAME,this.dashboardName);
    sessionStorage.setItem(CURRENT_DRAFTERS, JSON.stringify(this.drafters));
    sessionStorage.setItem(CURRENT_PROFILE_DRAFTER, JSON.stringify(this.profileDrafter));
  }

  setDraftersService(dashboardName: string , drafters: Drafter[], profileDrafter: Drafter){
    this.dashboardName = dashboardName;
    this.drafters = [];
    this.profileDrafter = null;

    //console.log("profile drafter before");
    //console.log(this.profileDrafter);
    //set values individually to guarantee Drafter object signature
    console.log("The current profile drafter BEFORE making the change.  In setDrafterService:");
    console.log(this.profileDrafter);
    console.log("");
    this.profileDrafter = new Drafter(profileDrafter["name"], 
                                      profileDrafter["draftPosition"], 
                                      profileDrafter["isProfile"],  
                                      profileDrafter["picks"])
    //this.profileDrafter["draftPosition"] = profileDrafter["draftPosition"];
    //this.profileDrafter["isProfile"] = profileDrafter["isProfile"];
    //this.profileDrafter["name"] = profileDrafter["name"];
    //this.profileDrafter.picks = profileDrafter["picks"];
    console.log("The current profile drafter AFTER making the change");
    console.log(this.profileDrafter);
    console.log("");


    //console.log("profile drafter after");
    //console.log(this.profileDrafter);

    //add drafters
    drafters.forEach(drafter =>{
      this.drafters.push(new Drafter(drafter["name"], 
      drafter["draftPosition"], 
      drafter["isProfile"], 
      drafter["picks"]))

      console.log("Individual drafters from dashboard being loaded:");
      console.log(drafter);
    });
    console.log("*** END OF setDraftersService ***");


    //save in case of browser refresh
    sessionStorage.setItem(CURRENT_DASHBOARD_NAME,this.dashboardName);
    sessionStorage.setItem(CURRENT_DRAFTERS, JSON.stringify(this.drafters));
    sessionStorage.setItem(CURRENT_PROFILE_DRAFTER, JSON.stringify(this.profileDrafter));
  }

  getDashboardName(){
    return this.dashboardName;
  }
  getDrafters(){
    return this.drafters;
  }

  clearpicks(){
    this.drafters.forEach(drafter=>{
      for(var pick in drafter["picks"]){
        drafter["picks"][pick]["player"] = {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""};
      }
    });
  }

  clearDashboard(){
    this.dashboardName = "";
    this.profileDrafter = new Drafter("", 0);
    this.drafters = [];

    sessionStorage.removeItem(CURRENT_DASHBOARD_NAME);
    sessionStorage.removeItem(CURRENT_DRAFTERS);
    sessionStorage.removeItem(CURRENT_PROFILE_DRAFTER);
  }

  draftedBy(pick: number): string {
    var n = this.drafters.length;
    var rounds = 16;
    var roundPicked = Math.floor(((pick-1) / n)) + 1;
    // console.log("n: " + n);
    // console.log("pick: " + pick);
    // console.log ("floor: " + Math.floor(pick / (n+1)));
    // console.log("round picked: " + roundPicked);

    //if taken in odd round
    if (roundPicked % 2 == 1){
      //console.log("(pick - 1) % n: " + (pick - 1) % n);
      return this.drafters[(pick - 1) % n]["name"];
    }
    //else even round
    else{
      return this.drafters[n - 1  - ((pick - 1) % n)]["name"];
    }
  }

  //assumes an ordered list is entered
  updateDraftPicks(selectedPicks: {}[]){
    //clear picks in case any players have been removed
    this.clearpicks();

    this.updateSnake(selectedPicks);

    //save in case of browser refresh
    sessionStorage.setItem(CURRENT_DASHBOARD_NAME,this.dashboardName);
    sessionStorage.setItem(CURRENT_DRAFTERS, JSON.stringify(this.drafters));
    sessionStorage.setItem(CURRENT_PROFILE_DRAFTER, JSON.stringify(this.profileDrafter));

    //future cases add other methods (auction drafts for instance
  }

  updateSnake(selectedPicks: {}[]){
    var n = this.drafters.length;
    var round = 0;

    for (var pick = 0; pick < selectedPicks.length; pick++){
      //NEED CODE TO FLIP ISSNAKEBACK
      if (pick % n == 0) {round++;}
      
      //odd number rounds are normal
      if (round % 2 == 1){
        this.drafters[pick % n].picks[round - 1]["player"] = selectedPicks[pick];

        if(this.drafters[pick % n].isProfile){
          this.profileDrafter = this.drafters[pick % n];
        }
      }

      //even number rounds are snakeback
      else{
        this.drafters[n - 1 - (pick % n)].picks[round - 1]["player"] = selectedPicks[pick];

        if(this.drafters[n - 1 - (pick % n)].isProfile){
          this.profileDrafter = this.drafters[n - 1 - (pick % n)];
        }
      }


    }


  }

  getProfileDrafter(): Drafter{
    return this.profileDrafter;
  }

}
