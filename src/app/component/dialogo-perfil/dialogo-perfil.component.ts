import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

export interface DialogData {
  usuarioId: number,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  cedula: string,
  email: string,
  movil: string,
  direccion: string,
  nombreUsuario: string,
  estado: boolean,
  fechaCreacion: string,
  fechaActualizacion: string
}

@Component({
  selector: 'app-dialogo-perfil',
  templateUrl: './dialogo-perfil.component.html',
  styleUrls: ['./dialogo-perfil.component.css']
})
export class DialogoPerfilComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogoPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
  
  exito: boolean = false;

  formUsuario: FormGroup;

  usuarioIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('', [Validators.required]);
  apellidoPaternoCtrl = new FormControl('', [Validators.required]);
  apellidoMaternoCtrl = new FormControl('');
  nombreUsuarioCtrl = new FormControl('', Validators.required);
  cedulaCtrl = new FormControl('');
  emailCtrl = new FormControl('');
  movilCtrl = new FormControl('');
  direccionCtrl = new FormControl('');
  estadoCtrl = new FormControl(true);
  fechaCreacionCtrl = new FormControl(null);
  fechaActualizacionCtrl = new FormControl(null);

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.formUsuario = this._formBuilder.group({
      usuarioId: this.usuarioIdCtrl,
      nombre: this.nombreCtrl,
      apellidoPaterno: this.apellidoPaternoCtrl,
      apellidoMaterno: this.apellidoMaternoCtrl,
      cedula: this.cedulaCtrl,
      email: this.emailCtrl,
      movil: this.movilCtrl,
      direccion: this.direccionCtrl,
      nombreUsuario: this.nombreUsuarioCtrl,
      estado: this.estadoCtrl,
      fechaCreacion: this.fechaCreacionCtrl,
      fechaActualizacion: this.fechaActualizacionCtrl
    });

    this.formUsuario.patchValue({
      usuarioId: this.data.usuarioId,
      nombre: this.data.nombre,
      apellidoPaterno: this.data.apellidoPaterno,
      apellidoMaterno: this.data.apellidoMaterno,
      cedula: this.data.cedula,
      email: this.data.email,
      movil: this.data.movil,
      direccion: this.data.direccion,
      nombreUsuario: this.data.nombreUsuario,
      estado: this.data.estado,
      fechaCreacion: this.data.fechaCreacion,
      fechaActualizacion: this.data.fechaActualizacion
    });
  }

  updateUsuario() {
    console.log(this.formUsuario.value)
    this.usuarioService.updateDatos(this.formUsuario.value).subscribe(
      res => {
        console.log(res);
        if(res['errorCode'] == "OK") {
          this.exito = true;
        }
      },
      err => {
        console.log(err);
      }
    )
  }


  responseDialogo() {
    var response = [];

    response.push({
      "exito":this.exito
    });
    return response;
  }

}
