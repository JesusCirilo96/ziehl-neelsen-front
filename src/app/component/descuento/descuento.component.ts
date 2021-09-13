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
  editarExamen: boolean = false;

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
    console.log(this.formDescuento.value);

    var saveDescuento = [];

    saveDescuento.push({
      descuentoId: this.descuentoIdCtrl.value,
      operacion:"editar",
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

  getDescuentoExamen(idDescuento: number): void{
    this.descuentoService.getDescuentoExamen(idDescuento).subscribe(
      respuesta=>{

        var dias = [];
        var diaStr = new String (respuesta['descuento'].dias);
        for(var llave = 0; llave < diaStr.length; llave++){
          dias.push(parseInt(diaStr.charAt(llave)));
        }

        this.formDescuento.patchValue({
          descuentoId: respuesta['descuento'].descuentoId,
          nombre: respuesta['descuento'].nombre,
          descripcion: respuesta['descuento'].descripcion,
          fechaInicio: this.convertirFecha(respuesta['descuento'].fechaInicio.substring(0,10)),
          horaInicio: respuesta['descuento'].fechaInicio.substring(11,16),
          fechaFin: this.convertirFecha(respuesta['descuento'].fechaFin.substring(0,10)),
          horaFin: respuesta['descuento'].fechaFin.substring(11,16),
          dias: dias,
          estado: this.estadoCtrl.value
        });

        this.ExamenesSeleccionados= respuesta['examen'];

        this.edit = true;

        console.log(respuesta);

      },error=>{
        console.log(error);
      }
    )
  }

  editarDescExamen(indexSeleccion: number): void{
    this.formDescuentoExamen.patchValue({
      examenId: this.ExamenesSeleccionados[indexSeleccion].nombreEstudio,
      porcentaje: this.ExamenesSeleccionados[indexSeleccion].porcentajeDescuento,
      porcentajeText: this.ExamenesSeleccionados[indexSeleccion].porcentajeDescuentoText,
      descuento: this.ExamenesSeleccionados[indexSeleccion].descuento
    });

    this.ExamenesSeleccionados.splice(indexSeleccion);
  }

  eliminarExamen(index): void{
    if(this.ExamenesSeleccionados[index].examenDescuentoId != null){
      this.ExamenesSeleccionados[index].accion = "eliminar";
    }else{
      this.ExamenesSeleccionados.splice(index);
    }
  }

  convertirFecha(fecha: string): string{
    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    return ano + "-" + mes + "-" + dia;
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

    var accion = "agregar";

    if(this.editarExamen){
      accion="editar"
    }
    this.ExamenesSeleccionados.push({
      examenDescuentoId: null,
      examenId:this.examenSeleccionado,
      nombreEstudio: this.examenGeneralCtrl.value,
      porcentajeDescuento: this.porcentajeCtrl.value,
      porcentajeDescuentoText: this.porcentajeTextCtrl.value,
      descuento: this.descuentoCtrl.value,
      accion:accion
    });
    this.examenGeneralCtrl.setValue("");
    this.porcentajeCtrl.setValue("");
    this.porcentajeTextCtrl.setValue("");
    this.descuentoCtrl.setValue("");
    this.editarExamen = false;
    
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
