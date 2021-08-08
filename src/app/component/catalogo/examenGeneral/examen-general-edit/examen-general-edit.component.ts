import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

//MODELS
import { ExamenGeneral } from 'src/app/models/ExamenGeneral';
import { Referencia } from 'src/app/models/Referencia';
import { MetodoSeccion } from 'src/app/models/MetodoSeccion';
import { MetodoEstudio } from 'src/app/models/MetodoEstudio';
import { ExamenEstudio } from 'src/app/models/ExamenEstudio';
import { SeccionExamen } from 'src/app/models/SeccionExamen';
import { SeccionEstudio } from 'src/app/models/SeccionEstudio';
import { ExamenSeccion } from 'src/app/models/ExamenSeccion';
import { ResultadoSelectEstudio } from 'src/app/models/ResultadoSelectEstudio';

//SERVICES
import { ExamenGeneralService } from 'src/app/services/examenGeneral/examen-general.service';
import { MetodoService } from 'src/app/services/metodo/metodo.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ReferenciaService } from 'src/app/services/referencia/referencia.service';
import { SeccionService } from 'src/app/services/seccion/seccion.service';
import { EstudioService } from 'src/app/services/estudio/estudio.service';

//COMPONENTS

//Dialogos
import { DialogoComponent } from '../dialogo/dialogo.component';
import { DialogReferenciaComponent } from '../dialog-referencia/dialog-referencia.component';
import { DialogoSeccionComponent } from '../dialogo-seccion/dialogo-seccion.component';
import { DialogoEstudioComponent } from '../dialogo-estudio/dialogo-estudio.component';
import { DialogoRespuestaComponent } from '../dialogo-respuesta/dialogo-respuesta/dialogo-respuesta.component';

import * as $ from 'jquery';

import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import { Seccion } from 'src/app/models/Seccion';


@Component({
  selector: 'app-examen-general-edit',
  templateUrl: './examen-general-edit.component.html',
  styleUrls: ['./examen-general-edit.component.css']
})

