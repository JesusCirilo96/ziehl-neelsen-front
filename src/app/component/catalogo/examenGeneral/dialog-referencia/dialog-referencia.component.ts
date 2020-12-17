import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ClasificacionPacienteService } from 'src/app/services/clasificacionPaciente/clasificacion-paciente.service';

export interface DialogData {
  metodo:JSON;
}

@Component({
  selector: 'app-dialog-referencia',
  templateUrl: './dialog-referencia.component.html',
  styleUrls: ['./dialog-referencia.component.css']
})
export class DialogReferenciaComponent {

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

  getClasificacion(){
    this.clasificacionService.getClasificacionPacientes().subscribe(
      response =>{
        this.ListClasificacion = response;
      },
      err => console.error(err)
    );
  }

}
