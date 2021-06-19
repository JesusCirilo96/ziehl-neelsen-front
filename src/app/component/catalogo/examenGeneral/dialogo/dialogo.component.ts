import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MetodoService } from 'src/app/services/metodo/metodo.service';

export interface DialogData {
  metodo:JSON;
}

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent{

  constructor(
    private metodoService: MetodoService,
    public dialogRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.getMetodos();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
    
  ListMetodo: any = [];
  metodoId:number;

  getMetodos(){
    this.metodoService.getMetodos().subscribe(
      response =>{
        this.ListMetodo = response;
      },
      err => console.error(err)
    );
  }

}
