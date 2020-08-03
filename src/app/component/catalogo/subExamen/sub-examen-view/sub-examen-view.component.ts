import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { SubExamenService } from '../../../../services/subExamen/sub-examen.service';


@Component({
  selector: 'app-sub-examen-view',
  templateUrl: './sub-examen-view.component.html',
  styleUrls: ['./sub-examen-view.component.css']
})
export class SubExamenViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private subExamenService: SubExamenService) { }

  examen: any = [];

  examenColumns: string[] = [
    'nombre',
    'orden',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();


  ngOnInit() {
    this.getAllSubExamen();
    this.dataSource.paginator = this.paginator;
  }

  getAllSubExamen() {
    this.subExamenService.getSubExamenes().subscribe(
      res => {
        this.examen = res;
        this.dataSource.data = this.examen;
      },
      err => console.error(err)
    )
  }

  deleteExamen(id: number) {
    this.subExamenService.deleteSubExamen(id).subscribe(
      res => {
        console.log(res);
        this.getAllSubExamen();
      },
      err => {
        console.log(err);
      }
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
