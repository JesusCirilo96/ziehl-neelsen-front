import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

//MODELS
import { ExamenGeneral } from 'src/app/models/ExamenGeneral';
import { ExamenGeneralSubSeccion } from 'src/app/models/ExamenGeneralSubSeccion';
import { ExamenGeneralSubExamen } from 'src/app/models/ExamenGeneralSubExamen';
import { ExamenGeneralMetodo } from 'src/app/models/ExamenGeneralMetodo';
import { ExamenGeneralReferencia } from 'src/app/models/ExamenGeneralReferencia';
import { Referencia } from 'src/app/models/Referencia';
import { SubExamen } from 'src/app/models/SubExamen';
import { SubExamenReferencia } from 'src/app/models/SubExamenReferencia';


//SERVICES
import { ExamenGeneralService } from 'src/app/services/examenGeneral/examen-general.service';
import { SeccionesService } from 'src/app/services/secciones.service';
import { SubSeccionService } from 'src/app/services/subSeccion/sub-seccion.service';
import { SubExamenService } from 'src/app/services/subExamen/sub-examen.service';
import { ExamenGeneralSubseccionService } from 'src/app/services/examenGeneralSubSeccion/examen-general-subseccion.service';
import { ExamenGeneralSubExamenService } from 'src/app/services/examenGeneralSubExamen/examen-general-sub-examen.service';
import { TipoExamenService } from 'src/app/services/tipoExamen/tipo-examen.service';
import { MetodoService } from 'src/app/services/metodo/metodo.service';
import { ExamenGeneralMetodoService } from 'src/app/services/examenGeneralMetodo/examen-general-metodo.service';
import { ExamenGeneralReferenciaService } from 'src/app/services/examenGeneralReferencia/examen-general-referencia.service';

import { DialogoComponent } from '../dialogo/dialogo.component';

import * as $ from 'jquery';
import { ReferenciaService } from 'src/app/services/referencia/referencia.service';
import { SubExamenReferenciaService } from 'src/app/services/subExamenReferencia/sub-examen-referencia.service';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';

@Component({
  selector: 'app-examen-general-edit',
  templateUrl: './examen-general-edit.component.html',
  styleUrls: ['./examen-general-edit.component.css']
})

