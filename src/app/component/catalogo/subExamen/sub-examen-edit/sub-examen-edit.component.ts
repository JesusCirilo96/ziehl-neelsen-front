import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubExamen } from 'src/app/models/SubExamen';
import { SubExamenMetodo } from 'src/app/models/SubExamenMetodo';
import { Referencia } from 'src/app/models/Referencia';
import { SubExamenReferencia } from 'src/app/models/SubExamenReferencia';

import { SubExamenService } from 'src/app/services/subExamen/sub-examen.service';
import { SubSeccionService } from 'src/app/services/subSeccion/sub-seccion.service';
import { MetodoService } from 'src/app/services/metodo/metodo.service';
import { SubExamenMetodoService } from 'src/app/services/subExamenMetodo/sub-examen-metodo.service';
import { SubExamenReferenciaService } from 'src/app/services/subExamenReferencia/sub-examen-referencia.service';
import { ReferenciaService } from 'src/app/services/referencia/referencia.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-sub-examen-edit',
  templateUrl: './sub-examen-edit.component.html',
  styleUrls: ['./sub-examen-edit.component.css']
})
export class SubExamenEditComponent implements OnInit {
  constructor(private subExamenService: SubExamenService,
    private router: Router,
    private subSeccionService: SubSeccionService,
    private activateRoute: ActivatedRoute,
    private metodoService: MetodoService,
    private subExamenMetodoService: SubExamenMetodoService,
    private referenciaService: ReferenciaService,
    private subExamenReferenciaService: SubExamenReferenciaService
  ) {
  }

  edit: boolean = false;
  subSeccion: any = [];
  subExamen: SubExamen = {
    sub_examen_id: null,
    nombre: '',
    vr_hombre: '',
    vr_mujer: '',
    vr_general: '',
    vr_ninos: '',
    vr_ninas: '',
    vr_general_n: '',
    precio: null,
    metodo:null,
    referencia_personalizada:null,
    orden: null,
    estado: true,
    createdAt: '',
    updatedAt: ''
  }

  SubExamenMetodo: SubExamenMetodo = {
    metodo_id: null,
    sub_examen_id: null
  }

  Referencia = {
    referenciaId: null,
    nombre: '',
    orden: null,
    estado: true
  }

  SubExamenReferencia: SubExamenReferencia = {
    referencia_id: null,
    sub_examen_id: null
  }

  ngOnInit() {
    $("#subExamenEstado").hide();
    this.getMetodo();
    this.getSubExamen();
  }

  getSubExamen() {
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.subExamenService.getSubExamen(parametros.id).subscribe(
        res => {
          this.subExamen = res[0];
          this.edit = true;
          this.mostrarEstado(this.subExamen.estado);

          console.log(res[0]);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  saveNewSubExamen() {
    delete this.subExamen.referencia_personalizada;
    delete this.subExamen.metodo;
    this.subExamenService.saveSubExamen(this.subExamen).subscribe(
      res => {
        this.router.navigate(['/subexamen'])
      },
      err => {
        console.log(err);
      }
    )
    console.log(this.subExamen);
  }

  updateSubExamen() {
    this.subExamenService.updateSubExamen(this.subExamen.sub_examen_id, this.subExamen).subscribe(
      res => {
        this.router.navigate(['/subexamen'])
        this.edit = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  cancelarEdicion() {
    this.router.navigate(['/subexamen']);
  }

  activarInactivar() {
    if (this.subExamen.estado === false) {
      this.subExamen.estado = true;
    } else if (this.subExamen.estado === true) {
      this.subExamen.estado = false;
    }
    this.updateSubExamen();
  }

  mostrarEstado(estadoId) {
    if (this.edit) {
      if (estadoId === false) {
        $("#subExamenEstado").text("Activar");
        $("#subExamenEstado").addClass("success");
      } else if (estadoId == true) {
        $("#subExamenEstado").text("Inactivar");
        $("#subExamenEstado").addClass("warning");
      }
      $("#subExamenEstado").show();
    }
  }

  getSubSecciones() {
    this.subSeccionService.getSubSecciones().subscribe(
      res => {
        this.subSeccion = res;
      },
      err => console.error(err)
    );
  }

  Metodo: any = [];
  metodoEscogido: number;

  getMetodo() {
    this.metodoService.getMetodos().subscribe(
      res => {
        this.Metodo = res;
      },
      err => console.error(err)
    );
  }

  guardarMetodo() {
    this.SubExamenMetodo.metodo_id = this.metodoEscogido;
    this.SubExamenMetodo.sub_examen_id = this.subExamen.sub_examen_id;
    this.subExamenMetodoService.saveSubExamenMetodo(this.SubExamenMetodo).subscribe(
      res => {
        console.log('OK');
        this.metodoEscogido = null;
        this.getSubExamen();
      },
      error => {
        console.log(error);
      }
    );
  }
  referenciaPersonalizada: string;
  ordenReferencia: number;

  getIdReferencia() {
    var id = 0;
    /*this.referenciaService.getMaxId().subscribe(
      res => {
        id = parseInt(JSON.stringify(res));
        //this.Referencia.referencia_id = id + 1;
      },
      error => console.log(error)
    )*/
  }

  agregarReferencia() {
    this.getIdReferencia();
    this.guardarReferencia();
  }

  guardarReferencia() {
   /* this.Referencia = {
      nombre: this.referenciaPersonalizada,
      estado: true,
      orden: this.ordenReferencia
    }*/

    /*this.referenciaService.saveReferencia(this.Referencia).subscribe(
      res => {
        console.log("OK");
        this.guardarSubExamenReferencia(this.Referencia);
        console.log(this.Referencia);
      },
      error => {
        console.log(error);
      }
    )*/
  }

  guardarSubExamenReferencia(Referencia) {
    this.SubExamenReferencia.referencia_id = Referencia.referencia_id;
    this.SubExamenReferencia.sub_examen_id = this.subExamen.sub_examen_id;
    this.subExamenReferenciaService.saveSubExamenReferencia(this.SubExamenReferencia).subscribe(
      res => {
        console.log("OK");
        console.log(this.SubExamenReferencia);
        this.referenciaPersonalizada = '';
        this.ordenReferencia = null;
        this.getSubExamen();
      },
      error => {
        console.log(error);
      }
    )
  }


}
