import { Component, OnInit, ViewChild,HostBinding } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import { CategoriaService } from 'src/app/services/categoria/categoria.service';


@Component({
  selector: 'app-categoria-view',
  templateUrl: './categoria-view.component.html',
  styleUrls: ['./categoria-view.component.css']
})
export class CategoriaViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private categoriaService: CategoriaService) { }

  seccion: any = [];
  cols: any[];

  displayedColumns: string[] = [
    'nombre', 
    'orden',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  ngOnInit() {
    this.getAllCategoria();
    this.dataSource.paginator = this.paginator;
  }

  getAllCategoria(){
    this.categoriaService.getCategorias().subscribe(
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
