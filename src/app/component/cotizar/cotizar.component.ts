import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2'

//Services
import { ExamenGeneralService } from '../../services/examenGeneral/examen-general.service';
import { DescuentoService } from '../../services/descuento/descuento.service';
import { Sexo } from '../../models/Sexo';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {

  pacienteNombre: string = "";
  pacienteFechaNac: string = "";
  pacienteSexo: string = "";

  //autocomplete paciente
  paciente: any = [];
  myControl = new FormControl();
  options: string[] = this.paciente;
  filteredOptions: Observable<string[]>;
  //autocomplete examen general
  examenGeneral: any = [];
  controExamenGeneral = new FormControl();
  optionsGeneral: string[] = this.examenGeneral;
  filteredOptionsGeneral: Observable<string[]>;


  //examenes generales selecionados
  ExamenGeneralSeleccionado: any = [];
  //Se almacenan los examenes generales
  ExamenGeneral: any = [];
  //examenes generales selecionados
  ExamenSencilloSeleccionado: any = [];


  total: number = 0.0;
  subtotal: number = 0.0;
  descuento: number = 0.0;

  sexo: Sexo[] = [
    { value: true, viewValue: 'Masculino' },
    { value: false, viewValue: 'Femenino' }
  ];

  constructor(
    private pacienteService: PacienteService,
    private examenGeneralService: ExamenGeneralService,
    private descuentoService: DescuentoService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    
    this.getPaciente();
    this.getAllExamenGeneral();
    //autocomplete
    this.filteredOptions = this.myControl.valueChanges //filter for paciente
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredOptionsGeneral = this.controExamenGeneral.valueChanges.pipe(
      startWith(''),
      map(value => this._filterExamenGeneral(value))
    );
  }

  //obtener todos los examenes generales
  private getAllExamenGeneral() {
    this.examenGeneralService.getExamenesGenerales().subscribe(
      response => {
        console.log(response);
        this.examenGeneralToAutocomplete(response);
        this.ExamenGeneral = response;
      },
      error => {
        console.log(error);

      }
    )
  }

  //obtenemos el examen general buscando por el nombre
  obtenerExamenGeneral(name) {
    for (var index in this.ExamenGeneral) {
      if (this.ExamenGeneral[index].nombre == name) {
        var existe = false;
        for (var indice in this.ExamenGeneralSeleccionado) {
          if (this.ExamenGeneralSeleccionado[indice].NOMBRE === name) {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: "Ya seleccionaste este examen"
            })
            existe = true;
            break;
          }
        }
        if (!existe) {
          var descuento = [];

          this.descuentoService.descuentoExamen(this.ExamenGeneral[index].examenGeneralId).subscribe(
            respuesta => {

              var totalDescuento = 0.0;

              if (respuesta['descuento'] !== null) {
                if (respuesta['descuento'][0] !== undefined) {
                  descuento.push({
                    NOMBRE: respuesta['descuento'][0].nombre,
                    PORCENTAJE: respuesta['descuento'][0].porcentajeDescuento,
                    DESCUENTO: respuesta['descuento'][0].descuento
                  })

                  totalDescuento = descuento[0].DESCUENTO;
                }
              }

              var seleccion = {
                ID: this.ExamenGeneral[index].examenGeneralId,
                NOMBRE: this.ExamenGeneral[index].nombre,
                PRECIO: this.ExamenGeneral[index].precio,
                PRECIO_REAL: this.ExamenGeneral[index].precio - totalDescuento,
                DESCUENTO: descuento
              }

              this.descuento += totalDescuento;
              this.subtotal += this.ExamenGeneral[index].precio;
              var totalLocal = this.subtotal - this.descuento;
              this.total = totalLocal;

              this.ExamenGeneralSeleccionado.push(seleccion);
            },
            error => {
              console.log(error)
            }
          )
        }
        this.controExamenGeneral.setValue('');
        break;
      }
    }
  }

  //Complementos

  removerExamenGeneral(examenId) {
    console.log(examenId);
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "¡Se removera el estudio!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, remover!'
    }).then((result) => {
      if (result.value) {
        var index = this.ExamenGeneralSeleccionado.map(function (est) { return est.ID; }).indexOf(examenId);

        var precio = this.ExamenGeneralSeleccionado[index].PRECIO;
        var descuento = 0.0;
        if (this.ExamenGeneralSeleccionado[index].DESCUENTO[0] !== undefined) {
          descuento = this.ExamenGeneralSeleccionado[index].DESCUENTO[0].DESCUENTO;
        }

        console.log("EL PRECIO A REMOVER==> " + precio);
        console.log("EL DESCUENTO A REMOVER==> " + descuento)

        this.subtotal -= precio;
        this.descuento -= descuento;

        this.total = this.subtotal - this.descuento;

        this.ExamenGeneralSeleccionado.splice(index, 1);
        Swal.fire(
          'Eliminado',
          'El examen fue eliminado',
          'success'
        )
      }
    })
  }

  //convertimos los datos obtenidos a autocomplete
  private examenGeneralToAutocomplete(examenGeneral) {
    for (var index in examenGeneral) {
      this.examenGeneral.push(examenGeneral[index].nombre);
    }
  }

  //filter autocomplete
  private _filterExamenGeneral(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsGeneral.filter(optionGen => optionGen.toLowerCase().includes(filterValue));
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

  imprimir() {
    var Edad = this.calcularEdad(this.parsearFecha(""));
    console.log("EDAD ==> " + Edad);
  }

  calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad

    /*if (typeof fecha != "string" && fecha && this.esNumero(fecha.getTime())) {
        fecha = formatDate(fecha, "yyyy-MM-dd");
    }*/

   // console.log("FECHA A CALCULAR ==> " + fecha)
    var edadVerdadera = '0';

    if (fecha != '' && fecha != null) {

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


      if (meses === 0) {
        edadVerdadera = dias + " Dias";
      } else if (edad === 1900) {
        edadVerdadera = meses + " Meses";
      } else {
        edadVerdadera = edad + " Años";
      }

    }

    return edadVerdadera;

    //return edad + " años, " + meses + " meses y " + dias + " días";
  }

  parsearFecha(val) {
    var fecha = 'yyyy-mm-dd';
    if (val != '' && val != null) {
      
      //console.log("FECHA A PARSEAR ::> " + val);

      var mes = parseInt(val.getMonth() + 1);
      var formatMes = String(mes);
      var dia = val.getDate();
      if (mes < 10) {
        formatMes = "0" + mes;
      }
      if (dia < 10) {
        dia = "0" + dia;
      }
      fecha = val.getFullYear() + "-" + formatMes + "-" + dia;

    }

    return fecha;
  }

  masculinoOfemenio(sexo) {
    var aux = 'Femenino';
    if (sexo == '1') {
      aux = 'Masculino';
    }
    return aux;
  }

   //INICIO PACIENTES
   Paciente: any = [];//pacientes como vienen de la base de datos
   getPaciente() {
     this.pacienteService.getPacientes().subscribe(
       res => {
         this.Paciente = res;
         this.legibleAutocompletePaciente(res);
         console.log(res);
       },
       err => console.log(err)
     );
   }
 
   legibleAutocompletePaciente(response) {//formateamos el resultado del JSON paciente legible para el autocomplete
     for (var key in response) {
       this.paciente.push(response[key].nombre + " " + response[key].apellidoPaterno + " " + response[key].apellidoMaterno);
     }
   }
 
   obtenerPaciente(value) {//obtenemos el paciente del input autocomplete lo comparamos con el json y seteamos los valores a los inputs
     var paciente = this.Paciente;
     for (var key in paciente) {
       var nombre = paciente[key].nombre + " " + paciente[key].apellidoPaterno + " " + paciente[key].apellidoMaterno
       if (nombre == value) {
         this.pacienteNombre = nombre;
         this.pacienteSexo = paciente[key].sexo;
         this.pacienteFechaNac = paciente[key].fechaNacimiento;
         break;
       }
 
     }
   }
 
   //FIN DE PACIENTES

  private _filter(value: string): string[] {//filtro para paciente
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