export class ExamenGeneralEditComponent implements OnInit {
  constructor(
    private examenGeneralService: ExamenGeneralService,
    private seccionesService: SeccionesService,
    private subSeccionService: SubSeccionService,
    private subExamenService: SubExamenService,
    private tipoExamenService: TipoExamenService,
    private examenGeneralSubseccionService: ExamenGeneralSubseccionService,
    private examenGeneralSubExamenService: ExamenGeneralSubExamenService,
    private referenciaService: ReferenciaService,
    private subExamenReferenciaService: SubExamenReferenciaService,
    private metodoService: MetodoService,
    private examenGeneralMetodoService: ExamenGeneralMetodoService,
    private examenGeneralReferenciaService: ExamenGeneralReferenciaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  panelOpenState = false;
  subEstudio: number;

  edit: boolean = false;

  Metodo: any = [];
  Seccion: any = [];
  SubSeccion: any = [];
  SubExamen: any = [];
  TipoExamen: any = [];

  ExamenTipo: number = 1;//tipo de examen seleccionado
  referenciaPersonalizada: string;//variable para guardar la referencia
  ReferenciaPersonalizada: any = [];//alamcena las referencias personalizadas


  obtenerExamenGeneralSubExamen: any = [];
  obtenerExamenGeneralSubseccion: any = [];

  examenGeneralSubSeccion: ExamenGeneralSubSeccion = {
    examen_gen_id: null,
    sub_seccion_id: null
  }

  examenGeneralSubExamen: ExamenGeneralSubExamen = {
    examen_gen_id: null,
    sub_examen_id: null
  }

  examenGeneral: ExamenGeneral = {
    examen_gen_id: null,
    nombre: '',
    alias: '',
    precio: null,
    vr_ninos: '',
    vr_ninas: '',
    vr_general_n: '',
    vr_hombre: '',
    vr_mujer: '',
    vr_general: '',
    estado: true,
    createdAt: '',
    updatedAt: '',
    seccion_id: null
  }

  subExamen: SubExamen = {
    sub_examen_id: null,
    nombre: '',
    vr_ninos: '',
    vr_ninas: '',
    vr_general_n: '',
    vr_hombre: '',
    vr_mujer: '',
    vr_general: '',
    orden: null,
    estado: true,
    createdAt: '',
    updatedAt: ''
  }
  aux_referencia: number = 0;

  referencia: Referencia = {
    referencia_id: null,
    nombre: '',
    orden: null,
    estado: true,
  }

  subExamenReferencia: SubExamenReferencia = {
    referencia_id: null,
    sub_examen_id: null
  }

  examenGeneralMetodo: ExamenGeneralMetodo = {
    examen_gen_id: null,
    metodo_id: null
  }

  examenGeneralReferencia: ExamenGeneralReferencia={
    examen_gen_id:null,
    referencia_id:null
  }

  SubExamenReferencia: any = [];//alamacenar referencias perzonalizadas del SUBEXAMEN

  ngOnInit() {
    this.getReferenciaId();
    $("#examenEstado").hide();
    $("#addExamenes").hide();
    this.getMetodo();
    this.getSecciones();
    this.getSubsecciones();
    this.getSubExamenes();
    this.getTipoExamen();
    this.getExamenGeneral();
  }

  getExamenGeneral(){
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.examenGeneralService.getExamenGeneral(parametros.id).subscribe(
        res => {
          this.examenGeneral = res[0];
          this.edit = true;
          this.mostrarEstado(this.examenGeneral.estado);
          this.getExamenGeneralSubSeccion(parametros.id);
          this.getExamenGeneralSubExamen(parametros.id);
        },
        err => {
          console.log(err);
        }
      )
    }
  }
  saveNewExamenGeneral() {
    this.examenGeneralService.saveExamenGeneral(this.examenGeneral).subscribe(
      res => {
        this.alerta('Se Guardo el Examen','success',false);
        this.router.navigate(['/examengeneral'])
      },
      err => {
        this.alertaBoton('Verificar datos introducidos','Error: ' + err,'warning')
      }
    )
  }

  /**GUARDADO DE REFERENCIASPERSONALIZADAS DEL EXAMEN GENERAL */

  //referenciaPersonalizada: string;
  ordenReferencia: number;

  getIdReferencia() {
    var id = 0;
    this.referenciaService.getMaxId().subscribe(
      res => {
        id = parseInt(JSON.stringify(res));
        this.referencia.referencia_id = id + 1;
      },
      error => console.log(error)
    )
  }

  agregarReferencia() {
    this.getIdReferencia();
    this.guardarReferencia();
  }

