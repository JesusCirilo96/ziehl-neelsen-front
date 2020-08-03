import { Component, OnInit, ViewChild,HostBinding } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {SeccionesService} from '../../../../services/secciones.service';

@Component({
  selector: 'app-seccion-view',
  templateUrl: './seccion-view.component.html',
  styleUrls: ['./seccion-view.component.css']
})

export class SeccionViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private seccionesService: SeccionesService) { }

  seccion: any = [];
  cols: any[];

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
    this.seccionesService.getSecciones().subscribe(
      res => {
        this.seccion = res;
        this.dataSource.data = this.seccion;
      },
      err => console.error(err)
    )
  }

  deleteSeccion(id:number){
    this.seccionesService.deleteSeccion(id).subscribe(
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
