import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { RolService } from '../services/rol/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router,
    private rolService: RolService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      
  }

  currentUser: User;
  rolMenu: any = [];

  ngOnInit() {
    this.obteneMenuRol(this.currentUser.usuarioId);
  }

  obteneMenuRol(rolId) {
    if (localStorage.getItem("currentMenu") === null) {
      this.rolService.getRolMenu(rolId).subscribe(
        response => {
          this.rolMenu = response['menu'];
          localStorage.setItem("currentMenu", JSON.stringify(response['menu']));
        }, error => {
          console.log("Error al obtener los menus por ID del rol: " + error)
        }
      );
    }
    this.rolMenu = JSON.parse(localStorage.getItem("currentMenu"));
    console.log(this.rolMenu);
  }

}
