import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../auth.service';
//server-side function declared in server's index.html
declare const save: any;


@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  constructor(public dashboardService: DashboardService, public authService: AuthService) { }

  ngOnInit() {
  }

  saveAll(){
    this.dashboardService.updateDashboard();
    var db_data = JSON.stringify(this.dashboardService.getDashboards(this.authService.getUser()["username"]));
    var ranking_data = JSON.stringify(this.dashboardService.getAllDashboardRankings(this.authService.getUser()["username"]));

    console.log("saveAll data");
    console.log("  user:");
    console.log(this.authService.getUser());
    console.log("  db_data:");
    console.log(db_data);
    console.log("  ranking_data:");
    console.log(ranking_data);
    console.log("  all dashboard data:");
    console.log(this.dashboardService.getEverything())
    //send to back-end database
    save(db_data, "dashboard");
    save(ranking_data, "ranking");
  }

}
