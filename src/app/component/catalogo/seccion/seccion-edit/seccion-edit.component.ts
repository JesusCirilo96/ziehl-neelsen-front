import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/models/Seccion';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SeccionesService } from 'src/app/services/secciones.service';

import * as $ from 'jquery';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-seccion-edit',
  templateUrl: './seccion-edit.component.html',
  styleUrls: ['./seccion-edit.component.css']
})
export class SeccionEditComponent implements OnInit {

  constructor(private seccionService: SeccionesService, private router: Router, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  edit: boolean = false;

  seccion: Seccion = {
    categoriaId:null,
    nombre:'',
    orden:null,
    estado:true,
    fechaCreacion:null,
    fechaActualizacion:null
  }

  formCategoria: FormGroup;

  categoriaIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required]);
  ordenCtrl = new FormControl('',[Validators.required]);
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);

  ngOnInit() {
    $("#seccionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formCategoria = this._formBuilder.group({
      categoriaId: this.categoriaIdCtrl,
      nombre: this.nombreCtrl,
      orden:this.ordenCtrl,
      estado:this.estadoCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl,
      fechaCreacion: this.fechaCreacionCtrl

    });
    if(parametros.id){
      this.seccionService.getSeccion(parametros.id).subscribe(
        res=>{
          this.seccion = res;
          this.formCategoria.patchValue({
            categoriaId: this.seccion.categoriaId,
            nombre: this.seccion.nombre,
            orden: this.seccion.orden,
            estado: this.seccion.estado,
            fechaActualizacion: this.seccion.fechaActualizacion,
            fechaCreacion: this.seccion.fechaCreacion
          });
          this.edit = true;
          this.mostrarEstado(this.seccion.estado);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  saveNewSeccion(){
    this.seccionService.saveSeccion(this.formCategoria.value).subscribe(
      res=>{
        this.router.navigate(['/categoria'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateSeccion(){
    this.seccionService.updateSeccion(this.formCategoria.value).subscribe(
      res=>{
        this.router.navigate(['/categoria'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/categoria']);
  }

  activarInactivar(){
    if(this.seccion.estado === false){
      this.formCategoria.patchValue({
        estado: true
      });
    }else if(this.seccion.estado === true){
      this.formCategoria.patchValue({
        estado: false
      });
    }
    this.updateSeccion();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#seccionEstado").text("Activar");
        $("#seccionEstado").addClass("success");
        //$("#seccionEstado").addClass("lighten-2");
      }else if(estadoId == true){
        $("#seccionEstado").text("Inactivar");
        $("#seccionEstado").addClass("warning");
      }
      $("#seccionEstado").show();
    }
  }
}
