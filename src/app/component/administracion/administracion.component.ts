import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.rolMenu = JSON.parse(localStorage.getItem("currentMenu"));
    this.getIndex();
  }

  index:number;
  rolMenu: any = [];

  getIndex(){
    var indice;
    for(var key in this.rolMenu){
      if(this.rolMenu[key].ruta == "/administracion"){
        indice = key;
      }
    }
    this.index = indice;
  }

}
