import { Component, OnInit } from '@angular/core';

import { Metodo } from 'src/app/models/Metodo';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MetodoService } from 'src/app/services/metodo/metodo.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-metodo-edit',
  templateUrl: './metodo-edit.component.html',
  styleUrls: ['./metodo-edit.component.css']
})
export class MetodoEditComponent implements OnInit {

  constructor(private metodoService: MetodoService, private router: Router, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  edit: boolean = false;

  metodo: Metodo = {
    metodoId:null,
    nombre:'',
    estado:true,
    fechaCreacion:null,
    fechaActualizacion:null
  }

  formMetodo: FormGroup;

  metodoIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required]);
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);

  ngOnInit() {
    $("#metodoEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formMetodo = this._formBuilder.group({
      metodoId: this.metodoIdCtrl,
      nombre: this.nombreCtrl,
      estado: this.estadoCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl,
      fechaCreacion: this.fechaCreacionCtrl
    });
    if(parametros.id){
      this.metodoService.getMetodo(parametros.id).subscribe(
        res=>{
          this.metodo = res;
          this.formMetodo.patchValue({
            metodoId: this.metodo.metodoId,
            nombre: this.metodo.nombre,
            estado: this.metodo.estado,
            fechaActualizacion: this.metodo.fechaActualizacion,
            fechaCreacion: this.metodo.fechaCreacion
          });
          this.edit = true;
          this.mostrarEstado(this.metodo.estado);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  saveNewMetodo(){
    this.metodoService.saveMetodo(this.formMetodo.value).subscribe(
      res=>{
        this.router.navigate(['/metodo'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateMetodo(){
    this.metodoService.updateMetodo(this.formMetodo.value).subscribe(
      res=>{
        this.router.navigate(['/metodo'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/metodo']);
  }

  activarInactivar(){
    if(this.metodo.estado === false){
      this.formMetodo.patchValue({
        estado:true
      });
    }else if(this.metodo.estado === true){
      this.formMetodo.patchValue({
        estado:false
      });
    }
    this.updateMetodo();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#metodoEstado").text("Activar");
        $("#metodoEstado").addClass("success");
      }else if(estadoId == true){
        $("#metodoEstado").text("Inactivar");
        $("#metodoEstado").addClass("warning");
      }
      $("#metodoEstado").show();
    }
  }

}
