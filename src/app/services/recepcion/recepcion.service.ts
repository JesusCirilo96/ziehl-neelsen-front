import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  Recepcion } from '../../models/Recepcion';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  getHistorialRecepcion(pacienteId: number){
    return this.http.get(`${this.API_URI}/recepcion/historial/${pacienteId}`);
  }

  /**
   * Obtenemos los resultados de la recepcion
   * @param id El id de la recepcion
   */
  getRecepcionResultado(id: string){
    return this.http.get(`${this.API_URI}/recepcion/resultado/${id}`);
  }

  /**
   * Obtener la ficha al DIA
   */
  getFicha(){
    return this.http.get(`${this.API_URI}/recepcion/get/ficha`);    
  }


  /**
   * Obetenemos las recepcions dada una fecha
   * @param fecha La fecha a buscar
   */
  getRecepcionFecha(fecha: string){
    return this.http.get(`${this.API_URI}/recepcion/get/fecha/${fecha}`);    
  }

  deleteRecepcion(id:string){
    return this.http.delete(`${this.API_URI}/recepcion/${id}`);
  }

  /**
   * Guardamos los datos de la recepcion del paciente
   * @param recepcion El objeto de la recepcion
   */
  saveRecepcion(recepcion: Recepcion){
    return this.http.post(`${this.API_URI}/recepcion/save`, recepcion);
  }

  updateRecepcion(sub_seccion_id:string, updateRecepcion:Recepcion): Observable<Recepcion>{
    return this.http.put(`${this.API_URI}/recepcion/${sub_seccion_id}`, updateRecepcion);
  }
}
