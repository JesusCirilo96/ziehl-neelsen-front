import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ExamenGeneral} from '../../models/ExamenGeneral';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralService {

  
  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }
  

  /**
   * Obtenemos todos los examenes generales
   */
  getExamenesGenerales(){
    return this.http.get(`${this.API_URI}/examen/get/all`);
  }

  /**
   * Obtener un examen general por el ID
   * @param id ID del examen a obtener
   */
  getExamenGeneral(id: number){
    return this.http.get(`${this.API_URI}/examen/get/${id}`);
  }

  /**
   * Obtenemos las secciones del examen con sus respectivos estudios
   * @param id El ID del examen
   */
  getExamenSecciones(id: number){
    return this.http.get(`${this.API_URI}/examen/seccion/${id}`);
  }

  /**
   * El objeto de examen
   * @param examenGeneral Guardamos el examen
   */
  saveExamenGeneral(examenGeneral: ExamenGeneral){
    return this.http.post(`${this.API_URI}/examen/save/`, examenGeneral);
  }

  /**
   * Actualizamos los datos del examen general
   * @param updatedExamenGeneral El examen a actualizar
   */
  updateExamenGeneral(updatedExamenGeneral:ExamenGeneral): Observable<ExamenGeneral>{
    return this.http.post(`${this.API_URI}/examen/save/`, updatedExamenGeneral);
  }

}
