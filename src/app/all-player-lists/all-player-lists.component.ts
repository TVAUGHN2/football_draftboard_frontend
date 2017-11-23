import { Component, OnInit, Input} from '@angular/core';
import { PlayerRankingsService } from '../player-rankings.service';
import { Ranking, Player} from '../data.model';


@Component({
  selector: 'app-all-player-lists',
  templateUrl: './all-player-lists.component.html',
  styleUrls: ['./all-player-lists.component.css']
})
export class AllPlayerListsComponent implements OnInit {
  ranking: Ranking;
  selectedPlayers: {}[] = [];
  receivedData: any[] =[];


  constructor(public playerRankingsService: PlayerRankingsService) {
    
  }

    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  displayOptions() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  getRanking(type: string){
    this.ranking = new Ranking(type, this.playerRankingsService.getResults(type));
  }

  transferDataSuccess($event: any) {
    this.receivedData.push(JSON.parse($event.dragData)); //data comes over as a single string, so need to parse it for json
    
    //remove player from current list and add to selected list
    var player = this.receivedData[this.receivedData.length-1];
    //console.log("transferData");
    //console.log(player);
    this.playerRankingsService.selectPlayer(player["gsisPlayerId"], player["position"]);

    //refresh current list
    this.ranking = new Ranking(this.ranking.type, this.playerRankingsService.getResults(this.ranking.type));
    this.selectedPlayers = this.playerRankingsService.getSelected();
  }

  transferBackDataSuccess($event: any) {
    //console.log("in trasfer back data");
    this.receivedData.push(JSON.parse($event.dragData)); //data comes over as a single string, so need to parse it for json
    
    //remove player from current list and add to selected list
    var player = this.receivedData[this.receivedData.length-1];
    this.playerRankingsService.unselectPlayer(player["gsisPlayerId"], player["position"]);
    
    //refresh current list
    this.ranking = new Ranking(this.ranking.type, this.playerRankingsService.getResults(this.ranking.type));
    this.selectedPlayers = this.playerRankingsService.getSelected();

  }



  ngOnInit() {
    //default list to OVERALL
    this.ranking = new Ranking("OVERALL", this.playerRankingsService.getResults("OVERALL"));
    this.selectedPlayers = this.playerRankingsService.getSelected();
  }

}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  var e = <HTMLElement>event.target;
  if (!e.matches('.dropbtn')) {
  
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.onbeforeunload = function(e) {
  return 'Dialog text here.';

};

