import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../services/menu/menu.service';
import { Menu } from '../../../models/Menu';
import { MatDialog } from '@angular/material/dialog';
import { SubmenuComponent } from '../submenu/submenu.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private menuService: MenuService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder) { }
    

  edit: boolean = false;
  formMenu: FormGroup;

  menu: Menu = {
    menuId: null,
    nombre: '',
    ruta: '',
    dropdown: false,
    icono: '',
    estado: true
  }

  menuSubmenu: any = [];

  //controls para formulario de menu
  menuIdCtrl = new FormControl(null);
  menuNombreCtrl = new FormControl('', [Validators.required]);
  menuRutaCtrl = new FormControl('', [Validators.required]);
  menuDropdownCtrl = new FormControl(false, [Validators.required]);
  menuIconoCtrl = new FormControl('');
  menuEstadoCtrl = new FormControl(true);


  ngOnInit() {
    $("#seccionGuardar").hide();

    this.formMenu = this._formBuilder.group({
      menuId: this.menuIdCtrl,
      nombre: this.menuNombreCtrl,
      ruta: this.menuRutaCtrl,
      dropdown: this.menuDropdownCtrl,
      icono: this.menuIconoCtrl,
      estado: this.menuEstadoCtrl
    });

    this.obtenerMenuSubmenu();
  }

  guardarMenu() {
    console.log(this.formMenu.value.dropdown);
    if(this.formMenu.value.estado == true){
      this.formMenu.patchValue({
        dropdown:true
      })
    }
    if(this.formMenu.value.dropdown == false){
      this.formMenu.patchValue({
        dropdown:false
      })
    }
    console.log(this.formMenu.value);
    this.menuService.saveMenu(this.formMenu.value).subscribe(
      res => {
        //this.router.navigate(['/administracion'])
      },
      err => {
        console.log(err);
      }
    )
  }

  actualizarMenu() {
    this.menuService.updateMenu(this.formMenu.value).subscribe(
      res => {
        //this.router.navigate(['/administracion'])
        this.edit = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  obtenerMenuSubmenu(){
    this.menuService.getAllMenuSubmenu().subscribe(
      respuesta =>{
        console.log(respuesta);
        this.menuSubmenu = respuesta;
      },err=>{

      }
    )
  }

  cancelarEdicion() {
    this.formMenu.patchValue({
      menuId: this.menu.menuId,
      nombre: this.menu.nombre,
      ruta: this.menu.ruta,
      dropdown: this.menu.dropdown,
      icono: this.menu.icono,
      estado: this.menu.estado
    });
  }

  mostrarEstado(estadoId) {
    if (this.edit) {
      if (estadoId === false) {
        $("#menuEstado").text("Activar");
        $("#menuEstado").addClass("success");
      } else if (estadoId == true) {
        $("#menuEstado").text("Inactivar");
        $("#menuEstado").addClass("warning");
      }
      $("#menuEstado").show();
    }
  }

  editarSubmenu(submenu: any, editar:boolean): void{
    console.log(submenu);
    var submenuDialog;
    if(editar){
      submenuDialog = { editar: true, subMenu : submenu}
    }else{
      submenuDialog = { editar: false}
    }

    const dialogReferencia = this.dialog.open(SubmenuComponent, {
      width: '50%',
      data: submenuDialog
    });

    dialogReferencia.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.obtenerMenuSubmenu();
      }
    });
  }

  eliminarSubmenu(submenuId:number):void{
    console.log(submenuId);
  }

  editarMenu(menu: any):void{
    console.log(menu);
    var dropdown = "false";
    if(menu.dropdown){
      dropdown = "true"
    }
    this.formMenu.patchValue({
      menuId: menu.menuId,
      nombre: menu.nombre,
      ruta: menu.ruta,
      dropdown: dropdown,
      icono: menu.icono,
      estado: menu.estado
    });
  }

  eliminarMenu(menuId:any){

  }

}
