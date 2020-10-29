import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/models/Seccion';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { RolService } from '../../../../services/rol/rol.service';
import { Rol } from '../../../../models/Rol';

import * as $ from 'jquery';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css']
})
export class RolEditComponent implements OnInit {

  constructor(private rolService: RolService, private router: Router, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  edit: boolean = false;

  rol: Rol = {
    rolId: null,
    rolName: '',
    estado:true
  }

  formRol: FormGroup;

  rolIdCtrl = new FormControl(null);
  rolNameCtrl = new FormControl('',[Validators.required])
  estadoCtrl = new FormControl(true);

  ngOnInit() {

    $("#seccionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formRol = this._formBuilder.group({
      rolId: this.rolIdCtrl,
      rolName: this.rolNameCtrl,
      estado:this.estadoCtrl
    });

    if(parametros.id){
      this.rolService.getRol(parametros.id).subscribe(
        response =>{
          this.rol = response;
          this.formRol.patchValue({
            rolId: this.rol.rolId,
            rolName:this.rol.rolName,
            estado: this.rol.estado
          });
          this.edit = true;
          this.mostrarEstado(this.rol.estado);
          
        },error =>{
          console.log("Error al obtener el rol por ID: " + error)
        }
      );
    }

  }

  guardarRol(){
    this.rolService.saveRol(this.formRol.value).subscribe(
      res=>{
        this.router.navigate(['/rol'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  actualizarRol(){
    this.rolService.updateRol(this.formRol.value).subscribe(
      res=>{
        this.router.navigate(['/rol'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/rol']);
  }

  activarInactivar(){
    if(this.rol.estado === false){
      this.formRol.patchValue({
        estado: true
      });
    }else if(this.rol.estado === true){
      this.formRol.patchValue({
        estado: false
      });
    }
    this.actualizarRol();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#rolEstado").text("Activar");
        $("#rolEstado").addClass("success");
      }else if(estadoId == true){
        $("#rolEstado").text("Inactivar");
        $("#rolEstado").addClass("warning");
      }
      $("#rolEstado").show();
    }
  }


}
