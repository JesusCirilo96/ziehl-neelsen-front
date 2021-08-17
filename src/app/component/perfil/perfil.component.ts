import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { DialogoPerfilComponent } from '../dialogo-perfil/dialogo-perfil.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
  ) { }


  usuario: Usuario = {
    usuarioId: null,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    cedula: '',
    email:'',
    movil:'',
    direccion:'',
    fotoPerfil:'',
    password: '',
    nombreUsuario: '',
    estado: true,
    fechaCreacion:null,
    fechaActualizacion: null
  }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
      this.usuarioService.getUsuario(1).subscribe(
        res => {
          this.usuario = res;

        },
        err => {
          console.log(err);
        }
      )
  }


  editarPerfil():void{

    const dialogReferencia = this.dialog.open(DialogoPerfilComponent, {
      width: '60%',
      data: this.usuario
    });

    dialogReferencia.afterClosed().subscribe(result => {
      if (result != undefined) {
        if(result[0].exito){
          this.getUsuario();
        }
      }
    });

  }

}
