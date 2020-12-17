import { Component, OnInit, ViewChild,HostBinding } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import { ClasificacionPacienteService } from 'src/app/services/clasificacionPaciente/clasificacion-paciente.service';


@Component({
  selector: 'app-clasificacion-paciente-view',
  templateUrl: './clasificacion-paciente-view.component.html',
  styleUrls: ['./clasificacion-paciente-view.component.css']
})
export class ClasificacionPacienteViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  constructor(private clasificacionSercice: ClasificacionPacienteService) { }

  clasificacion: any = [];
  cols: any[];

  displayedColumns: string[] = [
    'nombre', 
    'edadMinima',
    'edadMaxima',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();

  ngOnInit() {
    this.getAllClasificacion();
    this.dataSource.paginator = this.paginator;
  }

  getAllClasificacion(){
    this.clasificacionSercice.getClasificacionPacientes().subscribe(
      res => {
        this.clasificacion = res;
        this.dataSource.data = this.clasificacion;
      },
      err => console.error(err)
    )
  }


  activoOinactivo(estado){
    var aux = 'Inactivo';
    if(estado == '1'){
      aux = 'Activo';
    }
    return aux;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
