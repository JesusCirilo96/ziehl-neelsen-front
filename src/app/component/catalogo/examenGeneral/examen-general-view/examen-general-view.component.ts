import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { ExamenGeneralService } from '../../../../services/examenGeneral/examen-general.service';

@Component({
  selector: 'app-examen-general-view',
  templateUrl: './examen-general-view.component.html',
  styleUrls: ['./examen-general-view.component.css']
})
export class ExamenGeneralViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private examenService: ExamenGeneralService) { }

  examenGeneral: any = [];
  cols: any[];

  examenGeneralColumns: string[] = [
    'nombre',
    'alias',
    'precio',
    'categoriaId',
    'accion'
  ];

  dataSource = new MatTableDataSource<Element>();


  ngOnInit() {
    this.getAllExamenGeneral();
    this.dataSource.paginator = this.paginator;
  }

  getAllExamenGeneral() {
    this.examenService.getExamenesGenerales().subscribe(
      res => {
        this.examenGeneral = res;
        this.dataSource.data = this.examenGeneral;
      },
      err => console.error(err)
    )
  }

  activoOinactivo(estado) {
    var aux = 'Inactivo';
    if (estado == '1') {
      aux = 'Activo';
    }
    return aux;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
