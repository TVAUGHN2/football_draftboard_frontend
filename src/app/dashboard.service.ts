import { Injectable } from '@angular/core';
import { CURRENT_DASHBOARDS, CURRENT_DASHBOARDS_PLAYERS} from './data.model';
import { PlayerRankingsService } from './player-rankings.service';
import { DraftersService } from './drafters.service';
import { AuthService } from './auth.service';
import { Drafter } from './data.model';

//server-side function 
declare const getData: any;
var db_data;

@Injectable()
export class DashboardService {
  dashboards: {} = {};
  playerRankings: {} = {};

  constructor(public authService: AuthService, public playerRankingsService: PlayerRankingsService, public draftersService: DraftersService) { 

    var dbJson = JSON.parse(localStorage.getItem(CURRENT_DASHBOARDS));
    //see if can load from cache
    if(dbJson != null){
      this.dashboards = dbJson;
    }
    else{ //load from databases
      console.log(getData("dashboard"));

      
     
      
    }

    var prJson = JSON.parse(localStorage.getItem(CURRENT_DASHBOARDS_PLAYERS));
    //see if can load from cache
    if(prJson != null){
      this.playerRankings = prJson;
    }
    else{ //load from database
      
    }

  }

  addDashboard(username: string, dashboardName: string, dashboard: {}){
    /* Populate Dashboards */
    // ensure no possible way to add dashboard without a name
    // user form handles this, but login/logout can still try and pass
    if (dashboardName != ""){
      // check if this is the first dashboard being added
      if (this.dashboards[username] == null){
        var db = {};
        db[dashboardName] = dashboard;
        // console.log("db");
        // console.log(db);
        // console.log("this.dashboards before db");
        // console.log(this.dashboards);
        this.dashboards[username] = db;
      }
      else{
        this.dashboards[username][dashboardName] = dashboard;
      }

      // console.log("this dashboard");
      // console.log(this.dashboards);

      // console.log("stringify dashboard");
      // console.log(JSON.stringify(this.dashboards));
  
  
      //temporarily store
      // console.log("storing db");
      localStorage.setItem(CURRENT_DASHBOARDS,JSON.stringify(this.dashboards));

      // console.log("locally stored db in if");
      // console.log(localStorage.getItem(CURRENT_DASHBOARDS));
    }
    // console.log("locally stored db");
    // console.log(localStorage.getItem(CURRENT_DASHBOARDS));

  }
   

  updateDashboard(){
    var username = this.authService.getUser()['username'];
    var dashboardName = this.draftersService.getDashboardName()
    var dashboard = {drafters: this.draftersService.getDrafters(),
                     profileDrafter: this.draftersService.getProfileDrafter()};

    console.log("update dashboard")
    console.log(dashboard);
    this.addDashboard(username, dashboardName, dashboard);
    
    //username not has 0 player rankings
    /* Populate Player Rankings */
    var selected = [];
    var remaining = [];

    this.playerRankingsService.getSelected().forEach(ranking =>{
      selected.push(ranking);
    });

    this.playerRankingsService.getRemaining().forEach(ranking =>{
      remaining.push(ranking);
    });

    if (this.playerRankings[username] == null){
      var pr = {};
      pr[dashboardName] = {selected: selected, 
                          remaining: remaining};
      this.playerRankings[username] = pr;
    }
    else{
      this.playerRankings[username][dashboardName] = {selected: selected, 
                                                      remaining: remaining};
    }
    
    //temporarily store
    localStorage.setItem(CURRENT_DASHBOARDS,JSON.stringify(this.dashboards));
    localStorage.setItem(CURRENT_DASHBOARDS_PLAYERS,JSON.stringify(this.playerRankings));
    
  }

  removeDashboard(username: string, dashboardName: string){
    delete this.dashboards[username][dashboardName];

    //remove player rankings assoicated with the dashboard
    if(this.playerRankings[username] != null && this.playerRankings[username][dashboardName] != null){
        delete this.playerRankings[username][dashboardName];
    }

    //temporarily store
    localStorage.setItem(CURRENT_DASHBOARDS,JSON.stringify(this.dashboards));
    localStorage.setItem(CURRENT_DASHBOARDS_PLAYERS,JSON.stringify(this.playerRankings));
    
  }

  getDashboard(username: string, dashboardName: string): {}{
    return this.dashboards[username][dashboardName];
  }

  getDashboards(username): {}{
    return this.dashboards[username];
  }

  getDashboardRankings(username: string, dashboardName: string){
    console.log("local storage in select");
    console.log(localStorage.getItem(CURRENT_DASHBOARDS_PLAYERS))
    return this.playerRankings[username][dashboardName];
  }

  getAllDashboardRankings(username: string){
    return this.playerRankings[username];
  }

  getEverything(){
    return ({dashboard: this.dashboards, rankings: this.playerRankings});
  }

  loadDashboards(db_data: string){
    console.log("in load dashboards")
    this.dashboards = JSON.parse(db_data)['db_data'];
  }
}
