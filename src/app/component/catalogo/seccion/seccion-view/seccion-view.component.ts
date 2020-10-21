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
    this.dataSource.paginator = this.paginator;
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
