import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

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
      if(this.rolMenu[key].ruta == "/personas"){
        indice = key;
      }
    }
    this.index = indice;
  }

}
