import { Component, OnInit, Injectable, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
//MODELS
import { Recepcion } from 'src/app/models/Recepcion';
import { Sexo } from 'src/app/models/Sexo';
import { ExamenGeneralRecepcion } from 'src/app/models/ExamenGeneralRecepcion';
import { ExamenGeneral } from 'src/app/models/ExamenGeneral';

//SERVICES
import { RecepcionService } from 'src/app/services/recepcion/recepcion.service';
import { SeccionesService } from 'src/app/services/secciones.service';
import { ExamenGeneralService } from 'src/app/services/examenGeneral/examen-general.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { AtencionService } from 'src/app/services/atencion/atencion.service';
import { ExamenGeneralRecepcionService } from 'src/app/services/examenGeneralRecepcion/examen-general-recepcion.service'
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import Swal from 'sweetalert2';

//Start autocomplete
export interface StateGroup {//autocomplete examenes
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

export const _filterAtencion = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

//end autocomplete

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ReceptionComponent implements OnInit {
  constructor(
    private adapter: DateAdapter<any>,
    private _formBuilder: FormBuilder,
    private recepcionService: RecepcionService,
    private seccionService: SeccionesService,
    private examenGeneralService: ExamenGeneralService,
    private pacienteService: PacienteService,
    private atencionService: AtencionService,
    private examenGeneralRecepcionService: ExamenGeneralRecepcionService,
    private categoriaService: CategoriaService
  ) {

  }

  //autocomplete
  //atencion
  atencion: any = []
  controlAtencion = new FormControl();
  optionsAtencion: string[] = this.atencion;
  filteredOptionsAtencion: Observable<string[]>;
  //Paciente
  paciente: any = [];
  myControl = new FormControl();
  options: string[] = this.paciente;
  filteredOptions: Observable<string[]>;
  //Examenes
  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });


  categoriaExamen: any = [];//datos formateados del examen para el autocomplete
  stateGroups: StateGroup[] = this.categoriaExamen;
  stateGroupOptions: Observable<StateGroup[]>;
  //end autocomplete


  Categoria: any = [];
  ficha: number;
  examenGeneralEscogido: string;

  //datos paciente
  fechaNacimiento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  Sexo: string;


  ExamenGeneralModel: any = [];/*ExamenGeneral = {
    examen_gen_id: null,
    alias: '',
    nombre: '',
    precio: 0,
    tipo_examen_id: null,
    vr_ninos: '',
    vr_ninas: '',
    vr_general_n: '',
    vr_hombre: '',
    vr_mujer: '',
    vr_general: ''
  }*/
  //datos para el examen general
  ExamenGeneral: any = []; //datos para el select de examen general
  ExamenGeneralRecepcion: any = []; //formato para guardar en la base de datos EXAMEN GENERAL
  //Subtotal
  descuento: string = '0';
  subTotal: number = 0.0;
  total: number = 0;
  anticipo: string = '0';
  restante: number = 0;

  sexo: Sexo[] = [
    { value: true, viewValue: 'Masculino' },
    { value: false, viewValue: 'Femenino' }
  ];
  recepcion: Recepcion = {
    recepcionId: null,
    fechaIngreso: '',
    horaIngreso: '',
    ficha: 0,
    total: 0.0,
    subTotal: 0.0,
    descuento: 0.0,
    anticipo: 0.0,
    restante: 0.0,
    muestras: '',
    notas: '',
    usuarioId: null,
    medicoId: null,
    pacienteId: null
  }

  examenGeneralRecepcion: ExamenGeneralRecepcion = {
    examenId: null,
    recepcionId: '',
    usuarioId:null,
    realizado: false,
    impreso: false,
    entregado: false,
    resultado: null
  }

  ngOnInit() {
    this.getPaciente();
    this.getAtencion();
    this.getExamenGeneral();
    this.getCategoria();
    this.getFicha();
    this.inicializarAutocomplete();
  }

  inicializarAutocomplete() {
    //autocomplete
    this.filteredOptions = this.myControl.valueChanges //filter for paciente
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredOptionsAtencion = this.controlAtencion.valueChanges //filter for atencion
      .pipe(
        startWith(''),
        map(value => this._filterAtencion(value))
      );
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges//filter for examen
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    //end auocomplete
  }

  saveRecepcion() {
    //for id  19-06-15-300    <fecha>-<ficha de 3 cifras>
    this.recepcion.recepcionId = this.getId();
    this.recepcion.ficha = this.ficha;
    this.recepcion.subTotal = this.subTotal;
    this.recepcion.descuento = parseFloat(this.descuento);
    this.recepcion.total = this.total;
    this.recepcion.anticipo = parseFloat(this.anticipo);
    this.recepcion.restante = this.restante;
    this.recepcion.fechaIngreso = this.getToday();
    this.recepcion.horaIngreso = this.obtenerHora();

    if (this.recepcion.pacienteId == null || this.recepcion.medicoId == null) {
      this.errorRecepcion('Faltan algunos datos');
    } else if (Object.keys(this.ExamenGeneralRecepcion).length === 0) {
      this.errorRecepcion('Debes elegir al menos un Examen');
    } else {
      Swal.fire({
        title: 'Ingresa tu identificador de usuario',
        input: 'text',
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Porfavor introduce tu identificador'
          } else {
            this.recepcion.usuarioId =  Number(value);
            console.log(this.recepcion);
            this.recepcionService.saveRecepcion(this.recepcion).subscribe(
              res => {
                console.log(res)
                this.saveExamenGeneralRecepcion();
                this.getFicha();
                this.iniciarNUevo();
              },
              err => {
                console.log(err);
              }
            )
          }
        }
      })

    }
    //console.log(this.recepcion);
  }

  saveExamenGeneralRecepcion() {
    var examenGeneral = this.ExamenGeneralRecepcion;
    console.log("EL JSON DE RESULTADO");
    console.log(examenGeneral);
    this.examenGeneralRecepcion.recepcionId = this.recepcion.recepcionId;

    for (var key1 in examenGeneral) {
      this.examenGeneralRecepcion.usuarioId = this.recepcion.usuarioId;
      this.examenGeneralRecepcion.examenId = examenGeneral[key1].EXAMEN_GEN_ID;
      this.examenGeneralRecepcion.resultado = JSON.stringify(examenGeneral[key1]);
      this.examenGeneralRecepcionService.saveExGenRecepcion(this.examenGeneralRecepcion).subscribe(
        res => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Se creo la orden correctamente',
            showConfirmButton: false,
            timer: 1800
          })
        },
        err => console.log(err)
      );
      this.examenGeneralRecepcion = {
        examenId: null,
        recepcionId: this.recepcion.recepcionId,
        usuarioId:null,
        realizado: false,
        impreso: false,
        resultado: null
      }
    }

  }

  iniciarNUevo() {
    this.recepcion = {
      recepcionId: null,
      fechaIngreso: '',
      horaIngreso: '',
      ficha: 0,
      subTotal: 0.0,
      descuento: 0.0,
      total: 0.0,
      anticipo: 0.0,
      restante: 0.0,
      muestras: '',
      notas: '',
      pacienteId: null,
      medicoId: null
    }
    this.examenGeneralRecepcion = {
      examenId: null,
      recepcionId: '',
      realizado: false,
      usuarioId:null,
      impreso: false,
      entregado:false,
      resultado: null
    }

    this.descuento = '0';
    this.subTotal = 0;
    this.total = 0;
    this.anticipo = '0';
    this.restante = 0;

    this.ExamenGeneralRecepcion = []; //formato para guardar en la base de datos EXAMEN GENERAL

    this.fechaNacimiento = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.Sexo = '';
    //vaciar autocompletes
    this.controlAtencion.setValue('');
    this.myControl.setValue('');
    this.examenGeneralEscogido = '';

    this.stateForm.reset();
  }

  getId() {
    return this.getToday() + '-' + this.ficha;
  }

  getFicha() {
    this.recepcionService.getFicha().subscribe(
      res => {
        var ficha = res.toString();
        this.ficha = parseInt(ficha);
      },
      err => {
        console.log(err);
      }
    );
  }

  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hoy;
    hoy = yyyy + '-' + mm + '-' + dd;
    return hoy;
  }

  obtenerHora() {
    var hora = new Date();
    var now = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
    return now;
  }
  getExamenGeneral() {//para rellenar el select autocomplete de examenes generales
    this.examenGeneralService.getExamenesGenerales().subscribe(
      res => {
        this.ExamenGeneral = res;
        //console.log(res);
      },
      err => console.log(err)
    );
  }

  obtenerIdExamen(value) {//Obtener el id del examen general dado el nombre
    //console.log(value);
    var examenGeneral = this.ExamenGeneral;
    for (var key in examenGeneral) {
      if (examenGeneral[key].nombre == value) {
        this.examenGeneralEscogido = examenGeneral[key].examenGeneralId;
        break;
      }

    }
  }

  addExamenGeneral() {
    this.getExamenGeneralEstudios(this.examenGeneralEscogido);
    this.stateForm.reset();
  }

  getExamenGeneralEstudios(examenId) {
    this.examenGeneralService.getExamenSecciones(examenId).subscribe(
      res => {
        this.ExamenGeneralRecepcion.push({
          NOMBRE: res['examen'].nombre,
          PRECIO: res['examen'].precio,
          LAYOUT: res['examen'].layout,
          //METODO_EXAMEN_GENERAL: res['examen'].metodo_examen_general,
          EXAMEN_GEN_ID: res['examen'].examenGeneralId,
          SECCION: res['seccion'],
          ESTUDIO: res['estudio']
        });

        console.log(this.ExamenGeneralRecepcion)
        this.subTotal += parseFloat(res['examen'].precio);
        this.obtenerTotal();

      }, err => {
        console.log(err)
      });
  }

  obtenerDescuento(data) {
    this.descuento = data;
    this.total = this.subTotal - parseFloat(this.descuento)
    this.restante = this.total;
  }

  obtenerAnticipo(anticipo) {
    this.anticipo = anticipo;
    this.restante = this.total - parseFloat(anticipo);
  }
  obtenerTotal() {
    this.total = this.subTotal - parseFloat(this.descuento);
    this.restante = this.total - parseFloat(this.anticipo);
  }
  //Fin obtencion de datos para llenar la tabla de examen general

  //Inicio obtencion seccion -- rellenado de autocomplete de examenes

  getCategoria() {
    this.categoriaService.getCategorias().subscribe(
      res => {
        this.Categoria = res;
        this.legibleParaAutoComplete(res);
      },
      err => console.log(err)
    );
  }

  legibleParaAutoComplete(response) {
    var examenGeneral = this.ExamenGeneral;
    for (var key in response) {
      var categoriaId = response[key].categoriaId;
      var names = [];
      for (var key1 in examenGeneral) {
        if (categoriaId == examenGeneral[key1].categoriaId) {
          names.push(
            examenGeneral[key1].nombre
          );
        }
      }
      this.categoriaExamen.push({
        letter: response[key].nombre,
        names: names
      });
    }
  }

  //Fin obtencion de los examenes -- rellenado de autocomplete de examenes

  //INICIO PACIENTES
  Paciente: any = [];//pacientes como vienen de la base de datos
  getPaciente() {
    this.pacienteService.getPacientes().subscribe(
      res => {
        this.Paciente = res;
        this.legibleAutocompletePaciente(res);
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
        this.recepcion.pacienteId = paciente[key].pacienteId;//setear paciente_id al modelo de recepcion  
        this.apellidoPaterno = paciente[key].apellidoPaterno;
        this.apellidoMaterno = paciente[key].apellidoMaterno;
        this.Sexo = paciente[key].sexo;
        this.fechaNacimiento = paciente[key].fechaNacimiento;
        break;
      }

    }
  }

  //FIN DE PACIENTES

  //INICIO DE ATENCION
  Atencion: any = []; //formato de como viene de la base de datos
  getAtencion() {
    this.atencionService.getAtenciones().subscribe(
      res => {
        this.Atencion = res;
        this.legibleAutocompleteAtencion(res);
      },
      err => console.log(err)
    );

  }

  legibleAutocompleteAtencion(response) {
    for (var key in response) {
      this.atencion.push(response[key].nombre + " " + response[key].apellidoPaterno + " " + response[key].apellidoMaterno);
    }
  }

  obtenerAtencion(value) {
    var atencion = this.Atencion;
    for (var key in atencion) {
      var nombre = atencion[key].nombre + " " + atencion[key].apellidoPaterno + " " + atencion[key].apellidoMaterno
      if (value == nombre) {
        this.recepcion.medicoId = atencion[key].medicoId;
        break;
      }
    }
  }
  //FIN DE ATENCION

  //removeer examenes
  removerExamenGeneral(examen) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "¡Se removera el examen!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, remover!'
    }).then((result) => {
      if (result.value) {
        var index = this.ExamenGeneralRecepcion.map(function (est) { return est.EXAMEN_GEN_ID; }).indexOf(examen);
        this.ExamenGeneralRecepcion.splice(index, 1);
        Swal.fire(
          'Removido!',
          'El examen a sido removido.',
          'success'
        )
      }
    })
  }

  removerSubExamenSubseccion(examen, subExamen) {
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
        var index = this.ExamenGeneralRecepcion.map(function (est) { return est.EXAMEN_GEN_ID; }).indexOf(examen);
        var indexSubExamen = this.ExamenGeneralRecepcion[index].SUB_EXAMEN.map(function (exm) { return exm.NOMBRE; }).indexOf(subExamen);
        this.ExamenGeneralRecepcion[index].SUB_EXAMEN.splice(indexSubExamen, 1);
        Swal.fire(
          'Removido!',
          'El examen a sido removido.',
          'success'
        )
      }
    })
  }

  removerSubExamenSubSeccion(examen, subSeccion, subExamen) {
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
        var index = this.ExamenGeneralRecepcion.map(function (est) { return est.EXAMEN_GEN_ID; }).indexOf(examen);
        var indexSubSeccion = this.ExamenGeneralRecepcion[index].SUB_SECCION.map(function (sub) { return sub.NOMBRE; }).indexOf(subSeccion);
        var indexSubExamen = this.ExamenGeneralRecepcion[index].SUB_SECCION[indexSubSeccion].EXAMEN.map(function (exm) { return exm.NOMBRE; }).indexOf(subExamen);
        this.ExamenGeneralRecepcion[index].SUB_SECCION[indexSubSeccion].EXAMEN.splice(indexSubExamen, 1);
        Swal.fire(
          'Removido!',
          'El examen a sido removido.',
          'success'
        )
      }
    })
  }

  //fin de remover examenes

  //SWEETALERT MESSAGES

  errorRecepcion(msg) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: msg
    })
    //footer: '<a href>Why do I have this issue?</a>' va en el json
  }



  private _filterGroup(value: string): StateGroup[] { //filtro para examenes
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  private _filter(value: string): string[] {//filtro para paciente
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filterAtencion(valueAtencion: string): string[] {//filtro para atencion
    const filterValueAtencion = valueAtencion.toLowerCase();

    return this.optionsAtencion.filter(optionAtencion => optionAtencion.toLowerCase().includes(filterValueAtencion));
  }


}
