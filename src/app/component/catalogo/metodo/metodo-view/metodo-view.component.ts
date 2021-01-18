import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {MetodoService} from '../../../../services/metodo/metodo.service';

@Component({
  selector: 'app-metodo-view',
  templateUrl: './metodo-view.component.html',
  styleUrls: ['./metodo-view.component.css']
})
export class MetodoViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private metodoService: MetodoService) { }

  metodo: any = [];
  cols: any[];

  displayedColumns: string[] = [
    'nombre', 
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  ngOnInit() {
    this.getAllMetodo();
  }

  getAllMetodo(){
    this.metodoService.getMetodos().subscribe(
      res => {
        this.metodo = res;
        this.dataSource.data = this.metodo;
      },
      err => console.error(err)
    )
  }

  activoOinactivo(estado){
    var aux = 'Inactivo';
    if(estado == '1'){
      aux = 'Activo';
    }
    return aux;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
