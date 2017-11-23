import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ByeWeekService } from './bye-week.service';
import { CURRENT_SELECTED_PLAYERS, CURRENT_REMAINING_PLAYERS, CURRENT_DASHBOARDS_PLAYERS } from './data.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerRankingsService {
  
  private nflEditorRankingsURL = "http://api.fantasy.nfl.com/v1/players/editordraftranks?format=json&count=100";


  //creating variables for optimization purposes so don't have to keep filtering and slicing everytime
  overallResults: {}[] = []; 
  selectedPlayers: {}[] = [];
  selectedPlayersIndiv: {}[] = []; //to track where to add back

  private resultMappings: {} = {};
  private byes: {} = {}

  constructor(private http: Http, private byeWeekService: ByeWeekService) {
    
    this.byeWeekService.search(); //ensure this variable is populated
    this.byes = this.byeWeekService.getByeWeeks();

    //***Check if player lists are cached and if so re-instate */
    var json = JSON.parse(sessionStorage.getItem(CURRENT_SELECTED_PLAYERS));
    if(json != null){
      json.forEach(item => {
        this.selectedPlayers.push(item);
      });
    }

    var remainingJson = JSON.parse(sessionStorage.getItem(CURRENT_REMAINING_PLAYERS));
    if(remainingJson != null){
      this.overallResults = [];
      remainingJson.forEach(item => {
        this.overallResults.push(item);
      });
    }

    //console.log("findPlayer: Drew Brees")
    //console.log(this.findPlayer("drew", "brees", "qb", "ATL"));

  }

  search(): Promise<any>{
    //if already cached then use cached list, otherwise grab a new list
    if (sessionStorage.getItem(CURRENT_REMAINING_PLAYERS) == null){
      //console.log("cache is empty");
      //grabbing new list
      this.overallResults = [];
      this.selectedPlayers = [];
      //return 1000 player rankings
      let promise = new Promise((resolve, reject) => {
        for (var i = 0; i < 2000; i+=100){
          //creating REST call
          this.http.get(this.nflEditorRankingsURL + "&offset=" + i).toPromise().then(
              res => { // Success     
                  var jsonResult = res.json()["players"]; //grab array of search results from json
                  jsonResult.forEach(result => {
                      //add bye week
                      result["bye"] = this.byes[result["teamAbbr"]];
                      
                      //create copy of list
                      var newMap = {};
                      for (var i in result)
                       newMap[i] = result[i];

                      //load overall rankings
                      this.overallResults.push(newMap);
                  });
                  resolve();
                }
          )};
      }).then(() => [this.addIndivRank()]); //load positional lists)
      
      return promise;
    }

    return null;
  }
  
  getResults(position: string, mode: string = "normal"): any[]{
    if(mode == "normal"){
      if(position == "OVERALL"){
        return this.overallResults.slice(0,50);
      }
      else{
        var filteredList = this.overallResults.filter(function(result){
          return result["position"] == position;
        });
  
        return filteredList.slice(0,50);
      }
    }

    //for future expansion if want to do idp
    else{

    }

    return [];

  }

  getRemaining(){
    return this.overallResults;
  }

  getSelected(){
    return this.selectedPlayers;
  }

  clearSelected(){
    //need to load temporary list and then iterate over temporary list to avoid mutating list
    //we are iterating over
    var tmpPlayer = [];
    this.selectedPlayers.forEach(player => {
      tmpPlayer.push(player);
    });

    tmpPlayer.forEach(player => {
      this.unselectPlayer(player["rank"], player["position"]);
    });
  }

  selectPlayer(gsisPlayerId: string, position: string){
    var overallIndex= 0;
    var offset = 0;

    //find player from overall list
    this.overallResults.forEach(player => {
      if(player["gsisPlayerId"] == gsisPlayerId){
        overallIndex = this.overallResults.indexOf(player);
      }
    }); 

    //add player as selected and remove from overall list
    var player = this.overallResults.splice(overallIndex, 1)[0];
    player["taken"] = this.selectedPlayers.length + 1 + ""; //because pushing
    //console.log(player);
    this.selectedPlayers.push(player);

    sessionStorage.setItem(CURRENT_SELECTED_PLAYERS, JSON.stringify(this.selectedPlayers));
    sessionStorage.setItem(CURRENT_REMAINING_PLAYERS, JSON.stringify(this.overallResults));
  }

  unselectPlayer(gsisPlayerId: string, position: string){
    var selectedIndex= 0;
    var offset = 0;
    var overallIndex = 0;
    var startIndex = this.selectedPlayers.length - 1;
    var player = this.selectedPlayers[startIndex - offset];
    var taken = 0;
  
    this.selectedPlayers.forEach(p => {
      if(p["gsisPlayerId"] == gsisPlayerId){
        player = p;
        selectedIndex = this.selectedPlayers.indexOf(p);
      }
      
    })

    //check if edge case (first ranked on remaining list)
    if(parseInt(this.overallResults[0]["rank"]) < this.selectedPlayers[selectedIndex]["rank"]){
      //get the insertion index back into overall list 
      this.overallResults.forEach(overallResult =>{
        //compare to 0 so only overwrite it once
        if(parseInt(overallResult["rank"]) > this.selectedPlayers[selectedIndex]["rank"] && overallIndex == 0){
          return overallIndex = this.overallResults.indexOf(overallResult);
        }
      });
    }

    //reset because hasn't been taken
    player = this.selectedPlayers.splice(selectedIndex, 1);
    player = player[0];
    player["taken"] = ""; 

    //re-rank taken
    this.selectedPlayers.forEach(player => {
      player["taken"] = ++taken + "";
    });


    //add player
    this.overallResults.splice(overallIndex, 0, player);

    //cache results
    sessionStorage.setItem(CURRENT_SELECTED_PLAYERS, JSON.stringify(this.selectedPlayers));
    sessionStorage.setItem(CURRENT_REMAINING_PLAYERS, JSON.stringify(this.overallResults));

  }

  //returns player, their info, and what list they came from
  findPlayer(firstName: string, lastName: string, pos: string = "OVERALL", team: string = ""): {}{
    var players = {};

    var filters = [["firstName", firstName], ["lastName", lastName]]
    if(pos != "OVERALL"){
      filters.push(["position", pos]);
    }
    if(team != ""){
      filters.push(["teamAbbr", team]);
    }

    players["remaining"] = this.findPlayerRemaining(filters);
    players["selected"] = this.findPlayerSelected(filters);

    //console.log("filters");
    //console.log(filters);
    //console.log("results");
    //console.log(players);

    return players;
  }

  filterItems(filters, playerList){
    return playerList.filter(function(val){
      //iterate through all filters and return false everything unless where all filters match
      for(var i = 0; i < filters.length; i++){
        if(val[filters[i][0]].toUpperCase() != filters[i][1].toUpperCase()){    
          return false;
        }
      }
      return true;
    });
  }

  setRankings(playerRankings: {}){
    //clear cache
    //cache results
    sessionStorage.removeItem(CURRENT_SELECTED_PLAYERS);
    sessionStorage.removeItem(CURRENT_REMAINING_PLAYERS);


    //only replace player rankings if at least one player has been selected
    if (playerRankings != null && playerRankings["selected"].length > 0){
      this.selectedPlayers = [];
      this.overallResults = [];

      //console.log("setRankings: playerRankings");
      //console.log(playerRankings);

      playerRankings["selected"].forEach(player =>{
        this.selectedPlayers.push(player);
      });

      playerRankings["remaining"].forEach(player => {
        this.overallResults.push(player);
      });
    }
    //otherwise get the most recent players
    else{
      //console.log("in setRankings: this.search()")
      this.search();
    }

    //cache results
    sessionStorage.setItem(CURRENT_SELECTED_PLAYERS, JSON.stringify(this.selectedPlayers));
    sessionStorage.setItem(CURRENT_REMAINING_PLAYERS, JSON.stringify(this.overallResults));
  }

  private capitalizeString(s: string){
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
  private findPlayerRemaining(filters: string[][]): {}[]{
    return this.filterItems(filters, this.overallResults);
  }

  private findPlayerSelected(filters: string[][]): {}[]{
    return this.filterItems(filters, this.selectedPlayers);
  }

  

  private addIndivRank(){
    var qbCount = 0; var rbCount = 0; var wrCount = 0;
    var teCount = 0; var defCount = 0; var kCount = 0;

    this.overallResults.forEach(result => {
      result["taken"] = ""; //add field so all data is consistent
      if(result["position"] == "QB" && result["rank"] > 0){
        result["indivRank"] = ++qbCount + "";
      }
      else if(result["position"] == "RB" && result["rank"] > 0){
        result["indivRank"] = ++rbCount + "";
      }
      else if(result["position"] == "WR" && result["rank"] > 0){
        result["indivRank"] = ++wrCount + "";
      }

      
      else if(result["position"] == "TE" && result["rank"] > 0){
        result["indivRank"] = ++teCount + "";
      }
      else if(result["position"] == "DEF" && result["rank"] > 0){
        result["indivRank"] = ++defCount + "";
      }

      else if(result["position"] == "K" && result["rank"] > 0){
        result["indivRank"] = ++kCount + "";
      }   
    });

  }
}

