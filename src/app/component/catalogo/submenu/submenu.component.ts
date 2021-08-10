import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SubMenu } from 'src/app/models/SubMenu';
import { MenuService } from 'src/app/services/menu/menu.service';

export interface DialogData {
  editar: boolean,
  subMenu: {
    dropdown: boolean
    icono: string
    nombre: string,
    ruta: string,
    subMenuId: number,
    estado:boolean
  }

}

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private menuService: MenuService,
    public dialogRef: MatDialogRef<SubmenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  formSubmenu: FormGroup;

  subMenu: SubMenu = {
    subMenuId: null,
    nombre: '',
    ruta: '',
    dropdown: false,
    icono: '',
    estado: true
  }

  //controls para formulario de sub menu
  submenuIdCtrl = new FormControl(null);
  submenuNombreCtrl = new FormControl('', [Validators.required]);
  submenuRutaCtrl = new FormControl('', [Validators.required]);
  submenuDropdownCtrl = new FormControl(false, [Validators.required]);
  submenuIconoCtrl = new FormControl('');
  submenuEstadoCtrl = new FormControl(true);

  ngOnInit() {
    this.formSubmenu = this._formBuilder.group({
      subMenuId: this.submenuIdCtrl,
      nombre: this.submenuNombreCtrl,
      ruta: this.submenuRutaCtrl,
      dropdown: false,
      icono: this.submenuIconoCtrl,
      estado: this.submenuEstadoCtrl
    });

    if(this.data.editar){
      this.formSubmenu.patchValue({
        subMenuId: this.data.subMenu.subMenuId,
        nombre: this.data.subMenu.nombre,
        ruta: this.data.subMenu.ruta,
        dropdown: false,
        icono: this.data.subMenu.icono,
        estado: this.data.subMenu.estado
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  responseDialogo() {
    var response = [];

    response.push(
      {
        'respuesta': "OK"
      }
    );
    return response;
  }

  respuestaService : {
    errorCode:any,
    errorInfo:any
  };

  guardaSubmenu():void{
    this.menuService.saveSubMenu(this.formSubmenu.value).subscribe(
      respuesta=>{
        this.respuestaService ={
          errorCode: respuesta['errorCode'],
          errorInfo: respuesta['errorInfo']
        };
        console.log(respuesta);
      },err=>{
        console.log(err);
      }
    )
  }

  actualizaSubmenu(): void{
    this.menuService.updateSubMenu(this.formSubmenu.value).subscribe(
      respuesta=>{
        this.respuestaService ={
          errorCode: respuesta['errorCode'],
          errorInfo: respuesta['errorInfo']
        };
        console.log(respuesta);
      },err=>{
        console.log(err);
      }
    )
  }

}
