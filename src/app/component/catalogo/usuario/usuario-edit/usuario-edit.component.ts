import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/Usuario';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RolService } from 'src/app/services/rol/rol.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private rolService: RolService
  ) { }

  edit: boolean = false;

  Roles: any = [];
  rolEscogido: number;

  usuario: Usuario = {
    usuarioId: null,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    cedula: '',
    contrasena: '',
    nombreUsuario: '',
    rol: null,
    estado: true
  }

  ngOnInit() {
    $("#usuarioEstado").hide();
    this.getUsuario();
    this.getRoles();
  }

  getUsuario() {
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.usuarioService.getUsuario(parametros.id).subscribe(
        res => {
          this.usuario = res;
          this.edit = true;
          this.mostrarEstado(this.usuario.estado);
          //this.getRol(this.usuario.rol);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  getRoles() {
    this.rolService.getRoles().subscribe(
      response => {
        this.Roles = response;
      },
      error => {
        console.log(error);
      }
    )
  }
  rolUsuario: any = [];
  getRol(usuarioRol) {
    for (var key in usuarioRol) {
      this.rolService.getRol(usuarioRol[key].rol_id).subscribe(
        response => {
          this.rolUsuario.push({MENU:response});
          console.log(this.rolUsuario);
        }, error => {
          console.log(error);
        }
      )
    }
  }

  saveNewUsuario() {
    this.usuarioService.saveUsuario(this.usuario).subscribe(
      res => {
        this.router.navigate(['/usuario'])
      },
      err => {
        console.log(err);
      }
    )
  }

  updateUsuario() {
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      res => {
        this.router.navigate(['/usuario'])
        this.edit = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  cancelarEdicion() {
    this.router.navigate(['/metodo']);
  }

  activarInactivar() {
    if (this.usuario.estado === false) {
      this.usuario.estado = true;
    } else if (this.usuario.estado === true) {
      this.usuario.estado = false;
    }
    this.updateUsuario();
  }

  mostrarEstado(estadoId) {
    if (this.edit) {
      if (estadoId === false) {
        $("#usuarioEstado").text("Activar");
        $("#usuarioEstado").addClass("success");
      } else if (estadoId == true) {
        $("#usuarioEstado").text("Inactivar");
        $("#usuarioEstado").addClass("warning");
      }
      $("#usuarioEstado").show();
    }
  }

}
