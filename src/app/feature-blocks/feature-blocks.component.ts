import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-feature-blocks',
  templateUrl: './feature-blocks.component.html',
  styleUrls: ['./feature-blocks.component.css']
})
export class FeatureBlocksComponent implements OnInit {
  createDashboardOverlayHidden: boolean = true;
  namesOverlayHidden: boolean = true;
  viewDashboardOverlayHidden: boolean = true;

  model: {} = {dashboardName: "", numDrafters: 0, profilePick: 0, names: {}};
  viewModel: {} = {};

  totalNumList: number[] = [4,6,8,10,12,14];
  playerPickList: number[] = [];

  dashboardViews: {}[] = [];

  constructor(public authService: AuthService, 
              public playerRankingsService: PlayerRankingsService, 
              public draftersService: DraftersService,
              public dashboardService: DashboardService) 
  {
    var dbs = this.dashboardService.getDashboards(this.authService.getUser()['username']);
    //console.log(dbs);
    for (var key in dbs){
      if (key != ""){
        var db = dbs[key];   
        this.dashboardViews.push({dbName: key, drafterCount: db["drafters"].length, 
                                  profilePick: db["profileDrafter"].draftPosition});
      }
    }
  }



  onSelect(dashboardName){
    var db = this.dashboardService.getDashboard(this.authService.getUser()['username'], dashboardName)

    //ensure any changes to dashboard are captured
    this.dashboardService.updateDashboard();

    //set dashboard to selected dashboard
    this.draftersService.setDraftersService(dashboardName, db["drafters"], db["profileDrafter"]);
    
    //update player rankings based on new dashboard
    //console.log("getDashboardRankings");
    //console.log(this.dashboardService.getDashboardRankings(this.authService.getUser()['username'], dashboardName))
    this.playerRankingsService.setRankings(
      this.dashboardService.getDashboardRankings(
        this.authService.getUser()['username'], 
        dashboardName
    ));

    console.log("after select")
    console.log(this.playerRankingsService.getSelected());
    this.changeOverlay("view"); 

  }

  onDelete(dashboardName){
    this.dashboardService.removeDashboard(this.authService.getUser()['username'], dashboardName);
    
    /* Remove from view */
    //find index number to remove from array
    var i = -1;
    this.dashboardViews.forEach(dbView => {
      if(dbView['dbName'] == dashboardName){
        i = this.dashboardViews.indexOf(dbView);
        return;
      }
    });
    //remove from array
    this.dashboardViews.splice(i,1);

    //remove dashboard from current view if db being deleted is same
    if(dashboardName == this.draftersService.getDashboardName()){
      this.draftersService.clearDashboard(); 
    }
  }

  onSubmit(type: string) { 
    if(this.model["numDrafters"] == 0){
      alert("Please enter the number of people drafting.");
      this.clear();
    }
    else if(this.model["profilePick"] == 0){
      alert("Please enter your draft pick.");
      this.clear();
    }
    else{ //valid entries
      this.changeOverlay(type);
      if(type == "questions"){
        this.changeOverlay("names"); //unhide names form
      }
      //creating dashboard
      else if (type == "names"){
        //clear selected list when a new dashboard is create
        this.playerRankingsService.clearSelected();
        console.log(this.playerRankingsService.getSelected());



        this.draftersService.setDrafters(this.model["dashboardName"], this.model["names"], this.model["profilePick"]);
        this.dashboardService.addDashboard(this.authService.getUser()['username'], 
                                           this.model["dashboardName"], 
                                          {drafters: this.draftersService.getDrafters(), 
                                           profileDrafter: this.draftersService.getProfileDrafter()});
        this.dashboardViews.push({dbName: this.model["dashboardName"], 
                                  drafterCount: this.draftersService.getDrafters().length, 
                                  profilePick: this.draftersService.getProfileDrafter()})
      }
    } 
  } 

  onCancel(type: string) { 
    this.changeOverlay(type); 
    this.clear();

    if(type == "names"){
      this.changeOverlay("questions"); //go back to questions form;
    }
  }

  clear(){
    this.playerPickList = [];
    this.model["numDrafters"] = 0;
    this.model["profilePick"] = 0;
    this.model["names"] = {};
  }
  

  changeOverlay(type: string) {
    if(type == "questions"){
      this.createDashboardOverlayHidden = !this.createDashboardOverlayHidden;
    }
    else if(type == "names"){
      this.namesOverlayHidden = !this.namesOverlayHidden;
    }
    else if(type == "view"){
      this.viewDashboardOverlayHidden = !this.viewDashboardOverlayHidden;
    }

  }

  populatePickList(e: any){
    //refresh list
    this.playerPickList = [];
    this.model["names"] = {};
    var n = e;

    for(var i = 1; i <= n; i++){
      this.playerPickList.push(i);
      this.model["names"][i] = "";
    }

  }

  ngOnInit() {
  }

}
