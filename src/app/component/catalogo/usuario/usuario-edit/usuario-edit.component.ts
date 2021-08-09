import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/Usuario';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RolService } from 'src/app/services/rol/rol.service';

import * as $ from 'jquery';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ThrowStmt } from '@angular/compiler';

import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private rolService: RolService,
    private _formBuilder: FormBuilder
  ) { }

  rolMenu: any = [];

  edit: boolean = false;

  Roles: any = [];
  rolEscogido: number;

  menus: any=[];

  formUsuario: FormGroup;

  //controls para el formulario de usuario
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
          if(this.rolUsuario = res['rol'] != null ){
            this.rolUsuario = res['rol'];
            this.obteneMenuRol(this.rolUsuario[0].rolId);
          }else{
            this.rolUsuario= [];
          }
          
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
        this.router.navigate(['/administracion'])
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
        this.router.navigate(['/administracion'])
        this.edit = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  cancelarEdicion() {
    this.router.navigate(['/administracion']);
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

  obteneMenuRol(rolId){
    this.rolService.getRolMenu(rolId).subscribe(
      response =>{
        this.rolMenu = response['menu']
        this.obtenerMenus();
        console.log(this.rolMenu);
      },error =>{
        console.log("Error al obtener los menus por ID del rol: " + error)
      }
    );
  }

  obtenerMenus() {
    this.menuService.getAllMenuSubmenu().subscribe(
      response => {
        console.log(this.rolMenu);
        var rolMenu = this.rolMenu;
        var menu = [];
        for (var key1 in response) {
          console.log(response[key1].nombre);
          var pertenece = false;
          var submenu = []; 
          var subMenuRol;
          for (var key in rolMenu) {
            console.log("ROLMENU ID:: " + rolMenu[key].menuId );
            console.log("RESPONSE ID:: " + response[key].menuId );
            if (rolMenu[key].menuId == response[key1].menuId) {
              pertenece = true;
              subMenuRol = rolMenu[key].submenu;
              break;
            }
          }
          console.log("Pertenece:::" + pertenece);
          if (pertenece) {
            if (response[key1].dropdown) {
              var subMenuResponse = response[key1].submenu;
              for (var keySub in subMenuResponse) {
                var tieneSubmenu = false;
                for (var keySub2 in subMenuRol) {
                  if (subMenuRol[keySub2].subMenuId === subMenuResponse[keySub].subMenuId) {
                    tieneSubmenu = true
                    break;
                  }
                }
                if (tieneSubmenu) {
                  submenu.push({
                    dropdown: subMenuResponse[keySub].dropdown,
                    icono: subMenuResponse[keySub].icono,
                    menuId: subMenuResponse[keySub].subMenuId,
                    nombre: subMenuResponse[keySub].nombre,
                    ruta: subMenuResponse[keySub].ruta,
                    pertenece: tieneSubmenu
                  });
                } else {
                  submenu.push({
                    dropdown: subMenuResponse[keySub].dropdown,
                    icono: subMenuResponse[keySub].icono,
                    menuId: subMenuResponse[keySub].subMenuId,
                    nombre: subMenuResponse[keySub].nombre,
                    ruta: subMenuResponse[keySub].ruta,
                    pertenece: tieneSubmenu
                  });
                }
              }
            }
            menu.push({
              dropdown: response[key1].dropdown,
              icono: response[key1].icono,
              menuId: response[key1].menuId,
              nombre: response[key1].nombre,
              ruta: response[key1].ruta,
              submenu: submenu,
              pertenece: pertenece
            });
          } else {
            if (response[key1].dropdown) {
              var subMenuResponse = response[key1].submenu;
              for (var keySub in subMenuResponse) {
                var tieneSubmenu = false;
                for (var keySub2 in subMenuRol) {
                  if (subMenuRol[keySub2].subMenuId === subMenuResponse[keySub].subMenuId) {
                    tieneSubmenu = true
                    break;
                  }
                }
                if (tieneSubmenu) {
                  submenu.push({
                    dropdown: subMenuResponse[keySub].dropdown,
                    icono: subMenuResponse[keySub].icono,
                    menuId: subMenuResponse[keySub].subMenuId,
                    nombre: subMenuResponse[keySub].nombre,
                    ruta: subMenuResponse[keySub].ruta,
                    pertenece: tieneSubmenu
                  });
                } else {
                  submenu.push({
                    dropdown: subMenuResponse[keySub].dropdown,
                    icono: subMenuResponse[keySub].icono,
                    menuId: subMenuResponse[keySub].subMenuId,
                    nombre: subMenuResponse[keySub].nombre,
                    ruta: subMenuResponse[keySub].ruta,
                    pertenece: tieneSubmenu
                  });
                }
              }
            }
            menu.push({
              dropdown: response[key1].dropdown,
              icono: response[key1].icono,
              menuId: response[key1].menuId,
              nombre: response[key1].nombre,
              ruta: response[key1].ruta,
              submenu: submenu,
              pertenece: pertenece
            });
          }
        }
        this.menus = menu;
        console.log(this.menus);
      }, error => {
        console.log("Error al obtener los menus con submenus " + error)
      }
    );
  }

  guardarMenus(){
    console.log("LOS MENUS A GUARDAR");
    console.log(this.menus);
  }

}
