import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SubExamenService } from 'src/app/services/subExamen/sub-examen.service';

declare var $: any;

export interface DialogData {
  examen:JSON;
}

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent{

  constructor(
    private subExamenService: SubExamenService,
    public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.getSubExamen();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
    
  SubExamen: any = [];
  examenId:number;

  getSubExamen(){
    this.subExamenService.getSubExamenes().subscribe(
      res => {
        this.SubExamen = res;
        console.log(this.SubExamen);
      },
      err => console.log(err)
    );
  }
}
