import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../services/menu/menu.service';
import { Menu } from '../../../models/Menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder) { }

  edit: boolean = false;
  formMenu: FormGroup;
  formSubmenu: FormGroup;

  menu: Menu = {
    menuId: null,
    nombre: '',
    ruta: '',
    dropdown: false,
    icono: '',
    estado: true
  }

  //controls para formulario de menu
  menuIdCtrl = new FormControl(null);
  menuNombreCtrl = new FormControl('', [Validators.required]);
  menuRutaCtrl = new FormControl('', [Validators.required]);
  menuDropdownCtrl = new FormControl('', [Validators.required]);
  menuIconoCtrl = new FormControl('');
  menuEstadoCtrl = new FormControl(true);

  //controls para formulario de sub menu
  submenuIdCtrl = new FormControl(null);
  submenuNombreCtrl = new FormControl('', [Validators.required]);
  submenuRutaCtrl = new FormControl('', [Validators.required]);
  submenuDropdownCtrl = new FormControl(false, [Validators.required]);
  submenuIconoCtrl = new FormControl('');
  submenuEstadoCtrl = new FormControl(true);


  ngOnInit() {
    $("#seccionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan

    this.formMenu = this._formBuilder.group({
      menuId: this.menuIdCtrl,
      nombre: this.menuNombreCtrl,
      ruta: this.menuRutaCtrl,
      dropdown: this.menuDropdownCtrl,
      icono: this.menuIconoCtrl,
      estado: this.menuEstadoCtrl
    });

    this.formSubmenu = this._formBuilder.group({
      subMenuId: this.submenuIdCtrl,
      nombre: this.submenuNombreCtrl,
      ruta: this.submenuRutaCtrl,
      dropdown: this.submenuDropdownCtrl,
      icono: this.submenuIconoCtrl,
      estado: this.submenuEstadoCtrl
    });

    if (parametros.id) {
      this.menuService.getMenu(parametros.id).subscribe(
        response => {
          this.menu = response;
          this.formMenu.patchValue({
            menuId: this.menu.menuId,
            nombre: this.menu.nombre,
            ruta: this.menu.ruta,
            dropdown: this.menu.dropdown,
            icono: this.menu.icono,
            estado: this.menu.estado
          });
          this.edit = true;
          this.mostrarEstado(this.menu.estado);
        }, error => {
          console.log("Error al obtener el menu por ID: " + error)
        }
      );
    }
  }

  guardarRol() {
    this.menuService.saveMenu(this.formMenu.value).subscribe(
      res => {
        this.router.navigate(['/rol'])
      },
      err => {
        console.log(err);
      }
    )
  }

  actualizarRol() {
    this.menuService.updateMenu(this.formMenu.value).subscribe(
      res => {
        this.router.navigate(['/rol'])
        this.edit = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  cancelarEdicion() {
    this.router.navigate(['/rol']);
  }

  activarInactivar() {
    if (this.menu.estado === false) {
      this.formMenu.patchValue({
        estado: true
      });
    } else if (this.menu.estado === true) {
      this.formMenu.patchValue({
        estado: false
      });
    }
    this.actualizarRol();
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

}
