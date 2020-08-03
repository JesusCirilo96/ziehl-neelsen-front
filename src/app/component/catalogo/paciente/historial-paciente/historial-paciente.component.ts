import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {MatPaginator, MatTableDataSource} from '@angular/material';

import { Paciente } from 'src/app/models/Paciente';

import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { RecepcionService } from 'src/app/services/recepcion/recepcion.service';

@Component({
  selector: 'app-historial-paciente',
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css']
})
export class HistorialPacienteComponent implements OnInit {

  constructor(
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private pacienteService: PacienteService,
    private recepcionService: RecepcionService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  recepcion: any = [];
  cols: any[];

  recepcionColumns: string[] = [
    'fecha_ingreso',
    'hora_ingreso',
    'ficha',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  paciente: Paciente = {
    paciente_id: null,
    nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    email: '',
    estado: true,
    sexo: null,
    fecha_nacimiento: '',
    telefono: ''
  }

  ngOnInit() {
    this.getUsuario();
    this.dataSource.paginator = this.paginator;
  }

  getUsuario() {
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.pacienteService.getPaciente(parametros.id).subscribe(
        response => {
          this.paciente = response;
          this.getRecepcion(parametros.id);
          console.log(response);
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  getRecepcion(paciente_id){
    this.recepcionService.getHistorialRecepcion(paciente_id).subscribe(
      response=>{
        console.log(response);
        this.recepcion = response;
        this.dataSource = this.recepcion;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  masculinoOfemenio(sexo) {
    var aux = 'Femenino';
    if (sexo == '1') {
      aux = 'Masculino';
    }
    return aux;
  }

  calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad

    /*if (typeof fecha != "string" && fecha && this.esNumero(fecha.getTime())) {
        fecha = formatDate(fecha, "yyyy-MM-dd");
    }*/

    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getFullYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
      edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
      edad--;
    }
    if (edad > 1900) {
      edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
      meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
      meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
      meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
      meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
      meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
      dias = ahora_dia - dia;
    if (ahora_dia < dia) {
      var ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
      dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    var edadVerdadera;
    if (meses === 0) {
      edadVerdadera = dias + " Dias";
    } else if (edad === 1900) {
      edadVerdadera = meses + " Meses";
    } else {
      edadVerdadera = edad + " Años";
    }

    return edadVerdadera;

    //return edad + " años, " + meses + " meses y " + dias + " días";
  }

  esNumero(strNumber) {
    if (strNumber == null) return false;
    if (strNumber == undefined) return false;
    if (typeof strNumber === "number" && !isNaN(strNumber)) return true;
    if (strNumber == "") return false;
    if (strNumber === "") return false;
    var psInt, psFloat;
    psInt = parseInt(strNumber);
    psFloat = parseFloat(strNumber);
    return !isNaN(strNumber) && !isNaN(psFloat);
  }

}
