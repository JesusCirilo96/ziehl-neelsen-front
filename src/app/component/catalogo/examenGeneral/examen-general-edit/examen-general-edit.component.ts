import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

//MODELS
import { ExamenGeneral } from 'src/app/models/ExamenGeneral';
import { Referencia } from 'src/app/models/Referencia';

//SERVICES
import { ExamenGeneralService } from 'src/app/services/examenGeneral/examen-general.service';
import { MetodoService } from 'src/app/services/metodo/metodo.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ReferenciaService } from 'src/app/services/referencia/referencia.service';

//COMPONENTS
import {DialogoComponent} from '../dialogo/dialogo.component';
import {DialogReferenciaComponent } from '../dialog-referencia/dialog-referencia.component';


import * as $ from 'jquery';

import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';


@Component({
  selector: 'app-examen-general-edit',
  templateUrl: './examen-general-edit.component.html',
  styleUrls: ['./examen-general-edit.component.css']
})

export class ExamenGeneralEditComponent implements OnInit {
  constructor(
    private examenGeneralService: ExamenGeneralService,
    private metodoService: MetodoService,
    private refereciaService: ReferenciaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  electable = true;
  removable = true;

  edit: boolean = false;

  ListMetodo: any = [];//lista para los metodos
  Categoria: any = []; //lista para las categorias
  ExamenSeccion: any = []; //Lista para los examenes con sus respectivas secciones
  ReferenciaEstudio: any = [];
  referencia: Referencia = {
    clasificacionId: null,
    estudioId: null,
    femenino:'',
    masculino: '',
    general:''
  }

  examenGeneral: ExamenGeneral = {
    examenGeneralId:null,
    nombre:'',
    alias:'',
    titulo:'',
    estado:true,
    precio:0.0,
    clave:'',
    categoriaId:null,
    fechaCreacion:'',
    fechaActualizacion:''
  }

  formExamen: FormGroup;

  examenGeneralIdCtrl = new FormControl(null);
  examenNombreCtrl = new FormControl('',[Validators.required]);
  examenAliasCtrl = new FormControl('');
  examenTituloCtrl = new FormControl('');
  examenEstadoCtrl = new FormControl(true);
  examenPrecioCtrl = new FormControl(0.0,[Validators.required]);
  examenClaveCtrl = new FormControl('');
  examenCategoriaCtrl = new FormControl(null,[Validators.required]);
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

  getExamenGeneral(){
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if (parametros.id) {
      this.examenGeneralService.getExamenSecciones(parametros.id).subscribe(
        res => {
          this.examenGeneral = res['examen'];
          this.ExamenSeccion = res['seccion'];
          this.formExamen.patchValue({
            examenGeneralId:this.examenGeneral.examenGeneralId,
            nombre:this.examenGeneral.nombre,
            alias:this.examenGeneral.alias,
            titulo:this.examenGeneral.titulo,
            estado:this.examenGeneral.estado,
            precio:this.examenGeneral.precio,
            clave:this.examenGeneral.clave,
            categoriaId:this.examenGeneral.categoriaId,
            fechaCreacion:this.examenGeneral.fechaCreacion,
            fechaActualizacion:this.examenGeneral.fechaActualizacion,
          });
          this.edit = true;
          console.log(this.formExamen.value)
          console.log(this.ExamenSeccion)
          this.mostrarEstado(this.examenGeneral.estado);
          
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  formGroupExamen(){
    this.formExamen = this._formBuilder.group({
      examenGeneralId:this.examenGeneralIdCtrl,
      nombre:this.examenNombreCtrl,
      alias:this.examenAliasCtrl,
      titulo:this.examenTituloCtrl,
      estado:this.examenEstadoCtrl,
      precio:this.examenPrecioCtrl,
      clave:this.examenClaveCtrl,
      categoriaId:this.examenCategoriaCtrl,
      fechaCreacion:this.examenFechaCreacionCtrl,
      fechaActualizacion:this.examenFechaActualizacionCtrl,
    });
  }
  saveNewExamenGeneral() {
    this.examenGeneralService.saveExamenGeneral(this.formExamen.value).subscribe(
      res => {
        this.alerta('Se Guardo el Examen','success',false);
        this.router.navigate(['/examengeneral'])
      },
      err => {
        this.alertaBoton('Verificar datos introducidos','Error: ' + err,'warning')
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

  getMetodos(){
    this.metodoService.getMetodos().subscribe(
      response =>{
        this.ListMetodo = response;
      },
      err => console.error(err)
    );
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

  examen: any = []
  openDialog() {

      const dialogRef = this.dialog.open(DialogoComponent, {
        width: '500px',
        data: { categoriaId: this.examen }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
         console.log(result[0].metodoId)
          /*if (result[0].catalogo == 'subexamen') {
            this.examenGeneralSubExamen.sub_examen_id = result[0].examenId;
            this.saveExamenGeneralSubExamen();
          }*/
        }
      });
  }

  referenciaDialog: any = [];
  openDialogReferencia(estudioId){

    console.log("El estudio ID ::" + estudioId);
    
    const dialogReferencia = this.dialog.open(DialogReferenciaComponent, {
      width:'500px',
      data: {referencia:this.referenciaDialog}
    });

    dialogReferencia.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.referencia = {
          clasificacionId: result[0].clasificacionId,
          estudioId: estudioId,
          femenino:result[0].referenciaFemenino,
          masculino: result[0].referenciaMasculino,
          general:result[0].referenciaGeneral
        }
       console.log(this.referencia)
       this.guardarReferencia(this.referencia);
        /*if (result[0].catalogo == 'subexamen') {
          this.examenGeneralSubExamen.sub_examen_id = result[0].examenId;
          this.saveExamenGeneralSubExamen();
        }*/
      }
    });
  }

  obtenerReferencia(idEstudio){
    this.refereciaService.getReferenciaEstudio(idEstudio).subscribe(
      res => {
        this.ReferenciaEstudio = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  guardarReferencia(referencia) {
    this.refereciaService.saveReferencia(referencia).subscribe(
      res => {
        this.alerta('Se Añadio la referencia exitosamente','success',false);
        this.obtenerReferencia(referencia.estudioId);
      },
      err => {
        this.alertaBoton('Verificar datos introducidos','Error: ' + err,'warning')
      }
    )
    console.log(this.formExamen.value);
  }

  remove(id: number): void {
    console.log("ID A REMOVER == " + id)
  }
}
