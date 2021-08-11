import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Atencion } from 'src/app/models/Atencion';
import { AtencionService } from 'src/app/services/atencion/atencion.service';

import * as $ from 'jquery';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-atencion-edit',
  templateUrl: './atencion-edit.component.html',
  styleUrls: ['./atencion-edit.component.css']
})
export class AtencionEditComponent implements OnInit {
  constructor(private atencionService: AtencionService,
     private router: Router, 
     private activateRoute: ActivatedRoute,
     private _formBuilder: FormBuilder){
  }
  edit: boolean = false;
  atencion: Atencion = {
    medicoId:null,
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    estado:true,
    fechaCreacion:null,
    fechaActualizacion:null,
  }

  formAtencion: FormGroup;

  medicoIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required]);
  apellidoPaternoCtrl = new FormControl('',[Validators.required]);
  apellidoMaternoCtrl = new FormControl('');
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);

  ngOnInit() {
    $("#atencionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formAtencion = this._formBuilder.group({
      medicoId: this.medicoIdCtrl,
      nombre: this.nombreCtrl,
      apellidoPaterno: this.apellidoPaternoCtrl,
      apellidoMaterno: this.apellidoMaternoCtrl,
      estado: this.estadoCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl,
      fechaCreacion: this.fechaCreacionCtrl
    });
    if(parametros.id){
      this.atencionService.getAtencion(parametros.id).subscribe(
        res=>{
          this.atencion = res;
          this.formAtencion.patchValue({
            medicoId: this.atencion.medicoId,
            nombre: this.atencion.nombre,
            apellidoPaterno: this.atencion.apellidoPaterno,
            apellidoMaterno: this.atencion.apellidoMaterno,
            estado: this.atencion.estado,
            fechaActualizacion: this.atencion.fechaActualizacion,
            fechaCreacion: this.atencion.fechaCreacion
          });
          this.edit = true;
          this.mostrarEstado(this.atencion.estado);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  saveNewAtencion(){
    this.atencionService.saveAtencion(this.formAtencion.value).subscribe(
      res=>{
        this.router.navigate(['/personas'])
      },
      err=>{
        console.log(err);
      }
    )
    console.log(this.formAtencion.value);
  }

  updateAtencion(){
    this.atencionService.updateAtencion(this.formAtencion.value).subscribe(
      res=>{
        this.router.navigate(['/personas'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/personas']);
  }

  activarInactivar(){
    if(this.atencion.estado === false){
      this.formAtencion.patchValue({
        estado: true
      });
    }else if(this.atencion.estado === true){
      this.formAtencion.patchValue({
        estado: false
      });
    }
    this.updateAtencion();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#atencionEstado").text("Activar");
        $("#atencionEstado").addClass("success");
      }else if(estadoId == true){
        $("#atencionEstado").text("Inactivar");
        $("#atencionEstado").addClass("warning");
      }
      $("#atencionEstado").show();
    }
  }
}
