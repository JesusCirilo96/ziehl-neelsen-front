import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SeccionesService } from 'src/app/services/secciones.service';

export interface DialogData {
  metodo:JSON;
}

@Component({
  selector: 'app-dialogo-seccion',
  templateUrl: './dialogo-seccion.component.html',
  styleUrls: ['./dialogo-seccion.component.css']
})
export class DialogoSeccionComponent {

  constructor(
    private seccionService: SeccionesService,
    public dialogRef: MatDialogRef<DialogoSeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.getSecciones();
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
    
  ListSecciones: any = [];
  seccionId:number;
  orden:number;
  seleccionado = false;
  nombreSeccion: string;
  titulo:string;
  textoCent: string;
  textoDer: string;

  getSecciones(){
    this.seccionService.getSecciones ().subscribe(
      response =>{
        this.ListSecciones = response;
      },
      err => console.error(err)
    );
  }

  responseDialogo() {
    var response = [];  
    response.push(
      {
        'nombreSeccion': this.nombreSeccion,
        'titulo':this.titulo,
        'textoCent': this.textoCent,
        'textoDer': this.textoDer,
        'porId': this.seleccionado,
        'idSeccion': this.seccionId,
        'orden':this.orden
      }
    );
    return response;

  }

}
