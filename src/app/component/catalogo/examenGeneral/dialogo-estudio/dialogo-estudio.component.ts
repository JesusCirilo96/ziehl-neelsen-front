import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  metodo:JSON;
}


@Component({
  selector: 'app-dialogo-estudio',
  templateUrl: './dialogo-estudio.component.html',
  styleUrls: ['./dialogo-estudio.component.css']
})
export class DialogoEstudioComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogoEstudioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
    
  nombreEstudio:string;
}
