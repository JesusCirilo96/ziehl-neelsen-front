import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Paciente } from 'src/app/models/Paciente';
import { Sexo  } from 'src/app/models/Sexo';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

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
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class PacienteEditComponent implements OnInit {

  constructor(private pacienteService: PacienteService, private router: Router, private activateRoute: ActivatedRoute, private adapter: DateAdapter<any>){
  }
  edit: boolean = false;
  paciente: Paciente = {
    paciente_id:null,
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    fecha_nacimiento:'',
    sexo:true,
    email:null,
    telefono:'',
    estado:true,
    createdAt:'',
    updatedAt:'',
  }

  Sexo: Sexo[] = [
    {value: '1', viewValue: 'Masculino'},
    {value: '0', viewValue: 'Femenino'}
  ];

  ngOnInit() {
    $("#pacienteEstado").hide();
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if(parametros.id){
      this.pacienteService.getPaciente(parametros.id).subscribe(
        res=>{
          this.paciente = res;
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
    this.pacienteService.savePaciente(this.paciente).subscribe(
      res=>{
        this.router.navigate(['/paciente'])
      },
      err=>{
        console.log(err);
      }
    )
    console.log(this.paciente);
  }

  updatePaciente(){
    this.pacienteService.updatePaciente(this.paciente.paciente_id, this.paciente).subscribe(
      res=>{
        this.router.navigate(['/paciente'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/paciente']);
  }

  activarInactivar(){
    if(this.paciente.estado === false){
      this.paciente.estado = true;
    }else if(this.paciente.estado === true){
      this.paciente.estado = false;
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

  sexoFormat(sexo){
    var sex = 0;
    if(sexo){
      sex = 1;
    }
    return sex;
  }

  getDate(val) {
    console.log(val);
    var mes = parseInt(val._i.month + 1);
    var formatMes = String(mes);
    var dia = val._i.date;
    if(mes < 10){
      formatMes = "0" + mes;
    }
    if(dia < 10){
      dia = "0" + dia;
    }
    var fecha = val._i.year + "-" + formatMes +"-" + dia ;
    this.paciente.fecha_nacimiento = fecha;
  }
  
}