import { Component, OnInit } from '@angular/core';
import { ChatMessages } from '../data.model';

import { PlayerRankingsService } from '../player-rankings.service';
import { DraftersService } from '../drafters.service';
import { ByeWeekService } from '../bye-week.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit{
    chatMessages: ChatMessages;
    messagesNotUsed: string[];
    displayMsgs: {}[];
    isCollapsed: boolean;

    constructor(public playerRankingsService: PlayerRankingsService, 
                public draftersService: DraftersService, 
                public authService: AuthService) {
      this.chatMessages = new ChatMessages();
      this.messagesNotUsed = this.chatMessages.chatMessages.slice();
      this.displayMsgs = [];
      this.isCollapsed = true;
    }

    respond(userMsgHtml: HTMLInputElement): void{
      var userMsg = userMsgHtml.value;
      userMsgHtml.value = ""; //reset text

      //record user message
      this.displayMsgs.push({msg: userMsg, type: "user", time: new Date(Date.now()).toLocaleString()}); //return newMsg

      //reload messages if empty
      if (this.messagesNotUsed.length == 0){
        this.messagesNotUsed = this.chatMessages.chatMessages.slice(); 
        //console.log("orig chat msg length: " + this.chatMessages.chatMessages.length);
      }   

      var newMsgs = [];

      if(userMsg == "-h"){
        newMsgs = this.help();
      }

      else if(userMsg.slice(0,2) == "-f"){
        newMsgs = this.find(userMsg.slice(3));
      }

      else if(userMsg == "-ndp"){
        newMsgs = this.ndp();
      }

      else{
        //finding new message randomly
        var randNum = Math.floor(Math.random() * (this.messagesNotUsed.length));
        var newMsg = this.messagesNotUsed[randNum]
        newMsgs.push("Not a valid command, so you will get one of my random musings.");
        newMsgs.push(newMsg);

        //remove random message so not used again
        this.messagesNotUsed.splice(this.messagesNotUsed.indexOf(newMsg),1);
         
      }

      //output bot messages
      newMsgs.forEach(msg=>{
        this.displayMsgs.push({msg: msg, type: "bot", time: new Date(Date.now()).toLocaleString()});
      });

      //console.log("randNum: " + randNum);
      //console.log("msg length: " + this.messagesNotUsed.length);
      //console.log("new msg: " + newMsg);
     

      


      //console.log("num of display msgs: " + this.displayMsgs.length);
    }

    isUser(msg: {}): boolean{
      if (msg["type"] == "user"){
        return true;
      }
      return false;
    }

    collapse(): boolean{
      this.isCollapsed = !this.isCollapsed;
      return this.isCollapsed;
    }


    /*** Functions to retreview answers to requests ***/
    help(): string[]{
      var msgs: string[] = []
      for(var cmd in this.chatMessages.newChatMessages){
          msgs.push(this.chatMessages.newChatMessages[cmd]["cmd"] + " | Description: " 
                    + this.chatMessages.newChatMessages[cmd]["desc"]);
      }
      return msgs;
    };

    find(argStr: string): string []{
      var argArr = argStr.split(" ");
      var pos = "OVERALL";
      var team = "";
      var error = false;

      if(argArr[2] != null){
        if (argArr[2].slice(0, 4) == "pos="){
          pos = argArr[2].slice(4);
        }
  
        else if (argArr[2].slice(0,5) == "team="){
          team = argArr[2].slice(5);
        }

        else{
          error = true;
        }
      }

      if(argArr[3] != null){
        if (argArr[3].slice(0, 4) == "pos="){
          pos = argArr[3].slice(4);
        }
  
        else if (argArr[3].slice(0,5) == "team="){
          team = argArr[3].slice(5);
        }

        else{
          error = true;
        }
      }      

      var players = this.playerRankingsService.findPlayer(argArr[0], argArr[1], pos, team);
      var msgs = [];

      if (error){
        msgs.push("Incorrect search parameters for the -f (find) function.");
      }
      else{
        var playerCnt = 0;
        for (var type in players){
          players[type].forEach(player => {
            var msgStr = ++playerCnt + ".) " 
            msgStr+= player["firstName"] + " ";
            msgStr+= player["lastName"] + " | ";
            msgStr+= "Team: " + player["teamAbbr"] + " | ";
            msgStr+= "Rank: " + player["rank"] + " | ";
            msgStr+= "Position Rank: " + player["indivRank"] + " | ";
            msgStr+= "Bye: " + player["bye"] + " | ";
            msgStr+= "Selected: ";
            msgStr+= (player["taken"] == null || player["taken"] == "" ? "Still Available" : player["taken"]);
            msgStr+= (player["taken"] == null || player["taken"] == "" ? "" : 
                        " | Drafted By: " + this.draftersService.draftedBy(parseInt(player["taken"])));
            msgs.push(msgStr);
            //msgs.push(JSON.stringify(player));
          });
        }

        if (msgs.length ==0){
          msgs.push("No Players Found.");
        }
      }
      return msgs;

    }

    //number of drafted players
    ndp(): string[]{
      var msgs = [];
      msgs.push("NDP = " + this.playerRankingsService.getSelected().length)
      return msgs;
    }

    selectPlayer(name: string, pos: string = "", team: string = ""){
        name = name.toUpperCase(); //case-insensitive
        pos = pos.toUpperCase(); //case-insensitive
        team = team.toUpperCase(); //case-insensitive
    }

    unselectPlayer(name: string, pos: string = "", team: string = ""){
        name = name.toUpperCase(); //case-insensitive
        pos = pos.toUpperCase(); //case-insensitive
        team = team.toUpperCase(); //case-insensitive
    }

    //top available players
    tap(strNum: string = "5", pos: string = "OVERALL"){
        var num = parseInt(strNum);
        pos = pos.toUpperCase(); //case-insensitive

        if (pos == "QB"){

        }
        else{

        }
    }


    ngOnInit(){
      //this.isCollapsed = true;
    }
}
