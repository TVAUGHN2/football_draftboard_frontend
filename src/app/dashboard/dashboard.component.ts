import { Component, OnInit, Input } from '@angular/core';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';
import { AuthService } from '../auth.service'
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, 
              public playerRankingsService: PlayerRankingsService, 
              public draftersService: DraftersService,
              public dashboardService: DashboardService) {
   }

  ngOnInit() {
    //only try and get players if a dashboard has been created
    if(this.draftersService.drafters.length > 0){
      this.draftersService.updateDraftPicks(this.playerRankingsService.getSelected());

      //if user signed in, update local storage with players
      if(this.authService.getUser()['username']){
        this.dashboardService.updateDashboard();
      }
    }
  }

  
}