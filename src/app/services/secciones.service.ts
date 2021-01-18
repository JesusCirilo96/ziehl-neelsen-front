import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Seccion} from '../models/Seccion';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  /**
   * Obtenemos todas las secciones
   */
  getSecciones(){
    return this.http.get(`${this.API_URI}/seccion/get/all`);
  }


  /**
   * Obtenemos la seccion por ID
   * @param id ID de la seccion
   */
  getSeccion(id: number){
    return this.http.get(`${this.API_URI}/seccion/get/${id}`);
  }

  /**
   * 
   * @param id Obtenemos los estudios de la seccion
   */
  getSeccionEstudio(id: number){
    return this.http.get(`${this.API_URI}/seccion/estudio/${id}`);
  }
  

  /**
   * Guardamos la seccion
   * @param seccion El objeto con lo datos de la seccion
   */
  saveSeccion(seccion: Seccion){
    return this.http.post(`${this.API_URI}/seccion/save`, seccion);
  }

  /**
   * Actualizamos la seccion
   * @param updatedSeccion La seccion a actualizar
   */
  updateSeccion(updatedSeccion:Seccion): Observable<Seccion>{
    return this.http.post(`${this.API_URI}/seccion/save`, updatedSeccion);
  }

}
