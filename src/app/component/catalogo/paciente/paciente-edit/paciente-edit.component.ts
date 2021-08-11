import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Paciente } from 'src/app/models/Paciente';
import { Sexo  } from 'src/app/models/Sexo';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


import * as $ from 'jquery';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css'],
 providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class PacienteEditComponent implements OnInit {

  constructor(private pacienteService: PacienteService, 
    private router: Router, 
    private activateRoute: ActivatedRoute, 
    private adapter: DateAdapter<any>,
    private _formBuilder: FormBuilder){
  }
  edit: boolean = false;
  paciente: Paciente = {
    pacienteId:null,
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    fechaNacimiento:'',
    sexo:true,
    email:'',
    telefono:'',
    estado:true,
    fechaCreacion:null,
    fechaActualizacion:null
  }

  Sexo: Sexo[] = [
    {value: true, viewValue: 'Masculino'},
    {value: false, viewValue: 'Femenino'}
  ];

  formPaciente: FormGroup;

  pacienteIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('',[Validators.required]);
  apellidoPaternoCtrl = new FormControl('',[Validators.required]);
  apellidoMaternoCtrl = new FormControl('');
  fechaNacimientoCtrl = new FormControl('',[Validators.required]);
  sexoCtrl = new FormControl(true,[Validators.required])
  emailCtrl = new FormControl('',[Validators.email]);
  telefonoCtrl = new FormControl('');
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);


  ngOnInit() {
    $("#pacienteEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    this.formPaciente = this._formBuilder.group({
      pacienteId:this.pacienteIdCtrl,
      nombre: this.nombreCtrl,
      apellidoPaterno:this.apellidoPaternoCtrl,
      apellidoMaterno:this.apellidoMaternoCtrl,
      fechaNacimiento:this.fechaNacimientoCtrl,
      sexo: this.sexoCtrl,
      email:this.emailCtrl,
      telefono: this.telefonoCtrl,
      estado:this.estadoCtrl,
      fechaCreacion:this.fechaCreacionCtrl,
      fechaActualizacion:this.fechaActualizacionCtrl
    });
    if(parametros.id){
      this.pacienteService.getPaciente(parametros.id).subscribe(
        res=>{
          this.paciente = res;
          this.formPaciente.patchValue({
            pacienteId:this.paciente.pacienteId,
            nombre: this.paciente.nombre,
            apellidoPaterno:this.paciente.apellidoPaterno,
            apellidoMaterno:this.paciente.apellidoMaterno,
            fechaNacimiento:this.paciente.fechaNacimiento,
            sexo: this.paciente.sexo,
            email:this.paciente.email,
            telefono: this.paciente.telefono,
            estado:this.paciente.estado,
            fechaCreacion:this.paciente.fechaCreacion,
            fechaActualizacion:this.paciente.fechaActualizacion
          });
          this.edit = true;
          this.mostrarEstado(this.paciente.estado);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  saveNewPaciente(){
    this.pacienteService.savePaciente(this.formPaciente.value).subscribe(
      res=>{
        this.router.navigate(['/personas'])
      },
      err=>{
        console.log(err);
      }
    )
    console.log(this.formPaciente.value);
  }

  updatePaciente(){
    this.pacienteService.updatePaciente(this.formPaciente.value).subscribe(
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
    if(this.paciente.estado === false){
      this.formPaciente.patchValue({
        estado: true
      });
    }else if(this.paciente.estado === true){
      this.formPaciente.patchValue({
        estado: false
      });
    }
    this.updatePaciente();
  }

  mostrarEstado(estadoId){
    if(this.edit){   
      if(estadoId === false){
        $("#pacienteEstado").text("Activar");
        $("#pacienteEstado").addClass("success");
      }else if(estadoId == true){
        $("#pacienteEstado").text("Inactivar");
        $("#pacienteEstado").addClass("warning");
      }
      $("#pacienteEstado").show();
    }
  }

}