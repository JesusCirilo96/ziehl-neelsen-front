import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SeccionesService } from 'src/app/services/secciones.service';

export interface DialogData {
  editar: boolean,
  datos:{
    seccionId:number,
    nombre:string,
    titulo:string,
    textoCent: string,
    textoDer: string
  },
  orden: number
  
}

@Component({
  selector: 'app-dialogo-seccion',
  templateUrl: './dialogo-seccion.component.html',
  styleUrls: ['./dialogo-seccion.component.css']
})
export class DialogoSeccionComponent implements OnInit {

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
  fechaCreacion: string;

  ngOnInit(){
    this.orden = 0;
    if(this.data.editar ){
      console.log(this.data);
      this.seccionId = this.data.datos.seccionId;
      this.nombreSeccion = this.data.datos.nombre;
      this.titulo = this.data.datos.titulo;
      this.textoCent = this.data.datos.textoCent;
      this.textoDer = this.data.datos.textoDer;
      this.orden = this.data.orden;
    }
  }

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