  guardarReferencia() {
    this.referencia = {
      nombre: this.referenciaPersonalizada,
      estado: true,
      orden: this.ordenReferencia
    }

    this.referenciaService.saveReferencia(this.referencia).subscribe(
      res => {
        this.guardarExamenGeneralReferencia(this.referencia);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarExamenGeneralReferencia(Referencia) {
    this.examenGeneralReferencia.referencia_id = Referencia.referencia_id;
    this.examenGeneralReferencia.examen_gen_id = this.examenGeneral.examen_gen_id;
    this.examenGeneralReferenciaService.saveExamenGeneralReferencia(this.examenGeneralReferencia).subscribe(
      res => {
        this.referenciaPersonalizada = '';
        this.ordenReferencia = null;
        this.getExamenGeneral();
        this.referencia = {
          referencia_id: null,
          nombre: '',
          orden: 0,
          estado: true,
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  /**FIN DEL GUARDADO DE REFERENCIASPERSONALIZADAS DEL EXAMEN GENERAL */

  /**INICIO GAURDAR SUBEXAMEN Y REFERENCIAS PERSONALIZADAS */
  getSubExamenId() {
    this.subExamenService.getMaxId().subscribe(
      res => {
        const id = parseInt(JSON.stringify(res));
        this.subExamen.sub_examen_id = id + 1;
      },
      err => {
        console.log(err);
      }
    );
  }

  getReferenciaId() {
    var id = 0;
    this.referenciaService.getMaxId().subscribe(
      res => {
        id = parseInt(JSON.stringify(res));
        this.aux_referencia = id;
      },
      err => {
        console.log(err);
      }
    );
  }

  agregarReferenciaPerzonalizada(valor) {
    this.aux_referencia += 1;
    this.ReferenciaPersonalizada.push({
      referencia: valor,
      referencia_id: this.aux_referencia
    });
    this.referenciaPersonalizada = '';
  }

  saveSubExamen() {
    this.getSubExamenId();
    this.subExamenService.saveSubExamen(this.subExamen).subscribe(
      res => {
        this.examenGeneralSubExamen.sub_examen_id = this.subExamen.sub_examen_id;
        if (this.ReferenciaPersonalizada.length != 0) {
          var referencia = this.ReferenciaPersonalizada;
          for (var key in referencia) {
            this.saveReferencia(referencia[key].referencia, referencia[key].referencia_id);
          }
        }
        this.saveExamenGeneralSubExamen();
      },
      err => {
        console.log(err);
      });
  }

  saveReferencia(referencia, referencia_id) {//guardamos las referencias personalizadas del subexamen
    this.referencia.nombre = referencia;
    this.referencia.orden = this.ordenReferencia;
    this.referencia.referencia_id = referencia_id;
    this.referenciaService.saveReferencia(this.referencia).subscribe(
      res => {
        this.saveSubExamenReferencia(referencia_id);
      },
      err => {
        console.log(err);
      }
    )
  }

  saveSubExamenReferencia(referencia_id) {
    this.subExamenReferencia.referencia_id = referencia_id;
    this.subExamenReferencia.sub_examen_id = this.subExamen.sub_examen_id;
    this.subExamenReferenciaService.saveSubExamenReferencia(this.subExamenReferencia).subscribe(
      res => {
        this.referencia = {
          referencia_id: null,
          nombre: '',
          orden: 0,
          estado: true,
        }
      },
      err => {
        console.log(err);
      }
    )
  }
/**FIN GAURDAR SUBEXAMEN Y REFERENCIAS PERSONALIZADAS */
  saveExamenGeneralSubExamen() {
    this.examenGeneralSubExamen.examen_gen_id = this.examenGeneral.examen_gen_id;
    this.examenGeneralSubExamenService.saveExamenGeneralSubexamen(this.examenGeneralSubExamen).subscribe(
      res => {
        //this.subTotal = 0;
        this.getExamenGeneralSubExamen(this.examenGeneral.examen_gen_id);
        this.getExamenGeneralSubSeccion(this.examenGeneral.examen_gen_id);
        this.subExamen = {
          sub_examen_id: null,
          nombre: '',
          vr_hombre: '',
          vr_mujer: '',
          vr_general: '',
          orden: null,
          estado: true,
          createdAt: '',
          updatedAt: ''
        }
        this.examenGeneralSubExamen = {
          examen_gen_id: null,
          sub_examen_id: null,
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  saveExamenGeneralSubSeccion() {
    this.examenGeneralSubSeccion.examen_gen_id = this.examenGeneral.examen_gen_id;
    this.examenGeneralSubSeccion.sub_seccion_id = this.subEstudio;
    this.examenGeneralSubseccionService.saveExamenGeneralSubseccion(this.examenGeneralSubSeccion).subscribe(
      res => {
        //this.subTotal = 0;
        this.getExamenGeneralSubSeccion(this.examenGeneral.examen_gen_id);
        this.getExamenGeneralSubExamen(this.examenGeneral.examen_gen_id);
        this.examenGeneralSubSeccion = {
          examen_gen_id: null,
          sub_seccion_id: null
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  updateExamenGeneral() {
    this.examenGeneralService.updateExamenGeneral(this.examenGeneral.examen_gen_id, this.examenGeneral).subscribe(
      res => {
        this.router.navigate(['/examengeneral'])
        this.edit = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  cancelarEdicion() {
    this.router.navigate(['/examengeneral']);
  }

  activarInactivar() {
    if (this.examenGeneral.estado === false) {
      this.examenGeneral.estado = true;
    } else if (this.examenGeneral.estado === true) {
      this.examenGeneral.estado = false;
    }
    this.updateExamenGeneral();
  }

  mostrarEstado(estadoId) {
    if (this.edit) {
      if (estadoId === false) {
        $("#examenGeneralEstado").text("Activar");
        $("#examenGeneralEstado").addClass("success");
      } else if (estadoId == true) {
        $("#examenGeneralEstado").text("Inactivar");
        $("#examenGeneralEstado").addClass("warning");
        $("#addExamenes").show();
      }
      $("#examenGeneralEstado").show();
    }
  }

  getSecciones() {
    this.seccionesService.getSecciones().subscribe(
      res => {
        this.Seccion = res;
      },
      err => console.error(err)
    );
  }

  getSubsecciones() {
    this.subSeccionService.getSubSecciones().subscribe(
      res => {
        this.SubSeccion = res;
      },
      err => console.log(err)
    );
  }

  getTipoExamen() {
    this.tipoExamenService.getTipoExamenes().subscribe(
      res => {
        this.TipoExamen = res;
      },
      err => console.log(err)
    );
  }

  getSubExamenes() {
    this.subExamenService.getSubExamenes().subscribe(
      res => {
        this.SubExamen = res;
      },
      err => console.log(err)
    );
  }

  getExamenGeneralSubSeccion(id) {
    this.examenGeneralSubseccionService.getExamenGeneralSubseccion(id).subscribe(
      res => {
        if (Object.keys(res).length === 0) {
          this.obtenerExamenGeneralSubseccion = null;
        } else {
          this.obtenerExamenGeneralSubseccion = res;
          //this.obtenerSubTotal('c', res)
        }
      },
      err => console.log(err)
    );
  }

  getExamenGeneralSubExamen(id) {
    this.examenGeneralSubExamenService.getExamenGeneralSubexamen(id).subscribe(
      res => {
        if (Object.keys(res).length === 0) {
          this.obtenerExamenGeneralSubExamen = null;
        } else {
          this.obtenerExamenGeneralSubExamen = res;
        }
      },
      err => console.log(err)
    );
  }


  // GUARDAR METODO
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
    this.examenGeneralMetodo.examen_gen_id = this.examenGeneral.examen_gen_id;
    this.examenGeneralMetodo.metodo_id = this.metodoEscogido;

    this.examenGeneralMetodoService.saveExamenGenMetodo(this.examenGeneralMetodo).subscribe(
      res => {
        this.getExamenGeneral();
        this.examenGeneralMetodo = {
          examen_gen_id: null,
          metodo_id: null
        }
      },
      err =>{
        console.log(err)
      }
    );
  }



  deleteSubEstudio(id) {
    console.log(id);
  }

  deleteSubExamen(id) {
    console.log(id);
  }

  deleteExamen(id) {
    console.log(id);
  }

  subExamenId: number;
  examen: any = []
  openDialog() {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '500px',
      data: { examen: this.examen }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
       // console.log(result[0].examenId, result[0].catalogo)
        if (result[0].catalogo == 'subexamen') {
          this.examenGeneralSubExamen.sub_examen_id = result[0].examenId;
          this.saveExamenGeneralSubExamen();
        }
      }
    });

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
