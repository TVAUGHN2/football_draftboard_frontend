import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';

// declare google analytics
declare const ga: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  message: string;
  loginTxt: string;
  forgotTxt: string;
  isCreatingProfile: boolean = false;

  @Input() loginOverlayHidden: boolean;

  model: {} = {username: "", password: ""};

  constructor(public authService: AuthService, 
              public draftersService: DraftersService, 
              public playerRankingsService: PlayerRankingsService) {
    this.message = '';
    this.loginTxt = "Login";
    this.forgotTxt = "Forgot Password";
  }

  login(): boolean {
    this.message = '';
    if (!this.authService.login(this.model["username"], this.model["password"])) {
      console.log("in incorrect");
      this.message = 'Incorrect credentials.';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }

    else{
      ga('send', { hitType: 'event', eventCategory: 'csc436', eventAction: 'login', eventLabel: 'authorized'});
      this.draftersService.clearDashboard();
      this.changeOverlay();
      location.reload(); //refresh browser (refreshes nav bar name)
    }
    
    return false;

    
  }

  logout(): boolean {

    location.reload(); //refresh browser (refreshes nav bar name)

    sessionStorage.clear();
    this.draftersService.clearDashboard(); //clear current dashboard
    this.playerRankingsService.clearSelected(); //clear current selected players

    this.changeOverlay();
    return false;
  }

  exit(){
    this.changeOverlay();
  }



  changeOverlay() {
    this.loginOverlayHidden = !this.loginOverlayHidden;
    
  }

  onCancel(type: string) { 
    if(type == "login"){
      //code to go back to dashboard
      this.changeOverlay();

    }
    else if (type =="cancel"){
      this.isCreatingProfile = false;
    }

    this.clear();
  }

  clear(){
    this.model["username"] = "";
    this.model["password"] = "";
  }

  createProfile(){
    this.isCreatingProfile = true;
  }

  ngOnInit(){

  }
}
