import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  constructor(private categoriaService: CategoriaService, private router: Router, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  edit: boolean = false;

  categoria: Categoria = {
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
    $("#categoriaEstado").hide();
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
      this.categoriaService.getCategoria(parametros.id).subscribe(
        res=>{
          this.categoria = res;
          this.formCategoria.patchValue({
            categoriaId: this.categoria.categoriaId,
            nombre: this.categoria.nombre,
            orden: this.categoria.orden,
            estado: this.categoria.estado,
            fechaActualizacion: this.categoria.fechaActualizacion,
            fechaCreacion: this.categoria.fechaCreacion
          });
          this.edit = true;
          this.mostrarEstado(this.categoria.estado);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  saveCategoria(){
    this.categoriaService.saveCategoria(this.formCategoria.value).subscribe(
      res=>{
        this.router.navigate(['/categoria'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateCategoria(){
    this.categoriaService.updateCategorias(this.formCategoria.value).subscribe(
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
    if(this.categoria.estado === false){
      this.formCategoria.patchValue({
        estado: true
      });
    }else if(this.categoria.estado === true){
      this.formCategoria.patchValue({
        estado: false
      });
    }
    this.updateCategoria();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#categoriaEstado").text("Activar");
        $("#categoriaEstado").addClass("success");
      }else if(estadoId == true){
        $("#categoriaEstado").text("Inactivar");
        $("#categoriaEstado").addClass("warning");
      }
      $("#categoriaEstado").show();
    }
  }

}
