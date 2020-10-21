import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/Usuario';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
    private rolService: RolService,
    private _formBuilder: FormBuilder
  ) { }

  edit: boolean = false;

  Roles: any = [];
  rolEscogido: number;

  formUsuario: FormGroup;

  usuarioIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required]);
  apellidoPaternoCtrl = new FormControl('',[Validators.required]);
  apellidoMaternoCtrl = new FormControl('');
  nombreUsuarioCtrl = new FormControl('',Validators.required);
  cedulaCtrl = new FormControl('');
  passwordCtrl = new FormControl('');
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);
  
  usuario: Usuario = {
    usuarioId: null,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    cedula: '',
    password: '',
    nombreUsuario: '',
    estado: true,
    fechaCreacion:null,
    fechaActualizacion: null
  }

  rolUsuario: any =[];

  ngOnInit() {
    this.formUsuario = this._formBuilder.group({
      usuarioId: this.usuarioIdCtrl,
      nombre: this.nombreCtrl,
      apellidoPaterno: this.apellidoPaternoCtrl,
      apellidoMaterno: this.apellidoMaternoCtrl,
      cedula: this.cedulaCtrl,
      password: this.passwordCtrl,
      nombreUsuario: this.nombreUsuarioCtrl,
      estado: this.estadoCtrl,
      fechaCreacion: this.fechaCreacionCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl
    });

    $("#usuarioEstado").hide();
    this.getUsuario();
    this.getRoles();
  }

  getUsuario() {
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.rolService.getRolByUsuario(parametros.id).subscribe(
        res => {
          this.usuario = res['usuario'];
          this.rolUsuario = res['rol'];
          this.formUsuario.patchValue({
            usuarioId: this.usuario.usuarioId,
            nombre: this.usuario.nombre,
            apellidoPaterno: this.usuario.apellidoPaterno,
            apellidoMaterno: this.usuario.apellidoMaterno,
            cedula: this.usuario.cedula,
            password: this.usuario.password,
            nombreUsuario: this.usuario.nombreUsuario,
            estado: this.usuario.estado,
            fechaCreacion: this.usuario.fechaCreacion,
            fechaActualizacion: this.usuario.fechaActualizacion
          });
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

  saveNewUsuario() {
    this.usuarioService.saveUsuario(this.formUsuario.value).subscribe(
      res => {
        this.router.navigate(['/usuario'])
      },
      err => {
        console.log(err);
      }
    )
  }

  updateUsuario() {
    console.log(this.formUsuario.value)
    this.usuarioService.updateUsuario(this.formUsuario.value).subscribe(
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
    this.router.navigate(['/usuario']);
  }

  activarInactivar() {
    if (this.usuario.estado === false) {
      this.formUsuario.patchValue({
        estado: true
      });
    } else if (this.usuario.estado === true) {
      this.formUsuario.patchValue({
        estado: false
      });
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
