import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  Recepcion } from '../../models/Recepcion';
import { Observable } from 'rxjs';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getHistorialRecepcion(paciente_id: number){
    return this.http.get(`${this.API_URI}/recepcion/historial/${paciente_id}`);
  }

  getRecepcion(id: string){
    return this.http.get(`${this.API_URI}/recepcion/${id}`);
  }

  getFicha(fecha_ingreso: string){
    return this.http.get(`${this.API_URI}/recepcion/getficha/${fecha_ingreso}`);    
  }

  getRecepcionFecha(fecha: string){
    return this.http.get(`${this.API_URI}/recepcion/obtener/${fecha}`);    
  }

  deleteRecepcion(id:string){
    return this.http.delete(`${this.API_URI}/recepcion/${id}`);
  }

  saveRecepcion(recepcion: Recepcion){
    return this.http.post(`${this.API_URI}/recepcion`, recepcion);
  }

  updateRecepcion(sub_seccion_id:string, updateRecepcion:Recepcion): Observable<Recepcion>{
    return this.http.put(`${this.API_URI}/recepcion/${sub_seccion_id}`, updateRecepcion);
  }
}
