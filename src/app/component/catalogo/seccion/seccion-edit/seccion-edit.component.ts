import { Component, OnInit } from '@angular/core';

import { Metodo } from 'src/app/models/Metodo';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SeccionesService } from 'src/app/services/secciones.service';

import { ReferenciaService } from 'src/app/services/referencia/referencia.service'

import * as $ from 'jquery';
import { Seccion } from 'src/app/models/Seccion';

@Component({
  selector: 'app-seccion-edit',
  templateUrl: './seccion-edit.component.html',
  styleUrls: ['./seccion-edit.component.css']
})
export class SeccionEditComponent implements OnInit {

  constructor(
    private seccionService: SeccionesService, 
    private referenciaService: ReferenciaService,
    private router: Router, 
    private activateRoute: ActivatedRoute, 
    private _formBuilder: FormBuilder) { }

  edit: boolean = false;
  selectable = true;
  removable = true;

  Estudios: any = [];
  Metodos: any = [];
  ReferenciaEstudio: any = [];

  seccion: Seccion = {
    seccionId: null,
    nombre: '',
    titulo: '',
    estado: true,
    fechaCreacion:null,
    fechaActualizacion:null
  }

  formSeccion: FormGroup;

  seccionIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required])
  tituloCtrl = new FormControl('');
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);

  ngOnInit() {
    $("#seccionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formSeccion = this._formBuilder.group({
      seccionId: this.seccionIdCtrl,
      nombre: this.nombreCtrl,
      titulo: this.tituloCtrl,
      estado: this.estadoCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl,
      fechaCreacion: this.fechaCreacionCtrl
    });
    if(parametros.id){
      this.seccionService.getSeccionEstudio(parametros.id).subscribe(
        res=>{
          this.seccion = res['seccion'];
          this.Estudios = res['estudio'];
          this.Metodos = res['metodo'];
          this.formSeccion.patchValue({
            seccionId: this.seccion.seccionId,
            nombre: this.seccion.nombre,
            titulo: this.seccion.titulo,
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

  getEstudio(id){
    this.seccionService.getSeccionEstudio(id).subscribe(
      res=>{
        this.Estudios = res;
        console.log(this.Estudios);
      },
      err=>{
        console.log(err);
      }
    )
  }
  

  saveNewSeccion(){
    this.seccionService.saveSeccion(this.formSeccion.value).subscribe(
      res=>{
        this.router.navigate(['/seccion'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateSeccion(){
    this.seccionService.updateSeccion(this.formSeccion.value).subscribe(
      res=>{
        this.router.navigate(['/seccion'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/seccion']);
  }

  activarInactivar(){
    if(this.seccion.estado === false){
      this.formSeccion.patchValue({
        estado:true
      });
    }else if(this.seccion.estado === true){
      this.formSeccion.patchValue({
        estado:false
      });
    }
    this.updateSeccion();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#seccionEstado").text("Activar");
        $("#seccionEstado").addClass("success");
      }else if(estadoId == true){
        $("#seccionEstado").text("Inactivar");
        $("#seccionEstado").addClass("warning");
      }
      $("#seccionEstado").show();
    }
  }

  obtenerReferencia(idEstudio){
    this.referenciaService.getReferenciaEstudio(idEstudio).subscribe(
      res => {
        this.ReferenciaEstudio = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  removeMetodo(id: number): void {
    console.log("ID A REMOVER == " + id)
  }

}
