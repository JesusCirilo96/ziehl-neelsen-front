import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  respuesta:JSON;
}

@Component({
  selector: 'app-dialogo-respuesta',
  templateUrl: './dialogo-respuesta.component.html',
  styleUrls: ['./dialogo-respuesta.component.css']
})
export class DialogoRespuestaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogoRespuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  addResponse: string = "";
  respuestaSelect: any =[];

  ngOnInit(){
    console.log(this.data)
    if(this.data != null){
      this.respuestaSelect = this.data
    }
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  anadirPosibleRespuestaEstudio(){
    if(this.addResponse != ""){
      this.respuestaSelect.push({value:this.addResponse,viewValue:this.addResponse});
    }
    this.addResponse = "";
  }

  armaRespuesta(){
    var respuesta = [];

    respuesta.push({
      respuestas:this.respuestaSelect
    });
    return respuesta;
  }

}
