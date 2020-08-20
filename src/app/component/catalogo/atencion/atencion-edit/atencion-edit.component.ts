import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Atencion } from 'src/app/models/Atencion';
import { AtencionService } from 'src/app/services/atencion/atencion.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-atencion-edit',
  templateUrl: './atencion-edit.component.html',
  styleUrls: ['./atencion-edit.component.css']
})
export class AtencionEditComponent implements OnInit {
  constructor(private atencionService: AtencionService, private router: Router, private activateRoute: ActivatedRoute){
  }
  edit: boolean = false;
  atencion: Atencion = {
    medicoId:null,
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    estado:true,
    createdAt:'',
    updatedAt:'',
  }

  ngOnInit() {
    $("#atencionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if(parametros.id){
      this.atencionService.getAtencion(parametros.id).subscribe(
        res=>{
          this.atencion = res;
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
    this.atencionService.saveAtencion(this.atencion).subscribe(
      res=>{
        this.router.navigate(['/atencion'])
      },
      err=>{
        console.log(err);
      }
    )
    console.log(this.atencion);
  }

  updateAtencion(){
    this.atencionService.updateAtencion(this.atencion).subscribe(
      res=>{
        this.router.navigate(['/atencion'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/atencion']);
  }

  activarInactivar(){
    if(this.atencion.estado === false){
      this.atencion.estado = true;
    }else if(this.atencion.estado === true){
      this.atencion.estado = false;
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
