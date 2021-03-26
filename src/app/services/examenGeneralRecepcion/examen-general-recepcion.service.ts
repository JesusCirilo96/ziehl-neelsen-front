import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ExamenGeneralRecepcion} from '../../models/ExamenGeneralRecepcion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralRecepcionService {
  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  getExGenRecepciones(){
    return this.http.get(`${this.API_URI}/examengeneralrecepcion`);
  }
  
  /*getExGenRecepcion(){
    return this.http.get(`${this.API_URI}/examengeneralrecepcion`);//obtener los examennes clasificados por seccion//--> no usado trae todos los datos
  }*/

  obtenerResultadoExamen(recepcion_id: string){
    return this.http.get(`${this.API_URI}/resultadoexamengeneral/${recepcion_id}`);//obtener los resultados de los examenes generales
  }

  deleteExGenRecepcion(id:number){
    return this.http.delete(`${this.API_URI}/examengeneralrecepcion/${id}`);
  }

  saveExGenRecepcion(seccion: ExamenGeneralRecepcion){
    return this.http.post(`${this.API_URI}/recepcion/examen/save`, seccion);
  }

  updateExGenRecepcion(recepcion_id:number,examen_gen_id:number, updatedRecepcion:ExamenGeneralRecepcion): Observable<ExamenGeneralRecepcion>{
    return this.http.put(`${this.API_URI}/examengeneralrecepcion/${recepcion_id}/${examen_gen_id}`, updatedRecepcion);
  }
  
}
