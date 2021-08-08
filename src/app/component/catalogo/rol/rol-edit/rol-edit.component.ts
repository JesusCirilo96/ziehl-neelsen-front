import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { RolService } from '../../../../services/rol/rol.service';
import { MenuService } from '../../../../services/menu/menu.service';

import { Rol } from '../../../../models/Rol';

import * as $ from 'jquery';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css']
})
export class RolEditComponent implements OnInit {

  constructor(
    private rolService: RolService,
    private menuService: MenuService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder) { }

  edit: boolean = false;

  menuSeleccionado: '';

  rol: Rol = {
    rolId: null,
    rolName: '',
    estado: true
  }

  rolMenu: any = [];
  menus: any = [];

  menuSubmenu: any = [];

  formRol: FormGroup;

  rolIdCtrl = new FormControl(null);
  rolNameCtrl = new FormControl('', [Validators.required])
  estadoCtrl = new FormControl(true);


  ngOnInit() {

    $("#seccionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.obteneMenuRol(parametros.id);
    this.formRol = this._formBuilder.group({
      rolId: this.rolIdCtrl,
      rolName: this.rolNameCtrl,
      estado: this.estadoCtrl
    });

    if (parametros.id) {
      this.rolService.getRol(parametros.id).subscribe(
        response => {
          this.rol = response;
          this.formRol.patchValue({
            rolId: this.rol.rolId,
            rolName: this.rol.rolName,
            estado: this.rol.estado
          });
          this.edit = true;
          this.mostrarEstado(this.rol.estado);
          this.obtenerMenus();
        }, error => {
          console.log("Error al obtener el rol por ID: " + error)
        }
      );
    }

  }

  guardarRol() {
    this.rolService.saveRol(this.formRol.value).subscribe(
      res => {
        this.router.navigate(['/administracion'])
      },
      err => {
        console.log(err);
      }
    )
  }

  actualizarRol() {
    this.rolService.updateRol(this.formRol.value).subscribe(
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
    if (this.rol.estado === false) {
      this.formRol.patchValue({
        estado: true
      });
    } else if (this.rol.estado === true) {
      this.formRol.patchValue({
        estado: false
      });
    }
    this.actualizarRol();
  }

  mostrarEstado(estadoId) {
    if (this.edit) {
      if (estadoId === false) {
        $("#rolEstado").text("Activar");
        $("#rolEstado").addClass("success");
      } else if (estadoId == true) {
        $("#rolEstado").text("Inactivar");
        $("#rolEstado").addClass("warning");
      }
      $("#rolEstado").show();
    }
  }

  obteneMenuRol(rolId) {
    this.rolService.getRolMenu(rolId).subscribe(
      response => {
        this.rolMenu = response['menu']
        console.log(this.rolMenu);
      }, error => {
        console.log("Error al obtener los menus por ID del rol: " + error)
      }
    );
  }

  obtenerMenus() {
    this.menuService.getAllMenuSubmenu().subscribe(
      response => {
        var rolMenu = this.rolMenu;
        var menu = [];
        for (var key1 in response) {
          console.log(response[key1].nombre);
          var pertenece = false;
          var submenu = []; 
          var subMenuRol;
          for (var key in rolMenu) {
            if (rolMenu[key].menuId === response[key1].menuId) {
              pertenece = true;
              subMenuRol = rolMenu[key].submenu;
              break;
            }
          }
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

}
