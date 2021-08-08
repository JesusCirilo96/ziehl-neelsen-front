import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor() { }

  index:number;
  rolMenu: any = [];

  ngOnInit() {
    this.rolMenu = JSON.parse(localStorage.getItem("currentMenu"));
    this.getIndex();
  }

  getIndex(){
    var indice;
    for(var key in this.rolMenu){
      if(this.rolMenu[key].ruta == "/examen"){
        indice = key;
      }
    }
    this.index = indice;
  }

}
