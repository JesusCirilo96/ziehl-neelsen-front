import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ClasificacionPacienteService } from 'src/app/services/clasificacionPaciente/clasificacion-paciente.service';

export interface DialogData {
  editar:boolean,
  seccion:{
    clasificacion: {
      clasificacionPacienteId: number
    },
    nota:string,
    orden:number,
    referenciaFemenino:string,
    referenciaGeneral:string,
    referenciaMasculino: string,
    sufijo:string,
    prefijo:string
  }
}

@Component({
  selector: 'app-dialog-referencia',
  templateUrl: './dialog-referencia.component.html',
  styleUrls: ['./dialog-referencia.component.css']
})
export class DialogReferenciaComponent implements OnInit{

  constructor(
    private clasificacionService: ClasificacionPacienteService,
    public dialogRef: MatDialogRef<DialogReferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.getClasificacion();
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
    
  ListClasificacion: any = [];
  clasificacionId:number;

  referenciaMasculino: string
  referenciaFemenino:string;
  referenciaGeneral: string;
  orden: number;
  nota: string;
  sufijo: string;
  prefijo:string;

  ngOnInit(){
    this.orden = 0;
    this.nota = "";
    this.prefijo="";
    this.sufijo="";
    if(this.data.editar){
      this.clasificacionId = this.data.seccion.clasificacion.clasificacionPacienteId;
      this.referenciaMasculino = this.data.seccion.referenciaMasculino;
      this.referenciaFemenino = this.data.seccion.referenciaFemenino;
      this.referenciaGeneral = this.data.seccion.referenciaGeneral;
      this.orden = this.data.seccion.orden
      this.nota = this.data.seccion.nota;
      this.sufijo = this.data.seccion.sufijo;
      this.prefijo = this.data.seccion.prefijo;
    }

  }

  getClasificacion(){
    this.clasificacionService.getClasificacionPacientes().subscribe(
      response =>{
        this.ListClasificacion = response;
      },
      err => console.error(err)
    );
  }

  responseDialogo() {
    var response = [];
    
    response.push(
      {
        'clasificacionId': this.clasificacionId,
        'referenciaMasculino':this.referenciaMasculino,
        'referenciaFemenino':this.referenciaFemenino,
        'referenciaGeneral':this.referenciaGeneral,
        'orden': this.orden,
        'nota': this.nota,
        'sufijo': this.sufijo,
        'prefijo': this.prefijo
      }
    );
    return response;
  }

}
