import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  respuesta:JSON;
}

@Component({
  selector: 'app-dialogo-respuesta',
  templateUrl: './dialogo-respuesta.component.html',
  styleUrls: ['./dialogo-respuesta.component.css']
})
export class DialogoRespuestaComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoRespuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  addResponse: string = "";
  respuestaSelect: any =[];

  onNoClick(): void {
    this.dialogRef.close();
  }

  anadirPosibleRespuestaEstudio(){
    this.respuestaSelect.push({value:this.addResponse,viewValue:this.addResponse});
    console.log(this.respuestaSelect);
  }

  armaRespuesta(){
    var respuesta = [];

    respuesta.push({
      respuestas:this.respuestaSelect
    });
    return respuesta;
  }

}
