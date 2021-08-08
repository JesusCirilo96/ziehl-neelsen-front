import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudioService } from 'src/app/services/estudio/estudio.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Estudio } from 'src/app/models/Estudio';
import { Referencia } from 'src/app/models/Referencia';
import { Metodo } from 'src/app/models/Metodo';
import { ClasificacionPacienteService } from 'src/app/services/clasificacionPaciente/clasificacion-paciente.service';
import { MetodoService } from 'src/app/services/metodo/metodo.service';

export interface DialogData {
  estudioOrden: number,
  estudioNombre: string,
  examenId: number,
  seccionId: number
}

export interface User {
  name: string;
}
@Component({
  selector: 'app-dialogo-estudio',
  templateUrl: './dialogo-estudio.component.html',
  styleUrls: ['./dialogo-estudio.component.css']
})
export class DialogoEstudioComponent implements OnInit {
  constructor(
    private metodoService: MetodoService,
    private clasificacionService: ClasificacionPacienteService,
    public dialogRef: MatDialogRef<DialogoEstudioComponent>,
    private estudioService: EstudioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  //Datos del estudio
  nombreEstudio: string;
  comodin: boolean = false;
  orden: number = 0;
  anadirResPred: string = "";//La respuesta predeterminada del examen
  respuestaSelect: any = [];

  estudio: Estudio = {
    estudioId: null,
    nombre: '',
    comodin: false,
    resultadoSelect: '',
  }

  //Datos de la referencia
  ListClasificacion: any = [];
  listReferencias: any = [];
  referencia: Referencia = {
    estudioId: null,
    clasificacionId: 1,
    masculino: '',
    femenino: '',
    general: '',
    orden: 0,
    nota: '',
    prefijo: ''
  }

  //datos del metodo
  metodo: Metodo = {
    metodoId: 0,
    nombre: ''
  }
  listMetodos: any = [];
  ListMetodo: any = [];
  metodoId: number;

  estudioId: number = null;
  clasificacionId: number = 1;
  masculino: string = "";
  femenino: string = "";
  general: string = "";
  ordenReferencia: number = 0;
  nota: string = "";
  sufijo: string = "";

  estudioSave: any = [];

  seleccionado = false;
  actualizarDatos = true;

  EstudiosDisponibles: any = [];
  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;

  guardarListNuevo: any = [];
  guardarListExistente: any = [];

  ngOnInit() {
    if (this.data[0].estudioNombre != "") {
      this.nombreEstudio = this.data[0].estudioNombre;
      this.orden = this.data[0].estudioOrden;
      this.actualizarDatos = false;
    }
    if (this.actualizarDatos) {
      this.getClasificacion();
      this.getMetodos();
      console.log(this.data[0].seccionId);
    }
    this.getEstudios();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getEstudios() {
    this.estudioService.getEstudios().subscribe(
      res => {
        var opciones = [];
        for (var key in res) {
          opciones.push(
            { name: res[key].nombre }
          );
        }
        this.options = opciones;
        this.EstudiosDisponibles = res;
      },
      err => console.error(err)
    );
  }

  getClasificacion() {
    this.clasificacionService.getClasificacionPacientes().subscribe(
      response => {
        this.ListClasificacion = response;
      },
      err => console.error(err)
    );
  }

  getMetodos() {
    this.metodoService.getMetodos().subscribe(
      response => {
        this.ListMetodo = response;
      },
      err => console.error(err)
    );
  }

  responseDialogo() {
    var response = [];
    if (this.actualizarDatos) {
      response.push(
        {
          'status': true
        }
      );
    } else {
      var idEstudio;
      if (this.myControl.value != null) {
        var estudios = this.EstudiosDisponibles;
        for (var key in estudios) {
          if (this.myControl.value.name == estudios[key].nombre) {
            idEstudio = estudios[key].estudioId;
            break;
          }
        }
      }
      response.push(
        {
          'nombreEstudio': this.nombreEstudio,
          'porId': this.seleccionado,
          'idEstudio': idEstudio,
          'orden': this.orden
        }
      );
    }


    return response;
  }

  anadirPosibleRespuestaEstudio(): void {
    if (this.anadirResPred != "") {
      this.respuestaSelect.push({ value: this.anadirResPred, viewValue: this.anadirResPred });
    }
    this.anadirResPred = "";
  }

  removerPosibleRespuestaEstudio(index: number): void{
    this.respuestaSelect.splice(index, 1);
  }

  anadirReferencia() {
    if (this.referencia.femenino != "" || this.referencia.masculino != "" || this.referencia.general != "") {

      this.listReferencias.push(this.referencia);

      this.referencia = {
        estudioId: null,
        clasificacionId: 1,
        masculino: "",
        femenino: "",
        general: "",
        orden: 0,
        nota: "",
        prefijo: "",
        sufijo: ""
      }
    }

  }

  removerReferencia(index: number): void{
    this.listReferencias.splice(index,1);
  }

  anadirMetodo() {
    if (this.metodo.metodoId != 0) {
      var nombreMetodo;
      for (var key in this.ListMetodo) {
        if (this.ListMetodo[key].metodoId == this.metodo.metodoId) {
          nombreMetodo = this.ListMetodo[key].nombre;
          break;
        }
      }
      this.listMetodos.push({
        metodoId: this.metodo.metodoId,
        nombre: nombreMetodo
      });

      this.metodo = {
        metodoId: 0,
        nombre: ""
      }
    }
  }

  removerMetodo(index: number): void{
    this.listMetodos.splice(index, 1);
  }

  anadirEstudio(): void {
    if (this.estudio.nombre != "") {
      if (!this.seleccionado) {

        this.estudioSave.push({
          estudio: this.estudio,
          examenId: this.data[0].examenId,
          seccionId: this.data[0].seccionId,
          referencia: this.listReferencias,
          ordenEstudio: this.orden,
          metodo: this.listMetodos,
          resultadoPred: this.respuestaSelect
        });

        console.log(this.estudioSave);

      } else {
        var idEstudio;
        if (this.myControl.value != null) {
          var estudios = this.EstudiosDisponibles;
          for (var key in estudios) {
            if (this.myControl.value.name == estudios[key].nombre) {
              idEstudio = estudios[key].estudioId;
              break;
            }
          }
        }

        this.estudioSave.push({
          estudio: idEstudio,
          examenId: this.data[0].examenId,
          seccionId: this.data[0].seccionId,
          referencia: this.listReferencias,
          ordenEstudio: this.orden,
          metodo: this.listMetodos,
          resultadoPred: this.respuestaSelect
        });

      }

      this.estudio = {
        estudioId: null,
        nombre: "",
        comodin: false,
        resultadoSelect: "",
      }

      this.respuestaSelect = [];
      this.listReferencias = [];
      this.listMetodos = [];
      this.orden = 0;
    }
  }

  removerEstudio(index:number): void{
    this.estudioSave.splice(index,1);
  }


  guardarEstudio(): void {

    this.estudioService.saveEstudioMasivo(this.estudioSave).subscribe(
      response => {
        console.log(response);
        if (response['errorCode'] == "OK") {
          console.log("Guardado correcto");
        }
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.estudioSave);
    this.estudioSave = [];
  }

}