export class ExamenGeneralEditComponent implements OnInit {
  constructor(
    private estudioService: EstudioService,
    private examenGeneralService: ExamenGeneralService,
    private metodoService: MetodoService,
    private refereciaService: ReferenciaService,
    private seccionService: SeccionService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  selectable = true;
  removable = true;

  edit: boolean = false;

  addRespuesta: boolean = false;
  addResponse: string = "";
  respuestaSelect: any = [];

  ListLayouts: any = [
    {
      name: "Rutina",
      value: 1
    },
    {
      name: "Especial",
      value: 2
    },
    {
      name: "U. CONVENCIONALES",
      value: 3
    },
    {
      name: "General de orina",
      value: 4
    },
    {
      name: "Citometria hematica",
      value: 5
    },
  ]

  ListMetodo: any = [];//lista para los metodos
  Categoria: any = []; //lista para las categorias
  ExamenSeccion: any = []; //Lista para los examenes con sus respectivas secciones
  ExamenEstudioList: any = [];//Lista para los estudios de los examenes
  ReferenciaEstudio: any = [];
  referencia: Referencia = {
    referenciaId:null,
    clasificacionId: null,
    estudioId: null,
    femenino: '',
    masculino: '',
    general: '',
    orden:0,
    nota:'',
    sufijo:'',
    prefijo:''
  }

  metodoSeccion: MetodoSeccion = {
    metodoId: null,
    seccionId: null
  }

  metodoEstudio: MetodoEstudio = {
    metodoId: null,
    estudioId: null
  }

  examenGeneral: ExamenGeneral = {
    examenGeneralId: null,
    nombre: '',
    alias: '',
    tituloIzquierdo: '',
    tituloCentro: '',
    tituloDerecho: '',
    estado: true,
    precio: 0.0,
    clave: '',
    layout: 1,
    categoriaId: null,
    fechaCreacion: '',
    fechaActualizacion: ''
  }

  examenEstudio: ExamenEstudio = {
    examenId: null,
    nombreEstudio: '',
    porId: false,
    estudioId: null,
    orden: 0
  }

  examenSeccion: ExamenSeccion = {
    examenId: null,
    nombreSeccion: '',
    titulo: '',
    textoCent: '',
    textoDer: '',
    porId: false,
    seccionId: null,
    orden: 0
  }

  seccionExamen: SeccionExamen = {
    examenId: null,
    seccionId: null,
    orden: 0
  }

  seccionEstudio: SeccionEstudio = {
    seccionId: null,
    estudioId: null,
    orden: 0
  }

  resultadoSelect: ResultadoSelectEstudio = {
    estudioId: null,
    resultadoSelect: ""
  }

  formExamen: FormGroup;

  examenGeneralIdCtrl = new FormControl(null);
  examenNombreCtrl = new FormControl('', [Validators.required]);
  examenAliasCtrl = new FormControl('');
  examenTituloIzqCtrl = new FormControl('');
  examenTituloCentCtrl = new FormControl('');
  examenTituloDerCtrl = new FormControl('');
  examenEstadoCtrl = new FormControl(true);
  examenPrecioCtrl = new FormControl(0.0, [Validators.required]);
  examenClaveCtrl = new FormControl('');
  examenLayoutCtrl = new FormControl(1);
  examenCategoriaCtrl = new FormControl(null, [Validators.required]);
  examenFechaCreacionCtrl = new FormControl(null);
  examenFechaActualizacionCtrl = new FormControl(null);

  ngOnInit() {
    $("#examenEstado").hide();
    $("#addExamenes").hide();
    this.formGroupExamen();
    this.getExamenGeneral();
    this.getCategorias();
    this.getMetodos();
  }

  getExamenGeneral() {
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.examenGeneralService.getExamenSecciones(parametros.id).subscribe(
        res => {
          this.examenGeneral = res['examen'];
          if (res['seccion'] != null) {
            this.ExamenSeccion = res['seccion'];
          }
          if (res['estudio'] != null) {
            this.ExamenEstudioList = res['estudio'];
          }
          this.formExamen.patchValue({
            examenGeneralId: this.examenGeneral.examenGeneralId,
            nombre: this.examenGeneral.nombre,
            alias: this.examenGeneral.alias,
            tituloIzquierdo: this.examenGeneral.tituloIzquierdo,
            tituloCentro: this.examenGeneral.tituloCentro,
            tituloDerecho: this.examenGeneral.tituloDerecho,
            estado: this.examenGeneral.estado,
            precio: this.examenGeneral.precio,
            layout: this.examenGeneral.layout,
            clave: this.examenGeneral.clave,
            categoriaId: this.examenGeneral.categoriaId,
            fechaCreacion: this.examenGeneral.fechaCreacion,
            fechaActualizacion: this.examenGeneral.fechaActualizacion,
          });
          this.edit = true;
          console.log(this.formExamen.value)
          console.log(this.ExamenSeccion)
          console.log(this.ExamenEstudioList);
          this.mostrarEstado(this.examenGeneral.estado);

        },
        err => {
          console.log(err);
        }
      )
    }
  }

  formGroupExamen() {
    this.formExamen = this._formBuilder.group({
      examenGeneralId: this.examenGeneralIdCtrl,
      nombre: this.examenNombreCtrl,
      alias: this.examenAliasCtrl,
      tituloIzquierdo: this.examenGeneral.tituloIzquierdo,
      tituloCentro: this.examenGeneral.tituloCentro,
      tituloDerecho: this.examenGeneral.tituloDerecho,
      estado: this.examenEstadoCtrl,
      precio: this.examenPrecioCtrl,
      clave: this.examenClaveCtrl,
      layout: this.examenLayoutCtrl,
      categoriaId: this.examenCategoriaCtrl,
      fechaCreacion: this.examenFechaCreacionCtrl,
      fechaActualizacion: this.examenFechaActualizacionCtrl,
    });
  }
  saveNewExamenGeneral() {
    this.examenGeneralService.saveExamenGeneral(this.formExamen.value).subscribe(
      res => {
        this.alerta('Se Guardo el Examen', 'success', false);
        this.router.navigate(['/examengeneral'])
      },
      err => {
        this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
      }
    )
    console.log(this.formExamen.value);
  }

