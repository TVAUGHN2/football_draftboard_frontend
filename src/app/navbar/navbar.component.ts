import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signInText: string = "Sign In";
  constructor(public authService: AuthService) {

   }

  ngOnInit() {
      this.signInText = "Hi " + this.authService.getUser()["fname"] + "!";
  }

}
