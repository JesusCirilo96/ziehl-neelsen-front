import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Descuento } from 'src/app/models/Descuento';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2'

import { ExamenGeneralService } from '../../services/examenGeneral/examen-general.service';
import { DescuentoService } from '../../services/descuento/descuento.service';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html',
  styleUrls: ['./descuento.component.css']
})
export class DescuentoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private examenGeneralService: ExamenGeneralService,
    private descuentoService: DescuentoService,
  ) { }

  Descuentos : any = [];

  displayedColumns: string[] = [
    'nombre', 
    'descripcion',
    'fechaInicio',
    'fechaFin',
    'dias',
    'accion'
  ];
  dataSourceDescuentos = new MatTableDataSource<Element>();

  descuentoModel: Descuento = {
    descuentoId: null,
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    dias: '',
    estado: true,
    fechaCreacion: '',
    fechaActualizacion: ''
  }

  //Examen seleccionado

  examenSeleccionado: number;
  ExamenesSeleccionados: any = [];

  edit: boolean = false;

  //autocomplete examen general
  ExamenGeneral: any = [];
  examenGeneral: any = [];
  optionsGeneral: string[] = this.examenGeneral;
  filteredOptionsGeneral: Observable<string[]>;

  descuentoIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('', [Validators.required]);
  descripcionCtrl = new FormControl('');
  fechaInicioCtrl = new FormControl('', [Validators.required]);
  horaInicioCtrl = new FormControl('', [Validators.required]);
  fechaFinCtrl = new FormControl('', [Validators.required]);
  horaFinCtrl = new FormControl('', [Validators.required]);
  diasCtrl = new FormControl('', [Validators.required]);
  estadoCtrl = new FormControl(true);

  examenGeneralCtrl = new FormControl('',[Validators.required]);
  porcentajeCtrl = new FormControl('', [Validators.required]);
  porcentajeTextCtrl = new FormControl('');
  descuentoCtrl = new FormControl(0, [Validators.required]);

  formDescuento: FormGroup;
  formDescuentoExamen : FormGroup;


  ngOnInit() {
    this.formDescuentoExamen = this._formBuilder.group({
      examenId: this.examenGeneralCtrl,
      porcentaje: this.porcentajeCtrl,
      porcentajeText: this.porcentajeTextCtrl,
      descuento: this.descuentoCtrl,
    });

    this.formDescuento = this._formBuilder.group({
      descuentoId: this.descuentoIdCtrl,
      nombre: this.nombreCtrl,
      descripcion: this.descripcionCtrl,
      fechaInicio: this.fechaInicioCtrl,
      horaInicio: this.horaInicioCtrl,
      fechaFin: this.fechaFinCtrl,
      horaFin: this.horaFinCtrl,
      dias: this.diasCtrl,
      estado: this.estadoCtrl
    });

    this.getAllExamenGeneral();
    this.getDescuentos();

    this.filteredOptionsGeneral = this.examenGeneralCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterExamenGeneral(value))
    );
  }

  guardarDescuento(): void {
    console.log(this.formDescuento.value);

    var saveDescuento = [];

    saveDescuento.push({
      descuentoId: this.descuentoIdCtrl.value,
      operacion:"agregar",
      nombre: this.nombreCtrl.value,
      descripcion: this.descripcionCtrl.value,
      fechaInicio: this.fechaInicioCtrl.value + " " + this.horaInicioCtrl.value + ":00",
      fechaFin: this.fechaFinCtrl.value + " " + this.horaFinCtrl.value + ":00",
      dias: this.diasCtrl.value,
      estado: this.estadoCtrl.value,
      examen: this.ExamenesSeleccionados
    });

    this.descuentoService.saveDescuentoExamen(saveDescuento[0]).subscribe(
      respuesta=>{
        console.log(respuesta);
      },error=>{
        console.log(error);
      }
    )

    console.log(saveDescuento);
  }

  actualizarDescuento(): void {

  }

  private getDescuentos():void{
    this.descuentoService.getDescuentos().subscribe(
      response =>{
        this.Descuentos = response;
        this.dataSourceDescuentos.data = this.Descuentos;
      },err=>{
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSourceDescuentos.filter = filterValue.trim().toLowerCase();
  }

  //obtener todos los examenes generales
  private getAllExamenGeneral() {
    this.examenGeneralService.getExamenesGenerales().subscribe(
      response => {
        console.log(response);
        this.examenGeneralToAutocomplete(response);
        this.ExamenGeneral = response;
      },
      error => {
        console.log(error);

      }
    )
  }

  //obtenemos el examen general buscando por el nombre
  obtenerExamenGeneral(name): void {
    for(var key in this.ExamenGeneral){
      if(this.ExamenGeneral[key].nombre == name){
        this.examenSeleccionado = this.ExamenGeneral[key].examenGeneralId;
        break;
      }
    }
    console.log("El ID del examen " +  this.examenSeleccionado);
  }

  /**
   * Añadimos el examen al la lista de examenes para el descuento
   */
  anadirExamenGeneral(): void{
    this.ExamenesSeleccionados.push({
      examenId:this.examenSeleccionado,
      nombreEstudio: this.examenGeneralCtrl.value,
      porcentajeDescuento: this.porcentajeCtrl.value,
      porcentajeDescuentoText: this.porcentajeTextCtrl.value,
      descuento: this.descuentoCtrl.value,
      accion:"agregar"
    });
    this.examenGeneralCtrl.setValue("");
    this.porcentajeCtrl.setValue("");
    this.porcentajeTextCtrl.setValue("");
    this.descuentoCtrl.setValue("");
    
  }


  //convertimos los datos obtenidos a autocomplete
  private examenGeneralToAutocomplete(examenGeneral) {
    for (var index in examenGeneral) {
      this.examenGeneral.push(examenGeneral[index].nombre);
    }
  }

  private _filterExamenGeneral(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsGeneral.filter(optionGen => optionGen.toLowerCase().includes(filterValue));
  }

}
