import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {DescuentoService} from '../../../../services/descuento/descuento.service';

@Component({
  selector: 'app-descuento-view',
  templateUrl: './descuento-view.component.html',
  styleUrls: ['./descuento-view.component.css']
})
export class DescuentoViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private descuentoService: DescuentoService) { }

  descuento: any = [];
  cols: any[];

  displayedColumns: string[] = [
    'examen_general',
    'descuento',
    'dias',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  ngOnInit() {
    this.getAllMetodo();
  }

  getAllMetodo(){
    this.descuentoService.getDescuentos().subscribe(
      res => {
        console.log(res);
        this.descuento = res;
        this.dataSource.data = this.descuento;
      },
      err => console.error(err)
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
