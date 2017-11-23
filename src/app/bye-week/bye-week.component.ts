import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Drafter } from '../data.model';

@Component({
  selector: 'app-bye-week',
  templateUrl: './bye-week.component.html',
  styleUrls: ['./bye-week.component.css']
})
export class ByeWeekComponent implements OnInit {
  
  @Input() profileDrafter: Drafter;
  byeWeeks: {}[] =  
          [
            {week:1,count: 0},
            {week:2, count: 0},
            {week:3, count: 0},
            {week:4, count: 0},
            {week:5, count: 0},
            {week:6, count: 0},
            {week:7, count: 0},
            {week:8, count: 0},
            {week:9, count: 0},
            {week:10, count: 0},
            {week:11, count: 0},
            {week:12, count: 0},
            {week:13, count: 0}
          ]
            

  constructor(private cdr: ChangeDetectorRef) {
    //this.profileDrafter = new Drafter("placeholder", 1);
    //this.populateByeWeekCount();
  }

  populateByeWeekCount() {
    //console.log("profile drafter");
    //console.log(this.profileDrafter);
    var byes = this.profileDrafter.getByeCount();
    for(var i = 0; i < this.byeWeeks.length; i++){
      //console.log("bye week: " + this.byeWeeks[i]["week"]);
      //console.log("bye count: " + byes[this.byeWeeks[i]["week"]])
      
      if(byes[this.byeWeeks[i]["week"]]){
        this.byeWeeks[i]["count"] = byes[this.byeWeeks[i]["week"]];
      }
    }


  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.message = 'all done loading :)'
    this.cdr.detectChanges();
  }

}
