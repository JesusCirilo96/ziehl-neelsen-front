import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {SubSeccionService} from '../../../../services/subSeccion/sub-seccion.service';


@Component({
  selector: 'app-sub-seccion-view',
  templateUrl: './sub-seccion-view.component.html',
  styleUrls: ['./sub-seccion-view.component.css']
})
export class SubSeccionViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private subSeccionService: SubSeccionService) { }

  seccion: any = [];

  displayedColumns: string[] = [
    'nombre', 
    'orden',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  ngOnInit() {
    this.getAllSeccion();
  }

  getAllSeccion(){
    this.subSeccionService.getSubSecciones().subscribe(
      res => {
        this.seccion = res;
        this.dataSource.data = this.seccion;
      },
      err => console.error(err)
    )
  }

  deleteSeccion(id:number){
    this.subSeccionService.deleteSubSeccion(id).subscribe(
      res=>{
        console.log(res);
        this.getAllSeccion();
      },
      err=>{
        console.log(err);
      }
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
