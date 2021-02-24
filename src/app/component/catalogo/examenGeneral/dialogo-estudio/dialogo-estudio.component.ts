import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudioService } from 'src/app/services/estudio/estudio.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface DialogData {
  metodo: JSON;
}

export interface User {
  name: string;
}
@Component({
  selector: 'app-dialogo-estudio',
  templateUrl: './dialogo-estudio.component.html',
  styleUrls: ['./dialogo-estudio.component.css']
})
export class DialogoEstudioComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogoEstudioComponent>,
    private estudioService: EstudioService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  seleccionado = false;

  nombreEstudio: string;

  EstudiosDisponibles: any = [];
  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.getEstudios();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getEstudios() {
    this.estudioService.getEstudios().subscribe(
      res => {
        var opciones = [];
        for (var key in res) {
          opciones.push(
            { name: res[key].nombre }
          );
        }
        this.options = opciones;
        this.EstudiosDisponibles = res;
      },
      err => console.error(err)
    );
  }

  responseDialogo() {
    var response = [];
    var idEstudio;
    if(this.myControl.value != null){
      var estudios = this.EstudiosDisponibles;
      for (var key in estudios) {
        if (this.myControl.value.name == estudios[key].nombre) {
          idEstudio = estudios[key].estudioId;
          break;
        }
      }
    }
    
    response.push(
      {
        'nombreEstudio': this.nombreEstudio,
        'porId': this.seleccionado,
        'idEstudio': idEstudio
      }
    );
    return response;
  }
}
