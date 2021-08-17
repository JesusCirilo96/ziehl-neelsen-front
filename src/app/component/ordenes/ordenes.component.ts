import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { RecepcionService } from 'src/app/services/recepcion/recepcion.service';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class OrdenesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private recepcionService: RecepcionService, private adapter: DateAdapter<any>) { }

  Fecha: string;

  recepcion: any = [];
  cols: any[];

  recepcionColumns: string[] = [
    'ficha',
    'paciente',
    'total',
    'restante',
    'finalizado',
    'impreso',
    'entregado',
    'horaIngreso',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();


  ngOnInit() {
    this.Fecha = this.getToday();
    this.getRecepcion();
    this.dataSource.paginator = this.paginator;
  }

  getRecepcion() {
    this.recepcionService.getRecepcionFecha(this.Fecha).subscribe(
      res => {
        this.recepcion = res;
        console.log(this.recepcion)
        this.dataSource.data = this.recepcion;
      },
      err => console.error(err)
    )
  }

  filtrarPorDia(fecha){
    this.getDate(fecha)
    this.recepcionService.getRecepcionFecha(this.Fecha).subscribe(
      res => {
        this.recepcion = res;
        this.dataSource.data = this.recepcion;
      },
      err => console.error(err)
    )
  }

  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hoy;
    hoy = yyyy + '-' + mm + '-' + dd;
    return hoy;
  }

  getDate(val) {
    console.log(val);
    var mes = parseInt(val._i.month + 1);
    var formatMes = String(mes);
    var dia = val._i.date;
    if(mes < 10){
      formatMes = "0" + mes;
    }
    if(dia < 10){
      dia = "0" + dia;
    }
    var fecha = val._i.year + "-" + formatMes +"-" + dia ;
    this.Fecha = fecha;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
