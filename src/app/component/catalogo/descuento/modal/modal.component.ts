import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ExamenGeneralService } from 'src/app/services/examenGeneral/examen-general.service';
import { DiasDescuentoService } from 'src/app/services/diasDescuento/dias-descuento.service';

export interface DialogData {
  opcion:string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  
  constructor(
    private examenGeneralService: ExamenGeneralService,
    private diaDescuentoService: DiasDescuentoService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if(data.opcion == 'dia'){
        this.getDiasDescuento();
      }else if(data.opcion == 'examen'){
        this.getExamenGeneral();
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  examenGeneral: any = [];
  diaDescuento: any = [];
  id:number;

  getExamenGeneral(){
    this.examenGeneralService.getExamenesGenerales().subscribe(
      respuesta =>{
        this.examenGeneral = respuesta;
      },
      error=>{
        console.log(error);
      }
    )
  }

  getDiasDescuento(){
    this.diaDescuentoService.getDiasDescuentos().subscribe(
      respuesta =>{
        console.log(respuesta);
        this.diaDescuento = respuesta;
      },
      error=>{
        console.log(error);
      }
    )
  }
}
