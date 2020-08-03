import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {PacienteService} from '../../../../services/paciente/paciente.service';

@Component({
  selector: 'app-paciente-view',
  templateUrl: './paciente-view.component.html',
  styleUrls: ['./paciente-view.component.css']
})
export class PacienteViewComponent implements OnInit {
  
  constructor(private pacienteService: PacienteService ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @HostBinding('class') classes = 'row';

  paciente: any = [];
  cols: any[];

  pacienteColumns: string[] = [
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'fecha_nacimiento',
    'sexo',
    'telefono',
    'email',
    'accion'
  ];
  dataSource = new MatTableDataSource<Element>();


  ngOnInit() {
    this.getAllPaciente();
    this.dataSource.paginator = this.paginator;
  }

  getAllPaciente() {
    this.pacienteService.getPacientes().subscribe(
      res => {
        this.paciente = res;
        this.dataSource.data = this.paciente;
      },
      err => console.error(err)
    )
  }

  deletePaciente(id: number) {
    this.pacienteService.deletePaciente(id).subscribe(
      res => {
        console.log(res);
        this.getAllPaciente();
      },
      err => {
        console.log(err);
      }
    )
  }
  
  masculinoOfemenio(estado) {
    var aux = 'Femenino';
    if (estado == '1') {
      aux = 'Masculino';
    }
    return aux;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
