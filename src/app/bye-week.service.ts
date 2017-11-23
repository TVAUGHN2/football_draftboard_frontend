import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CURRENT_BYE_WEEKS } from './data.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ByeWeekService {
  //use defense as it's only 32 items long each week
  //so much quicker to search
  private nflByeWeekRootUrl = "http://api.fantasy.nfl.com/v1/players/editorweekranks?&week="
  private nflByeWeekEndUrl = "&position=DEF&format=json";

  byeWeeks: {} = {};

  constructor(private http: Http) {
  }

  search(): Promise<any>{
      //only research if nothing is cached
        let promise = new Promise((resolve, reject) => {
          //hard-coded for 17 weeks for nfl schedule
          var j = 0;
          for (var i = 1; i < 18; i++){
            //creating REST call
            
            this.http.get(this.nflByeWeekRootUrl  +  i + this.nflByeWeekEndUrl).toPromise().then(
                res => { // Success
                    var week = this.getUrlWeek(res.url);
                    var jsonResult = res.json()["players"]; //grab array of search results from json
                    jsonResult.forEach(result => {
                        //capture team name and bye week
                        if(result["opponentTeamAbbr"]=="Bye"){
                          this.byeWeeks[result["teamAbbr"]] = week;
                        }
                    });
                    resolve();
                  }
          )};
        });
        return promise;
  }

  getByeWeeks(){
    return this.byeWeeks;
  }

  //helper function to extract week since var i's scope is not guaranteed by time get request returns
  private getUrlWeek(url: string){
    //get two chars after week=
    var week = url.substring(url.indexOf("week=") + 5, url.indexOf("week=") + 7);
    //remove & if exists
    week.substring(week.length - 1) == "&" ? week = week.substring(0,week.length - 1) : week;

    return week;
  }

}
