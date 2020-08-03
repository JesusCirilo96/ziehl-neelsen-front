import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

import { SubSeccion } from 'src/app/models/SubSeccion';
import { SubExamen } from 'src/app/models/SubExamen';
import { SubSeccionSubExamen } from 'src/app/models/SubSeccionSubExamen';
import { SubExamenService } from 'src/app/services/subExamen/sub-examen.service';
import { SubseccionSubexamenService } from 'src/app/services/subSeccionSubExamen/subseccion-subexamen.service';
import { SubSeccionService } from 'src/app/services/subSeccion/sub-seccion.service';
import { MetodoService } from 'src/app/services/metodo/metodo.service';
import { SubseccionMetodoService } from 'src/app/services/subSeccionMetodo/subseccion-metodo.service';

import { SubSeccionMetodo } from 'src/app/models/SubSeccionMetodo';

import * as $ from 'jquery';

@Component({
  selector: 'app-sub-seccion-edit',
  templateUrl: './sub-seccion-edit.component.html',
  styleUrls: ['./sub-seccion-edit.component.css']
})
export class SubSeccionEditComponent implements OnInit {

  constructor(
    private subSeccionService: SubSeccionService,
    private subExamenService: SubExamenService,
    private subSeccionSubExamenService: SubseccionSubexamenService,
    private subSeccionMetodoService: SubseccionMetodoService,
    private router: Router,
    private metodoService: MetodoService,
    private activateRoute: ActivatedRoute) { }

  edit: boolean = false;

  examen : any =  [];
  examenColumns: string[] = [
    'sub_examen_id',
    'examen',
    'vr_hombre',
    'vr_mujer',
    'vr_general',
    'ordenExamen',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  subSeccion: SubSeccion = {
    sub_seccion_id: null,
    alineacion_estudios:1,
    nombre: '',
    metodo:null,
    orden: null,
    estado: true
  }
  subExamen: SubExamen = {
    sub_examen_id: null,
    nombre: '',
    vr_ninos:'',
    vr_ninas:'',
    vr_general_n:'',
    vr_hombre: '',
    vr_mujer: '',
    vr_general: '',
    orden: null,
    estado: true,
    createdAt: '',
    updatedAt: ''
  }
  subSeccionSubExamen: SubSeccionSubExamen = {
    sub_seccion_id: null,
    sub_examen_id: null,
  }

  Metodo: any = [];

  subSeccionMetodo : SubSeccionMetodo = {
    metodo_id:null,
    sub_seccion_id:null
  }

  ngOnInit() {
    $("#seccionEstado").hide();
    $("#addExamen").hide();
    this.getMetodo();
    this.getSubSeccion();
  }

  getSubSeccion(){
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.subSeccionService.getSubSeccion(parametros.id).subscribe(
        res => {
          this.subSeccion = res[0];
          this.edit = true;
          this.mostrarEstado(this.subSeccion.estado);
          this.getSubSeccionSubExamen(parametros.id);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  saveNewSubSeccion() {
    delete this.subSeccion.metodo;
    this.subSeccionService.saveSubSeccion(this.subSeccion).subscribe(
      res => {
        this.alerta('La sub seccion se guardo correctamente','success',false);
        this.router.navigate(['/subseccion'])
      },
      err => {
        this.alertaBoton('Verificar los datos','Error: ' + err, 'warning');
      }
    )
  }

  updateSubSeccion() {
    this.subSeccionService.updateSubSeccion(this.subSeccion.sub_seccion_id, this.subSeccion).subscribe(
      res => {
        this.alerta('Se Actualizaron los datos correctamente','success',false);
        this.router.navigate(['/subseccion'])
        this.edit = false;
      },
      err => {
        this.alertaBoton('Verificar los datos','Error: ' + err, 'warning');
      }
    )
  }

  cancelarEdicion() {
    this.router.navigate(['/subseccion']);
  }

  activarInactivar() {
    if (this.subSeccion.estado === false) {
      this.subSeccion.estado = true;
    } else if (this.subSeccion.estado === true) {
      this.subSeccion.estado = false;
    }
    this.updateSubSeccion();
  }

  mostrarEstado(estadoId) {
    if (this.edit) {
      if (estadoId === false) {
        $("#subSeccionEstado").text("Activar");
        $("#subSeccionEstado").addClass("success");
      } else if (estadoId == true) {
        $("#subSeccionEstado").text("Inactivar");
        $("#subSeccionEstado").addClass("warning");
        $("#addExamen").show();
      }
      $("#subSeccionEstado").show();
    }
  }

  getSubSeccionSubExamen(id) {
    this.subSeccionSubExamenService.getSubSeccionSubExamen(id).subscribe(
      res => {
        this.examen = res;
        this.dataSource.data = this.examen;
        //console.log(this.examen);
      },
      err => {
        console.log(err);
      }
    )
  }

  saveSubExamen(){
    this.getSubExamenId();
    this.subExamenService.saveSubExamen(this.subExamen).subscribe(
      res => {
        this.saveSubSeccionSubExamen(this.subExamen.sub_examen_id);
        this.alerta('El Examen se guardo Correctamente', 'success',false)
      },
      err => {
        this.alertaBoton('Verificar los datos','Error: '+ err, 'warning')
      });
    console.log(this.subExamen);
  }

  saveSubSeccionSubExamen(subExamen) {
    this.subSeccionSubExamen.sub_examen_id = subExamen;
    this.subSeccionSubExamen.sub_seccion_id = this.subSeccion.sub_seccion_id;
    this.subSeccionSubExamenService.saveSubSeccionSubExamen(this.subSeccionSubExamen).subscribe(
      res => {
        this.getSubSeccionSubExamen(this.subSeccion.sub_seccion_id);
        this.subExamen = {
          sub_examen_id:null,
          nombre: '',
          vr_hombre: '',
          vr_mujer: '',
          vr_general: '',
          orden: null,
          estado: true,
          createdAt: '',
          updatedAt: ''
        }
        this.subSeccionSubExamen = {
          sub_seccion_id: null,
          sub_examen_id: null,
        }
      },
      err => {
        console.log(err);
      }
    )
    console.log(this.saveSubSeccionSubExamen);
  }

  getSubExamenId(){
    this.subExamenService.getMaxId().subscribe(
      res=>{
        const id = parseInt(JSON.stringify(res));
        this.subExamen.sub_examen_id = id + 1;
      },
      err =>{
        console.log(err);
      }
    );
  }

  getMetodo(){
    this.metodoService.getMetodos().subscribe(
      res=>{
        this.Metodo = res;
      },
      error => console.log(error)
    )
  }
  metodoEscogido:number;
  guardarMetodo(){
    this.subSeccionMetodo.metodo_id = this.metodoEscogido;
    this.subSeccionMetodo.sub_seccion_id = this.subSeccion.sub_seccion_id;
    this.subSeccionMetodoService.saveSubSeccionMetodo(this.subSeccionMetodo).subscribe(
      res=>{
        console.log('OK');
        this.getSubSeccion();
      },
      error=>{
        console.log(error)
      }
    )
  }

  alerta(title,type, button){
    Swal.fire({
      position: 'center',
      type: type,
      title: title,
      showConfirmButton: button,
      timer: 1200
    })
  }

  alertaBoton(title,message ,type){
    Swal.fire(
      title,
      message,
      type
    )
  }
}
