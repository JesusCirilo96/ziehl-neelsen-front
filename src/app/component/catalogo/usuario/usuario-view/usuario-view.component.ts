import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html',
  styleUrls: ['./usuario-view.component.css']
})
export class UsuarioViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usuarioService:UsuarioService
  ) { }

  usuario: any = [];

  displayedColumns: string[] = [
    'nombre',
    'apellido_paterno', 
    'apellido_materno',
    'nombre_usuario',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  ngOnInit() {
    this.getAllSeccion();
  }

  getAllSeccion(){
    this.usuarioService.getUsuarios().subscribe(
      res => {
        this.usuario = res;
        this.dataSource.data = this.usuario;
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
