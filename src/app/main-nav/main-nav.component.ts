import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { RolService } from '../services/rol/rol.service';
/*import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';*/

@Component({
  selector: 'app-navigation',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  currentUser: User;

  rolMenu: any = [];

/* isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}*/
  constructor(
      private router: Router,
      private rolService: RolService,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.obteneMenuRol(this.currentUser.usuarioId);
  }

  obteneMenuRol(rolId){
    this.rolService.getRolMenu(rolId).subscribe(
      response =>{
        this.rolMenu = response['menu']
      },error =>{
        console.log("Error al obtener los menus por ID del rol: " + error)
      }
    );
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

 

}
