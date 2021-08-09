import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  sideBarOpen= false;
  ngOnInit(){
    if(this.currentUser == null){
      this.logout();
    }
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
