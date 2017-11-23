import { Component, OnInit } from '@angular/core';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';

declare const server_logout: any

@Component({
  selector: 'app-logout-btn',
  templateUrl: './logout-btn.component.html',
  styleUrls: ['./logout-btn.component.css']
})
export class LogoutBtnComponent implements OnInit {

  constructor(public playerRankingsService: PlayerRankingsService, public draftersService: DraftersService) { }

  ngOnInit() {
  }

  logout(): boolean {
    //location.reload(); //refresh browser (refreshes nav bar name)

    sessionStorage.clear();
    this.draftersService.clearDashboard(); //clear current dashboard
    this.playerRankingsService.clearSelected(); //clear current selected players
    
    server_logout(); //logout of server
    return false;
  }
}
