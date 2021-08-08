import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


import { ClasificacionPacienteService } from 'src/app/services/clasificacionPaciente/clasificacion-paciente.service';
import { ClasificacionPaciente } from 'src/app/models/ClasificacionPaciente';


@Component({
  selector: 'app-clasificacion-paciente-edit',
  templateUrl: './clasificacion-paciente-edit.component.html',
  styleUrls: ['./clasificacion-paciente-edit.component.css']
})
export class ClasificacionPacienteEditComponent implements OnInit {

  constructor(private clasificacionService: ClasificacionPacienteService, private router: Router, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  edit: boolean = false;

  clasificacion: ClasificacionPaciente = {
    clasificacionPacienteId: null,
    nombre:'',
    edadMinima:null,
    edadMaxima:null,
    estado: true,
    fechaCreacion:'',
    fechaActualizacion:''
  }

  formClasificacion: FormGroup;

  clasificacionIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required]);
  edadMinimaCtrl = new FormControl(0,[Validators.required]);
  edadMaximaCtrl = new FormControl(0,[Validators.required]);
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);


  ngOnInit() {
    $("#clasificacionEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formClasificacion = this._formBuilder.group({
      clasificacionPacienteId: this.clasificacionIdCtrl,
      nombre: this.nombreCtrl,
      edadMinima:this.edadMinimaCtrl,
      edadMaxima: this.edadMaximaCtrl,
      estado: this.estadoCtrl,
      fechaCreacion: this.fechaCreacionCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl
    });
    if(parametros.id){
      this.clasificacionService.getClasificacionPaciente(parametros.id).subscribe(
        res=>{
          this.clasificacion = res;
          this.formClasificacion.patchValue({
            clasificacionPacienteId: this.clasificacion.clasificacionPacienteId,
            nombre: this.clasificacion.nombre,
            edadMinima: this.clasificacion.edadMinima,
            edadMaxima: this.clasificacion.edadMaxima,
            estado: this.clasificacion.estado,
            fechaActualizacion: this.clasificacion.fechaActualizacion,
            fechaCreacion: this.clasificacion.fechaCreacion
          });
          console.log(this.formClasificacion.value);
          this.edit = true;
          this.mostrarEstado(this.clasificacion.estado);
        },
        err=>{
          console.log(err);
        }
      )
    }

  }

  saveClasificacion(){
    this.clasificacionService.saveClasificacion(this.formClasificacion.value).subscribe(
      res=>{
        this.router.navigate(['/examen'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateClasificacion(){
    console.log(this.formClasificacion.value);
    this.clasificacionService.updateClasificacion(this.formClasificacion.value).subscribe(
      res=>{
        this.router.navigate(['/examen'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/examen']);
  }

  activarInactivar(){
    if(this.clasificacion.estado === false){
      this.formClasificacion.patchValue({
        estado: true
      });
    }else if(this.clasificacion.estado === true){
      this.formClasificacion.patchValue({
        estado: false
      });
    }
    this.updateClasificacion();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#clasificacionEstado").text("Activar");
        $("#clasificacionEstado").addClass("success");
      }else if(estadoId == true){
        $("#clasificacionEstado").text("Inactivar");
        $("#clasificacionEstado").addClass("warning");
      }
      $("#clasificacionEstado").show();
    }
  }

}