  updateExamenGeneral() {
    this.examenGeneralService.updateExamenGeneral(this.formExamen.value).subscribe(
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

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      res => {
        this.Categoria = res;
        console.log(this.Categoria);
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

  alerta(title, type, button) {
    Swal.fire({
      position: 'center',
      type: type,
      title: title,
      showConfirmButton: button,
      timer: 1200
    })
  }

  alertaBoton(title, message, type) {
    Swal.fire(
      title,
      message,
      type
    )
  }

  /*DIALOGO METODO */

  examen: any = []
  openDialog(seccionId, estudioId, porSeccion, paraExamen) {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '500px',
      data: { categoriaId: this.examen }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (porSeccion) {
          this.metodoSeccion = {
            metodoId: result[0].metodoId,
            seccionId: seccionId
          }
          this.guardarMetodo(this.metodoSeccion, porSeccion, false);
        } else {
          this.metodoEstudio = {
            metodoId: result[0].metodoId,
            estudioId: estudioId
          }
          this.guardarMetodo(this.metodoEstudio, porSeccion, paraExamen)
        }

      }
    });
  }

  guardarMetodo(metodoSeccion, porSeccion, paraExamen) {

    if (porSeccion) {
      this.metodoService.saveMetodoSeccion(metodoSeccion).subscribe(
        res => {
          this.alerta('Se Añadio el metodo exitosamente', 'success', false);
          this.obtenerMetodosSeccion(metodoSeccion.seccionId);
        },
        err => {
          this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
        }
      )
    } else {
      this.metodoService.saveMetodoEstudio(metodoSeccion).subscribe(
        res => {
          this.alerta('Se Añadio el metodo exitosamente', 'success', false);
          if (paraExamen) {
            this.obtenerMetodosEstudio(metodoSeccion.estudioId, true)
          } else {
            this.obtenerMetodosEstudio(metodoSeccion.estudioId, false);
          }
        },
        err => {
          this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
        }
      )
    }

  }

