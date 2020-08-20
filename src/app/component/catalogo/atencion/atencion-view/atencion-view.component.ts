import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {AtencionService} from '../../../../services/atencion/atencion.service';


@Component({
  selector: 'app-atencion-view',
  templateUrl: './atencion-view.component.html',
  styleUrls: ['./atencion-view.component.css']
})
export class AtencionViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private atencionService: AtencionService ) { }

  atencion: any = [];
  cols: any[];

  atencionColumns: string[] = [
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();


  ngOnInit() {
    this.getAllAtencion();
    this.dataSource.paginator = this.paginator;
  }

  getAllAtencion() {
    this.atencionService.getAtenciones().subscribe(
      res => {
        this.atencion = res;
        this.dataSource.data = this.atencion;
      },
      err => console.error(err)
    )
  }

  deleteAtencion(id: number) {
    this.atencionService.deleteAtencion(id).subscribe(
      res => {
        console.log(res);
        this.getAllAtencion();
      },
      err => {
        console.log(err);
      }
    )
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
