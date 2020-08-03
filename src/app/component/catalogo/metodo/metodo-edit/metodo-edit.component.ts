import { Component, OnInit } from '@angular/core';

import { Metodo } from 'src/app/models/Metodo';
import { ActivatedRoute, Router } from '@angular/router';

import { MetodoService } from 'src/app/services/metodo/metodo.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-metodo-edit',
  templateUrl: './metodo-edit.component.html',
  styleUrls: ['./metodo-edit.component.css']
})
export class MetodoEditComponent implements OnInit {

  constructor(private metodoService: MetodoService, private router: Router, private activateRoute: ActivatedRoute) { }

  edit: boolean = false;

  metodo: Metodo = {
    metodo_id:null,
    nombre:'',
    estado:true
  }

  ngOnInit() {
    $("#metodoEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if(parametros.id){
      this.metodoService.getMetodo(parametros.id).subscribe(
        res=>{
          this.metodo = res;
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
    this.metodoService.saveMetodo(this.metodo).subscribe(
      res=>{
        this.router.navigate(['/metodo'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateMetodo(){
    this.metodoService.updateMetodo(this.metodo.metodo_id, this.metodo).subscribe(
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
      this.metodo.estado = true;
    }else if(this.metodo.estado === true){
      this.metodo.estado = false;
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
