import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Metodo} from '../../models/Metodo';
import {MetodoSeccion} from '../../models/MetodoSeccion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MetodoService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  /**
   * Obtenemos la lista de los metodos
   */
  getMetodos(){
    return this.http.get(`${this.API_URI}/metodo/get/all`);
  }

  /**
   * Obtenemos un metodo por ID
   * @param id El ID del metodo a obtener
   */
  getMetodo(id: number){
    return this.http.get(`${this.API_URI}/metodo/get/${id}`);
  }

  /**
   * Obtenemos los metodos de la seccion
   * @param seccionId El id de la seccion
   */
  getMetodosSeccion(seccionId){
    return this.http.get(`${this.API_URI}/metodo/seccion/${seccionId}`);
  }

  /**
   * Guardamos el metodo
   * @param metodo El objeto del metodo a guardar
   */
  saveMetodo(metodo: Metodo){
    return this.http.post(`${this.API_URI}/metodo/save`, metodo);
  }

  /**
   * Actualizamos un metodo
   * @param updatedMetodo El objeto del metodo a actualizar
   */
  updateMetodo(updatedMetodo:Metodo): Observable<Metodo>{
    return this.http.post(`${this.API_URI}/metodo/save/`, updatedMetodo);
  }

  /**
   * Guardamos el metodo seccion 
   * @param metodoSeccion El objeto del metodo con seccion
   */
  saveMetodoSeccion(metodoSeccion:MetodoSeccion):Observable<MetodoSeccion>{
    return this.http.post(`${this.API_URI}/metodo/seccion/save/`, metodoSeccion);
  }

}
