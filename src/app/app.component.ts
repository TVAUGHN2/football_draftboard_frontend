import { Component } from '@angular/core';
import { PlayerRankingsService } from './player-rankings.service';
import * as Cookies from 'es-cookie';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  

  constructor(public playerRankingsService: PlayerRankingsService){
    this.playerRankingsService.search();
    console.log("cookies all:");
    console.log(Cookies.getAll());

    
  }

}
