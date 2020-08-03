import { Component, OnInit } from '@angular/core';

import { Descuento } from 'src/app/models/Descuento';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from 'sweetalert2';

import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
//services
import { DescuentoService } from 'src/app/services/descuento/descuento.service';

import { ExamenGeneralDescuentoService } from 'src/app/services/examenGeneralDescuento/examen-general-descuento.service';
import { DescuentoDiasDescuentoService } from 'src/app/services/descuentoDiasDescuento/descuento-dias-descuento.service';


//models
import { ExamenGeneralDescuento } from 'src/app/models/ExamenGeneralDescuento';
import { DescuentoDiasDescuento } from 'src/app/models/DescuentoDiasDescuento';

import * as $ from 'jquery';


@Component({
  selector: 'app-descuento-edit',
  templateUrl: './descuento-edit.component.html',
  styleUrls: ['./descuento-edit.component.css']
})
export class DescuentoEditComponent implements OnInit {
  constructor(
    private descuentoService: DescuentoService,
    private exGenDescuentoService: ExamenGeneralDescuentoService,
    private diaDescuentosService: DescuentoDiasDescuentoService,
    private router: Router, private activateRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  edit: boolean = false;

  descuentoSave: Descuento = {
    descuento_id:null,
    descuento:0.0,
    estado:true
  }

  exGenDescuento: ExamenGeneralDescuento={
    descuento_id: null,
    examen_gen_id: null
  }

  diasDescuento: DescuentoDiasDescuento={
    descuento_id:null,
    dia_descuento_id:null
  }

  descuento: any = [];
  descuento_id: number;

  descuentoTotal: number= 0.0;
  subTotal: number = 0.0;
  total: number = 0.0;

  ngOnInit() {
    $("#descuentoEstado").hide();
    this.getDescuento();
  }

  getDescuento(){
    const parametros = this.activateRoute.snapshot.params;//<---Contiene los parametros que se pasan
    if(parametros.id){
      this.descuentoService.getDescuento(parametros.id).subscribe(
        res=>{
          this.descuento = res[0];
          this.descuento_id = res[0].descuento_id;
          this.descuentoTotal = this.descuento.descuento;

          this.descuentoSave.descuento_id = this.descuento.descuento_id;
          this.descuentoSave.estado = this.descuento.estado;
          this.edit = true;

          this.mostrarEstado(this.descuento.estado);
          this.obtenerSubtotal();
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  saveNewDescuento(){
    this.descuentoService.saveDescuento(this.descuentoSave).subscribe(
      res=>{
        this.router.navigate(['/descuento'])
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateDescuento(){    
    
    this.descuentoSave.descuento = this.descuentoTotal;
    console.log(this.descuentoSave);
    this.descuentoService.updateDescuento(this.descuentoSave.descuento_id, this.descuentoSave).subscribe(
      res=>{
        this.router.navigate(['/descuento'])
        this.edit = false;
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarEdicion(){
    this.router.navigate(['/descuento']);
  }

  activarInactivar(){
    if(this.descuento.estado === 0){
      this.descuentoSave.estado = true;
    }else if(this.descuento.estado === 1){
      this.descuentoSave.estado = false;
    }
    this.updateDescuento();
  }

  mostrarEstado(estadoId){    
    if(this.edit){
      if(estadoId === 0){
        $("#descuentoEstado").text("Activar");
        $("#descuentoEstado").addClass("success");
      }else if(estadoId == 1){
        $("#descuentoEstado").text("Inactivar");
        $("#descuentoEstado").addClass("warning");
      }
      $("#descuentoEstado").show();
    }
  }
  openDialog(valor) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { opcion:valor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if(valor == 'dia'){
          this.guardarDiaDescuento(result[0].id);
        }else if(valor == 'examen'){
          this.guardarExamenGeneralDescuento(result[0].id);
        }
      }
    });
  }

  guardarDiaDescuento(id){
    this.diasDescuento.descuento_id = this.descuento_id;
    this.diasDescuento.dia_descuento_id = id;
    this.diaDescuentosService.saveDescuentoDia(this.diasDescuento).subscribe(
      respuesta=>{
        console.log('ok');
        this.getDescuento();
      },
      error =>{
        console.log(error);
      }
    )
  }

  guardarExamenGeneralDescuento(id){
    this.exGenDescuento.descuento_id = this.descuento_id;
    this.exGenDescuento.examen_gen_id = id;
    this.exGenDescuentoService.saveExamenDescuento(this.exGenDescuento).subscribe(
      repuesta=>{
        console.log('ok'); 
        this.getDescuento();
      },error=>{
        console.log(error);
      }
    )
  }

  obtenerSubtotal(){
    var examen = this.descuento.examen_general;
    var subTotal = 0.0;
    for(var key in examen){
      subTotal += examen[key].precio;
    }

    this.subTotal = subTotal;
    this.total = this.subTotal - this.descuentoTotal;
  }
  obtenerDescuento(data){
    this.descuentoTotal = parseInt(data);
    this.total = this.subTotal - this.descuentoTotal;
  }
}
