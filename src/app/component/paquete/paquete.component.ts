import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Paquete } from 'src/app/models/Paquete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2'

import { ExamenGeneralService } from '../../services/examenGeneral/examen-general.service';
import { PaqueteService } from '../../services/paquetes/paquete.service';


@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.css']
})
export class PaqueteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private examenGeneralService: ExamenGeneralService,
    private paqueteService: PaqueteService,
  ) { }

  Descuentos: any = [];

  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'fechaInicio',
    'fechaFin',
    'dias',
    'accion'
  ];
  dataSourceDescuentos = new MatTableDataSource<Element>();

  paqueteModel: Paquete = {
    paqueteId: null,
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    dias: '',
    precio: 0,
    porcentaje:0,
    porcentajeDescuentoTexto:'',
    descuento:0,
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

  paqueteIdCtrl = new FormControl(null);
  nombreCtrl = new FormControl('', [Validators.required]);
  descripcionCtrl = new FormControl('');
  fechaInicioCtrl = new FormControl('', [Validators.required]);
  horaInicioCtrl = new FormControl('', [Validators.required]);
  fechaFinCtrl = new FormControl('', [Validators.required]);
  horaFinCtrl = new FormControl('', [Validators.required]);
  diasCtrl = new FormControl('', [Validators.required]);
  precioCtrl = new FormControl(0, [Validators.required]);
  porcentajeCtrl = new FormControl('', [Validators.required]);
  porcentajeTextCtrl = new FormControl('');
  descuentoCtrl = new FormControl(0, [Validators.required]);
  estadoCtrl = new FormControl(true);

  examenGeneralCtrl = new FormControl('', [Validators.required]);
  

  formDescuento: FormGroup;
  formDescuentoExamen: FormGroup;


  ngOnInit() {
    this.formDescuentoExamen = this._formBuilder.group({
      examenId: this.examenGeneralCtrl
    });

    this.formDescuento = this._formBuilder.group({
      paqueteId: this.paqueteIdCtrl,
      nombre: this.nombreCtrl,
      descripcion: this.descripcionCtrl,
      fechaInicio: this.fechaInicioCtrl,
      horaInicio: this.horaInicioCtrl,
      fechaFin: this.fechaFinCtrl,
      horaFin: this.horaFinCtrl,
      precio: this.precioCtrl,
      dias: this.diasCtrl,
      porcentaje: this.porcentajeCtrl,
      porcentajeDescuentoTexto: this.porcentajeTextCtrl,
      descuento: this.descuentoCtrl,
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
      paqueteId: this.paqueteIdCtrl.value,
      operacion: "agregar",
      nombre: this.nombreCtrl.value,
      descripcion: this.descripcionCtrl.value,
      fechaInicio: this.fechaInicioCtrl.value + " " + this.horaInicioCtrl.value + ":00",
      fechaFin: this.fechaFinCtrl.value + " " + this.horaFinCtrl.value + ":00",
      dias: this.diasCtrl.value,
      precio: this.precioCtrl.value,
      porcentaje: this.porcentajeCtrl.value,
      porcentajeDescuentoTexto: this.porcentajeTextCtrl.value,
      descuento: this.descuentoCtrl.value,
      estado: this.estadoCtrl.value,
      examen: this.ExamenesSeleccionados
    });

    this.paqueteService.savePaqueteExamen(saveDescuento[0]).subscribe(
      respuesta => {
        console.log(respuesta);
        this.getDescuentos();
      }, error => {
        console.log(error);
      }
    )    
    this.cancelarEdicion();
    console.log(saveDescuento);
  }

  actualizarDescuento(): void {
    var saveDescuento = [];

    saveDescuento.push({
      descuentoId: this.paqueteIdCtrl.value,
      operacion: "editar",
      nombre: this.nombreCtrl.value,
      descripcion: this.descripcionCtrl.value,
      fechaInicio: this.fechaInicioCtrl.value + " " + this.horaInicioCtrl.value + ":00",
      fechaFin: this.fechaFinCtrl.value + " " + this.horaFinCtrl.value + ":00",
      dias: this.diasCtrl.value,
      precio: this.precioCtrl.value,
      porcentaje: this.porcentajeCtrl.value,
      porcentajeDescuentoTexto: this.porcentajeTextCtrl.value,
      descuento: this.descuentoCtrl.value,
      estado: this.estadoCtrl.value,
      examen: this.ExamenesSeleccionados
    });

    this.paqueteService.savePaqueteExamen(saveDescuento[0]).subscribe(
      respuesta => {
        this.getDescuentos();
        console.log(respuesta);
      }, error => {
        console.log(error);
      }
    )

    this.cancelarEdicion();
    console.log(saveDescuento[0]);
  }

  getDescuentoExamen(idDescuento: number): void {
    this.paqueteService.paqueteExamen(idDescuento).subscribe(
      respuesta => {

        if (respuesta['paquete'].paqueteId !== null) {
          var dias = [];
          var diaStr = new String(respuesta['paquete'].dias);
          for (var llave = 0; llave < diaStr.length; llave++) {
            dias.push(parseInt(diaStr.charAt(llave)));
          }

          this.formDescuento.patchValue({
            paqueteId: respuesta['paquete'].paqueteId,
            nombre: respuesta['paquete'].nombre,
            descripcion: respuesta['paquete'].descripcion,
            fechaInicio: this.convertirFecha(respuesta['paquete'].fechaInicio.substring(0, 10)),
            horaInicio: respuesta['paquete'].fechaInicio.substring(11, 16),
            fechaFin: this.convertirFecha(respuesta['paquete'].fechaFin.substring(0, 10)),
            horaFin: respuesta['paquete'].fechaFin.substring(11, 16),
            dias: dias,
            precio: respuesta['paquete'].precio,
            porcentaje: respuesta['paquete'].porcentaje,
            porcentajeDescuentoTexto: respuesta['paquete'].porcentajeDescuentoTexto,
            descuento: respuesta['paquete'].descuento,
            estado: this.estadoCtrl.value
          });

          this.ExamenesSeleccionados = respuesta['examen'];
          console.log(respuesta);
        }else{

          for(var key in this.Descuentos){
            if(this.Descuentos[key].descuentoId == idDescuento){

              var dias = [];
              var diaStr = new String(this.Descuentos[key].dias);
              for (var llave = 0; llave < diaStr.length; llave++) {
                dias.push(parseInt(diaStr.charAt(llave)));
              }

              this.formDescuento.patchValue({
                descuentoId: this.Descuentos[key].descuentoId,
                nombre: this.Descuentos[key].nombre,
                descripcion: this.Descuentos[key].descripcion,
                fechaInicio: this.convertirFecha(this.Descuentos[key].fechaInicio.substring(0, 10)),
                horaInicio: this.Descuentos[key].fechaInicio.substring(11, 16),
                fechaFin: this.convertirFecha(this.Descuentos[key].fechaFin.substring(0, 10)),
                horaFin: this.Descuentos[key].fechaFin.substring(11, 16),
                dias: dias,
                precio:  this.Descuentos[key].precio,
                porcentaje:  this.Descuentos[key].porcentaje,
                porcentajeDescuentoTexto:  this.Descuentos[key].porcentajeDescuentoTexto,
                descuento:  this.Descuentos[key].descuento,
                estado: this.Descuentos[key].estado
              });
            }
          }
          console.log(this.Descuentos);
        
        }

        this.edit = true;

      }, error => {
        console.log(error);
      }
    )
  }

  editarDescExamen(indexSeleccion: number): void {
    this.formDescuentoExamen.patchValue({
      examenId: this.ExamenesSeleccionados[indexSeleccion].nombre,
    });

    this.ExamenesSeleccionados.splice(indexSeleccion);
  }

  cancelarEdicion():void{
    
    if(this.edit){
      this.edit = false;
    }

    this.ExamenesSeleccionados = [];
    this.formDescuento.reset();
    this.examenGeneralCtrl.setValue("");
  }

  eliminarExamen(index): void {
    if (this.ExamenesSeleccionados[index].examenDescuentoId != null) {
      this.ExamenesSeleccionados[index].accion = "eliminar";
    } else {
      this.ExamenesSeleccionados.splice(index);
    }
  }

  convertirFecha(fecha: string): string {
    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    return ano + "-" + mes + "-" + dia;
  }

  private getDescuentos(): void {
    this.paqueteService.getPaquetes().subscribe(
      response => {
        this.Descuentos = response;
        this.dataSourceDescuentos.data = this.Descuentos;
      }, err => {
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
    for (var key in this.ExamenGeneral) {
      if (this.ExamenGeneral[key].nombre == name) {
        this.examenSeleccionado = this.ExamenGeneral[key].examenGeneralId;
        break;
      }
    }
    console.log("El ID del examen " + this.examenSeleccionado);
  }

  /**
   * Añadimos el examen al la lista de examenes para el descuento
   */
  anadirExamenGeneral(): void {

    var accion = "agregar";

    if (this.editarExamen) {
      accion = "editar"
    }
    this.ExamenesSeleccionados.push({
      examenDescuentoId: null,
      examenId: this.examenSeleccionado,
      nombre: this.examenGeneralCtrl.value,
      accion: accion
    });
    
    this.editarExamen = false;

  }

  eliminarDescuento(descuentoId):void{
    this.paqueteService.deletePaquete(descuentoId).subscribe(
      res => {
        this.getDescuentos();
      }, error => {
        console.log(error);
      }
    );
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
