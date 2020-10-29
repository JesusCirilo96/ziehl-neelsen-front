import { Component, OnInit, ViewChild,HostBinding } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {RolService} from '../../../../services/rol/rol.service';

@Component({
  selector: 'app-rol-view',
  templateUrl: './rol-view.component.html',
  styleUrls: ['./rol-view.component.css']
})
export class RolViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private rolService: RolService) { }

  rol: any = [];
  cols: any[];

  displayedColumns: string[] = [
    'nombre',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();


  ngOnInit() {
    this.getAllRol();
    this.dataSource.paginator = this.paginator;
  }

  getAllRol(){
    this.rolService.getRoles().subscribe(
      res => {
        this.rol = res;
        this.dataSource.data = this.rol;

        console.log(this.rol);
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