  obtenerMetodosSeccion(idSeccion) {
    this.metodoService.getMetodosSeccion(idSeccion).subscribe(
      response => {
        if (response != []) {
          var seccion = this.ExamenSeccion;
          for (var key in seccion) {
            if (seccion[key].seccion.seccionId == idSeccion) {
              seccion[key].metodo = response;
              break;
            }
          }
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  obtenerMetodosEstudio(idEstudio, paraExamen) {
    this.metodoService.getMetodosEstudio(idEstudio).subscribe(
      response => {
        console.log(response);
        if (response != []) {
          if (paraExamen) {
            for (var key in this.ExamenEstudioList) {
              if (this.ExamenEstudioList[key].estudioId == idEstudio) {
                this.ExamenEstudioList[key].metodo = response;
                break;
              }
            }
          } else {
            for (var key in this.ExamenSeccion) {
              for (var keyEst in this.ExamenSeccion[key].estudio) {
                if (this.ExamenSeccion[key].estudio[keyEst].estudioId == idEstudio) {
                  this.ExamenSeccion[key].estudio[keyEst].metodo = response;
                  break;
                }
              }
            }
          }

        }
      },
      err => {
        console.log(err);
      }
    );


  }

  removeMetodo(idSeccion: number, idEstudio: number, metodoId: number, porSeccion: boolean, paraExamen: boolean): void {
    Swal.fire({
      title: "¿Estas seguro?",
      html: "Se va aliminar el metodo",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        if (porSeccion) {
          this.metodoService.deleteMetodoSeccion(idSeccion, metodoId).subscribe(
            res => {
              this.alerta("Se elimino correctamente", "success", false);
              this.obtenerMetodosSeccion(idSeccion);
            }, error => {
              this.alertaBoton("Ocurrio un error", "Ocurrio un error mientras se eliminaba" + error, 'error')
            }
          );
        } else {
          this.metodoService.deleteMetodoEstudio(idEstudio, metodoId).subscribe(
            res => {
              this.alerta("Se elimino correctamente", "success", false);
              this.obtenerMetodosEstudio(idEstudio, paraExamen );
            }, error => {
              this.alertaBoton("Ocurrio un error", "Ocurrio un error mientras se eliminaba" + error, 'error')
            }
          );
        }
      }
    });

  }

  /*DIALOGO REFERENCIA */
  openDialogReferencia(estudioId, esPorSeccion, editar, seccioData) {
    var referenciaDialog;
    if(editar){
      console.log(seccioData);
      referenciaDialog = { editar: true, seccion : seccioData}
    }else{
      referenciaDialog = { editar: false}
    }
    

    const dialogReferencia = this.dialog.open(DialogReferenciaComponent, {
      width: '500px',
      data: referenciaDialog
    });

    dialogReferencia.afterClosed().subscribe(result => {
      if (result != undefined) {
        if(!editar){
          this.referencia = {
            clasificacionId: result[0].clasificacionId,
            estudioId: estudioId,
            femenino: result[0].referenciaFemenino,
            masculino: result[0].referenciaMasculino,
            general: result[0].referenciaGeneral,
            orden: result[0].orden,
            nota: result[0].nota,
            sufijo: result[0].sufijo,
            prefijo: result[0].prefijo
          }
          console.log(this.referencia)
          this.guardarReferencia(this.referencia, esPorSeccion);
        }else{
          this.referencia = {
            referenciaId: seccioData.referenciaId,
            clasificacionId: result[0].clasificacionId,
            femenino: result[0].referenciaFemenino,
            masculino: result[0].referenciaMasculino,
            general: result[0].referenciaGeneral,
            orden: result[0].orden,
            nota: result[0].nota,
            sufijo: result[0].sufijo,
            prefijo: result[0].prefijo
          }
          this.refereciaService.updateReferencia(this.referencia).subscribe(
            res => {
              this.alerta('Se actualizo la referencia exitosamente', 'success', false);
              Swal.fire({
                type: 'success',
                title: 'Se añadio la referencia',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              this.obtenerReferencia(estudioId, esPorSeccion);
            },
            err => {
              this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
            }
          );
        }
      }
    });
  }

  obtenerReferencia(idEstudio, esPorSeccion) {
    console.log(idEstudio);
    if (esPorSeccion) {
      for (var key in this.ExamenSeccion) {
        for (var llave in this.ExamenSeccion[key].estudio) {
          if (this.ExamenSeccion[key].estudio[llave].estudioId == idEstudio) {
            this.refereciaService.getReferenciaEstudio(idEstudio).subscribe(
              res => {
                this.ExamenSeccion[key].estudio[llave].referencia = res;
                console.log(res);
              },
              err => {
                console.log(err);
              }
            );
            break;
          }
        }
      }
    } else {
      var estudio = this.ExamenEstudioList;
      for (var key in estudio) {
        if (estudio[key].estudioId == idEstudio) {
          this.refereciaService.getReferenciaEstudio(idEstudio).subscribe(
            res => {
              estudio[key].referencia = res;
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
          break;
        }
      }
    }

  }


  guardarReferencia(referencia, esPorSeccion) {
    this.refereciaService.saveReferencia(referencia).subscribe(
      res => {
        this.alerta('Se Añadio la referencia exitosamente', 'success', false);
        Swal.fire({
          type: 'success',
          title: 'Se añadio la referencia',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.obtenerReferencia(referencia.estudioId, esPorSeccion);
      },
      err => {
        this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
      }
    );
  }

  eliminarReferencia(referenciaId, estudioId, porSeccion){
    
    Swal.fire({
      title: "¿Estas seguro?",
      html: "Se va a eliminar la referencia",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.refereciaService.deleteReferencia(referenciaId).subscribe(
          res => {
            this.alerta("Se elimino correctamente", "success", false);
            this.obtenerReferencia(estudioId, porSeccion);
          }, error => {
            this.alertaBoton("Ocurrio un error", "Ocurrio un error mientras se eliminaba" + error, 'error')
          }
        );
      }
    });

  }

  /*DIALOGO SECCION */

  openDialogoSeccion(editar, seccionEditar, orden) {
    if(!editar){
      seccionEditar = {editar:false};
    }else{
      seccionEditar = {editar:true, datos: seccionEditar, orden: orden}
    }

    const dialogSeccion = this.dialog.open(DialogoSeccionComponent, {
      width: '500px',
      data: seccionEditar
    });

    dialogSeccion.afterClosed().subscribe(result => {
      if (result != undefined) {
        if(editar){
          this.examenSeccion.porId = false;
          this.examenSeccion.seccionId = seccionEditar.datos.seccionId; 
          this.examenSeccion.nombreSeccion = result[0].nombreSeccion;
          this.examenSeccion.titulo = result[0].titulo;
          this.examenSeccion.textoCent = result[0].textoCent;
          this.examenSeccion.textoDer = result[0].textoDer;
          this.examenSeccion.examenId = this.examenGeneral.examenGeneralId;
          this.examenSeccion.orden = result[0].orden;

          console.log(this.examenSeccion);

          this.examenGeneralService.updatExamenSeccion(this.examenSeccion).subscribe(
            res => {
              this.alerta('Se Añadio la seccion exitosamente', 'success', false);
              this.getExamenSeccion(this.examenGeneral.examenGeneralId);
            },
            err => {
              this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
            }
          )
        }else{
          var porId = result[0].porId;
          if (porId) {
            console.log("Se guardara la seccion con el ID de la seccion:: " + result[0].idSeccion);
            this.examenSeccion.porId = true;
            this.examenSeccion.seccionId = result[0].idSeccion;
          } else {
            console.log("Se guardara la seccion por nombre::  " + result[0].nombreSeccion);
            this.examenSeccion.porId = false;
            this.examenSeccion.nombreSeccion = result[0].nombreSeccion;
            this.examenSeccion.titulo = result[0].titulo;
            this.examenSeccion.textoCent = result[0].textoCent;
            this.examenSeccion.textoDer = result[0].textoDer;
          }
          this.examenSeccion.examenId = this.examenGeneral.examenGeneralId;
          this.examenSeccion.orden = result[0].orden;
          this.guardarExamenSeccion(this.examenSeccion);
        }
        

        console.log("DIALOGO SECCION CERRADA")
      }
    });
  }

  guardarExamenSeccion(examenSeccion) {
    this.examenGeneralService.saveExamenSeccion(examenSeccion).subscribe(
      res => {
        this.alerta('Se Añadio la seccion exitosamente', 'success', false);
        this.getExamenSeccion(this.examenGeneral.examenGeneralId);
      },
      err => {
        this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
      }
    )
  }

  getExamenSeccion(examenId) {
    this.examenGeneralService.getExamenSecciones(examenId).subscribe(
      res => {
        this.ExamenSeccion = res['seccion'];;
      },
      err => {
        console.log(err);
      }
    )
  }

  /*DIALOGO ESTUDIO */
  dialogoEstudioActualiza: any = [];

  /**
   * paraSeccion variable boleana para determinar si el estudio es para la seccion
   * o para el examen 
   */
  openDialogoEstudio(paraSeccion, seccionId, update, estudioId, estudioNombre, estudioOrden) {
    if (update) {
      this.dialogoEstudioActualiza = [
        {
          "estudioOrden": estudioOrden,
          "estudioNombre": estudioNombre
        }
      ]
    } else {
      this.dialogoEstudioActualiza = [
        {
          "estudioOrden": 0,
          "estudioNombre": "",
          "examenId":this.examenGeneral.examenGeneralId,
          "seccionId": seccionId
        }
      ]
    }

    const dialogoEstudio = this.dialog.open(DialogoEstudioComponent, {
      width: '99%',
      data: this.dialogoEstudioActualiza
    });

    dialogoEstudio.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (update) {
          this.seccionEstudio.estudioId = estudioId;
          this.seccionEstudio.nombreEstudio = result[0].nombreEstudio;
          this.seccionEstudio.seccionId = seccionId;
          this.seccionEstudio.orden = result[0].orden;
          this.seccionEstudio.examenGeneralId = this.examenGeneral.examenGeneralId;
          console.log(this.seccionEstudio);
          this.seccionService.updateSeccionEstudio(this.seccionEstudio).subscribe(
            response => {
              console.log(response);
              if (response['errorCode'] == "OK") {
                this.alerta('Actualizado correctamente', 'success', false);
              }
            },
            error => {
              this.alertaBoton('Verificar los datos', 'Error' + error, 'warning')
            }
          );
        } 
        if(seccionId == 0){
          this.getExamenEstudios(this.examenGeneral.examenGeneralId);
        }else{
          this.getSeccionEstudios(seccionId);
        }
        /* else {
          var porId = result[0].porId;
          if (paraSeccion) {
            if (porId) {
              console.log("Se guardara estudio para la seccion por ID: " + result[0].idEstudio);
              this.seccionEstudio.estudioId = result[0].idEstudio;
              this.seccionEstudio.porId = true;
              this.seccionEstudio.seccionId = seccionId;
              this.seccionEstudio.orden = result[0].orden;
              this.guardarSeccionEstudio(this.seccionEstudio);
            } else {
              console.log("Se guardara estudio para la seccion por nuevo" + result[0].nombreEstudio);
              this.seccionEstudio.nombreEstudio = result[0].nombreEstudio;
              this.seccionEstudio.seccionId = seccionId;
              this.seccionEstudio.porId = false;
              this.seccionEstudio.orden = result[0].orden;
              this.guardarSeccionEstudio(this.seccionEstudio);
            }
            console.log("ESTUDIO PARA LA SECCION");
          } else {
            if (porId) {
              console.log("Se guardara estudio para el examen por ID: " + result[0].idEstudio);
              this.examenEstudio.examenId = this.examenGeneral.examenGeneralId;
              this.examenEstudio.porId = true;
              this.examenEstudio.estudioId = result[0].idEstudio;
              this.examenEstudio.orden = result[0].orden;
              this.guardarExamenEstudio(this.examenEstudio);
            } else {
              console.log("Se guardara estudio para el examen por nuevo " + result[0].nombreEstudio);
              this.examenEstudio.examenId = this.examenGeneral.examenGeneralId;
              this.examenEstudio.porId = false;
              this.examenEstudio.nombreEstudio = result[0].nombreEstudio;
              this.examenEstudio.orden = result[0].orden;
              this.guardarExamenEstudio(this.examenEstudio);
            }
            console.log("ESTUDIO PARA EL EXAMEN");
          }
        }*/
        console.log("DIALOGO ESTUDIO CERRADA")
      }
    });
  }

  hacerComodin(estudioId: number, estado: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      html: "Al hacer comodin el campo, no podras darle algun resultado.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.estudioService.updateComodin(estudioId, !estado).subscribe(
          response => {
            this.alerta("Se actualizo correctamente", "success", false);
          }, error => {
            this.alertaBoton("Ocurrio un error", "Ocurrio un error mientras se actualizaba el comodin." + error, 'error')
          }
        );
      }
    });
  }

  guardarSeccionEstudio(seccionEstudio) {
    this.seccionService.saveSeccionEstudio(seccionEstudio).subscribe(
      response => {
        this.alerta('Se Añadio el estudio exitosamente', 'success', false);
        this.getSeccionEstudios(seccionEstudio.seccionId);
      },
      error => {
        this.alertaBoton('Verificar los datos', 'Error' + error, 'warning')
      }
    );
  }

  getSeccionEstudios(seccionId) {
    this.seccionService.getSeccionEstudio(seccionId).subscribe(
      res => {
        if (res != []) {
          var seccion = this.ExamenSeccion;
          for (var key in seccion) {
            if (seccion[key].seccion.seccionId == seccionId) {
              seccion[key] = res;
              break;
            }
          }
        }

      }, err => {
        console.log(err);
      }
    );
  }

  guardarExamenEstudio(estudio) {
    this.examenGeneralService.saveExamenEstudio(estudio).subscribe(
      res => {
        this.alerta('Se Añadio el estudio exitosamente', 'success', false);
        this.getExamenEstudios(this.examenGeneral.examenGeneralId);
      },
      err => {
        this.alertaBoton('Verificar datos introducidos', 'Error: ' + err, 'warning')
      }
    );
  }

  getExamenEstudios(examenId) {
    this.examenGeneralService.getExamenEstudios(examenId).subscribe(
      res => {
        this.ExamenEstudioList = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  removerSeccion(seccionId, nombre) {
    this.alertaRemover("Se va a eliminar la sección <b>" + nombre + "</b>", "warning", "Se removio la sección exitosamente", 1, seccionId, 0);
  }

  removerEstudioPorSeccion(seccionId, estudioId, nombreEstudio) {
    this.alertaRemover("Se va a eliminar el estudio <b>" + nombreEstudio + "</b> de la sección.", "warning", "Se removio el estudio exitosamente", 2, seccionId, estudioId);
  }

  removerEstudioPorExamen(estudioId, nombreEstudio) {
    this.alertaRemover("Se va a eliminar el estudio <b>" + nombreEstudio + "</b> del examen.", "warning", "Se removio el estudio exitosamente", 3, 0, estudioId);
  }

  /**
   * 
   * @param texto El texto a mostrar en la alerta
   * @param tipo el tipo de alerta
   * @param deleteMsj El mensaje que se mostrara si se acepta
   * @param opcionARemover la opcion a remover 1: una seccion, 2: estudio de una seccion, 3: estudio del examen
   */
  alertaRemover(texto, tipo, deleteMsj, opcionARemover, seccionId, estudioId) {
    Swal.fire({
      title: "¿Estas seguro?",
      html: texto,
      type: tipo,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        switch (opcionARemover) {
          case 1:
            this.examenGeneralService.deleteExamenSeccion(this.examenGeneral.examenGeneralId, seccionId).subscribe(
              res => {
                console.log(res);
                var seccion = this.ExamenSeccion;
                for (var key in seccion) {
                  if (seccion[key].seccion.seccionId == seccionId) {
                    var index = this.ExamenSeccion.map(function (est) { return est.seccionId; }).indexOf(seccionId);
                    this.ExamenSeccion.splice(index, 1);
                    break;
                  }
                }
              }, error => {
                console.log(error);
              }
            );
            break;
          case 2:
            this.seccionService.deleteSeccionEstudio(seccionId, estudioId).subscribe(
              res => {
                console.log(res);
                var seccion = this.ExamenSeccion;
                for (var key in seccion) {
                  if (seccion[key].seccion.seccionId == seccionId) {
                    var indexEstudio = this.ExamenSeccion[key].estudio.map(function (sub) { return sub.estudioId; }).indexOf(estudioId);
                    this.ExamenSeccion[key].estudio.splice(indexEstudio, 1);
                    break;
                  }
                }

              }, error => {
                console.log(error);
              }
            );
            break;
          case 3:
            this.examenGeneralService.deleteExamenEstudio(this.examenGeneral.examenGeneralId, estudioId).subscribe(
              res => {
                console.log(res);
                var estudio = this.ExamenEstudioList;
                for (var key in estudio) {
                  console.log(estudio[key].estudioId);
                  if (estudio[key].estudioId == estudioId) {
                    var index = this.ExamenEstudioList.map(function (est) { return est.estudioId; }).indexOf(estudioId);
                    this.ExamenEstudioList.splice(index, 1);
                    break;
                  }
                }
              }, error => {
                console.log(error);
              }
            );
            break;
          default: console.log("Error");
            break;
        }
        Swal.fire(
          'Removido',
          deleteMsj,
          'success'
        )
      }
    })
  }

  respuestaDialog: any = [];
  openDialogRespuesta(estudioId, resultados, seccionId) {

    console.log("El estudio ID ::" + estudioId);

    const dialogoRespuesta = this.dialog.open(DialogoRespuestaComponent, {
      width: '500px',
      data: resultados
    });

    dialogoRespuesta.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.resultadoSelect = {
          estudioId: estudioId,
          resultadoSelect: JSON.stringify(result[0].respuestas)
        }
        this.estudioService.updateResultadoSelect(this.resultadoSelect).subscribe(
          response => {
            this.alerta("Se actualizo correctamente", "success", false);
            this.resultadoSelect = {
              estudioId: null,
              resultadoSelect: ""
            }
            this.getSeccionEstudios(seccionId);
          }, error => {
            this.alertaBoton("Ocurrio un error", "Ocurrio un error mientras se añadian los resultados" + error, 'error')
          }
        );
      }
    });
  }

  deleteRespuestaPredeterminada(estudioId, resultados, resultadoEliminar) {
    console.log(estudioId);
    console.log(resultados);
    console.log(resultadoEliminar);

    for (var key in resultados) {
      if (resultados[key].value == resultadoEliminar) {
        var indexEstudio = resultados.map(function (sub) { return sub.value; }).indexOf(resultadoEliminar);
        resultados.splice(indexEstudio, 1);
        break;
      }
    }
    this.resultadoSelect = {
      estudioId: estudioId,
      resultadoSelect: JSON.stringify(resultados)
    }
    this.estudioService.updateResultadoSelect(this.resultadoSelect).subscribe(
      response => {
        this.alerta("Se actualizo correctamente", "success", false);
        this.resultadoSelect = {
          estudioId: null,
          resultadoSelect: ""
        }
      }, error => {
        this.alertaBoton("Ocurrio un error", "Ocurrio un error mientras se añadian los resultados" + error, 'error')
      }
    );
  }

}
