import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/models/Seccion';
import { ActivatedRoute, Router } from '@angular/router';

import { SeccionesService } from 'src/app/services/secciones.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-seccion-edit',
  templateUrl: './seccion-edit.component.html',
  styleUrls: ['./seccion-edit.component.css']
})
export class SeccionEditComponent implements OnInit {

  constructor(private seccionService: SeccionesService, private router: Router, private activateRoute: ActivatedRoute) { }

  edit: boolean = false;

  seccion: Seccion = {
    seccionId:null,
    nombre:'',
    orden:null,
    estado:true
  }

  ngOnInit() {
    $("#seccionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if(parametros.id){
      this.seccionService.getSeccion(parametros.id).subscribe(
        res=>{
          this.seccion = res;
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
    this.seccionService.saveSeccion(this.seccion).subscribe(
      res=>{
        this.router.navigate(['/seccion'])
      },
      err=>{
        console.log(err);
      }
    )
    console.log(this.seccion);
  }

  updateSeccion(){
    this.seccionService.updateSeccion(this.seccion).subscribe(
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
      this.seccion.estado = true;
    }else if(this.seccion.estado === true){
      this.seccion.estado = false;
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
