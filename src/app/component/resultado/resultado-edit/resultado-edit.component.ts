import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecepcionService } from 'src/app/services/recepcion/recepcion.service';
import { ExamenGeneralRecepcionService } from 'src/app/services/examenGeneralRecepcion/examen-general-recepcion.service';

import { User } from '../../../_models/user';
import { AuthenticationService } from '../../../_services/authentication.service';

import { Informe } from 'src/app/models/Informe';
import { InformeService } from 'src/app/services/informe/informe.service';

//Models
import { Paciente } from 'src/app/models/Paciente';
import {Atencion} from 'src/app/models/Atencion';
import { Recepcion } from 'src/app/models/Recepcion'
import { ExamenGeneralRecepcion } from 'src/app/models/ExamenGeneralRecepcion';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultado-edit',
  templateUrl: './resultado-edit.component.html',
  styleUrls: ['./resultado-edit.component.css']
})
export class ResultadoEditComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activateRoute: ActivatedRoute,
    private recepcionService: RecepcionService,
    private examenGeneralRecepcionService: ExamenGeneralRecepcionService,
    private informeService: InformeService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  /**
   * Inicia Reemplazos
   */

    pacienteModel: Paciente = {
      nombre:'',
      apellidoPaterno:'',
      apellidoMaterno:'',
      fechaNacimiento:'',
      sexo:false,
      email:'',
      telefono:''
    }

    atencionModel: Atencion={
      nombre:'',  
      apellidoPaterno:'',
      apellidoMaterno:''
    }

    recepcionModel: Recepcion = {
      ficha: null,
      horaIngreso: '',
      fechaIngreso: ''
    }

    examenGenRecepcion: ExamenGeneralRecepcion = {
      examenId:null,
      recepcionId:null,
      usuarioId:null,
      realizado: false,
      impreso: false,
      entregado:false,
      resultado: null
    }

    examenGeneralRecepcion: any = [];

    
   /*
    Termina reemplazos
   */
    

  textCheked = 'Positivo';
  recepcionDatos: any = [];
  resultadoExamen: any = [];
  resultadoExamenGeneral: any = [];


  informe: Informe = {
    informe_id: null,
    fecha_informe: '',
    hora_informe: '',
    recepcion_id: '',
    examen_gen_id: null,
    usuario_id: null
  }

  ngOnInit() {
    this.getResultado();
  }

  getResultado() {
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.recepcionService.getRecepcionResultado(parametros.id).subscribe(
        res => {
          this.pacienteModel = res['paciente'];
          this.recepcionModel = res['recepcion'];
          this.atencionModel = res['medico'];
          //this.obtenerResultadoExamenGeneral(parametros.id);
          var examenRecepcion = res['recepcionExamen'];
          for(var key in examenRecepcion){
            this.examenGeneralRecepcion.push({
              examenId:examenRecepcion[key].examenId,
              recepcionId:examenRecepcion[key].recepcionId,
              usuarioId:examenRecepcion[key].usuarioId,
              realizado: examenRecepcion[key].realizado,
              impreso: examenRecepcion[key].impreso,
              entregado:examenRecepcion[key].entregado,
              resultado: JSON.parse(examenRecepcion[key].resultado)
            });

            console.log(this.examenGeneralRecepcion);
          }

        },
        err => {
          console.log(err);
        }
      )
    }
  }
  obtenerResultadoExamenGeneral(recepcion_id) {
    this.examenGeneralRecepcionService.obtenerResultadoExamen(recepcion_id).subscribe(
      res => {
        if (Object.keys(res).length === 0) {
          this.resultadoExamenGeneral = null;
        } else {
          this.resultadoExamenGeneral = res;
        }

        console.log(this.resultadoExamenGeneral);
      },
      err => {
        console.log(err);
      }
    )
  }

  valorInput: string;
  valuechange(value) {
    this.valorInput = value;
    console.log(this.valorInput);
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000
  });


  guardarResultados(examen) {
    this.examenGenRecepcion = {
      examenId:examen.examenId,
      recepcionId:examen.recepcionId,
      usuarioId:examen.usuarioId,
      realizado:examen.realizado,
      impreso: examen.impreso,
      entregado:examen.entregado,
      resultado: JSON.stringify(examen.resultado)
    }
    console.log(examen);
    this.examenGeneralRecepcionService.updateExGenRecepcion(this.examenGenRecepcion).subscribe(
      res => {
        this.Toast.fire({
          type: 'success',
          title: 'Guardado correctamente'
        })
      },
      err => {
        console.log(err);
      }
    )
  }


  realizado(realizado, examen, examen_gen_id){
    var hecho = false;
    if(!realizado){
      hecho = true;
    }
    examen.realizado = hecho;
    this.examenGeneralRecepcionService.updateExGenRecepcion(examen).subscribe(
      res=>{
        //console.log('ok');
      },
      err=>{
        console.log();
      }
    )
  }

  impreso(impreso, examen, examen_gen_id){
    var hecho = false;
    if(!impreso){
      hecho = true;
    }
    examen.impreso = hecho;
    this.examenGeneralRecepcionService.updateExGenRecepcion(examen).subscribe(
      res=>{
        this.getResultado();
        //console.log('ok');
      },
      err=>{
        console.log();
      }
    )
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

  imprimir() {



    /*var contenido= document.getElementById('imprimirEstudio').innerHTML;
     var contenidoOriginal= document.body.innerHTML;

     document.body.innerHTML = contenido;

     window.print();
     window.close();
     
     document.body.innerHTML = contenidoOriginal;

    var mywindow = window; //window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write(document.getElementById('imprimirEstudio').innerHTML);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();


    return true;*/
  }

  printPdf() {
    this.getToday();
    this.getHour();
    html2canvas(document.getElementById('imprimirEstudio')).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/jpeg');
      let pdf = new jsPDF('p', 'cm', 'letter', true);
      var position = 0;

      var imgWidth = 21.59; //pdf.internal.pageSize.getWidth();
      var pageHeight = 27.94;
      var imgHeight = 27.94;//canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      pdf.addImage(contentDataUrl, "JPEG", 0, position, imgWidth, imgHeight);

      //pdf.output('dataurlnewwindow');

      var blob = pdf.output("blob");
      window.open(URL.createObjectURL(blob));

      //pdf.save('file.pdf');


    });
    /*
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(function(canvas){
        var generateImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = generateImage;
      });*/
  }

  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hoy;
    hoy = dd + '/' + mm + '/' + yyyy;
    return hoy;
  }

  getHour() {
    var hora = new Date();
    var now = hora.getHours() + ":" + hora.getMinutes();
    return now;
  }

  convertToUpper(word) {
    return word.toUpperCase();
  }

  removerSubExamenSubSeccion(examenArray,examen, subSeccion, subExamen) {
    console.log(examenArray);
    console.log('examen' + examen);
    console.log('suseccion' + subSeccion);
    console.log('subexamen' + subExamen);
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Se removera el examen!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, remover!'
    }).then((result) => {
      if (result.value) {
        var index = this.resultadoExamenGeneral.map(function (est) { return est.examen_gen_id; }).indexOf(examen);
        var indexSubSeccion = this.resultadoExamenGeneral[index].resultado.SUB_SECCION.map(function (sub) { return sub.NOMBRE; }).indexOf(subSeccion);
        var indexSubExamen = this.resultadoExamenGeneral[index].resultado.SUB_SECCION[indexSubSeccion].EXAMEN.map(function (exm) { return exm.NOMBRE; }).indexOf(subExamen);
        this.resultadoExamenGeneral[index].resultado.SUB_SECCION[indexSubSeccion].EXAMEN.splice(indexSubExamen, 1);
        Swal.fire(
          'Removido!',
          'El examen a sido removido.',
          'success'
        )
      }
    })
  }

}
