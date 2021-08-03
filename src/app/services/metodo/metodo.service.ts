import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Metodo} from '../../models/Metodo';
import {MetodoSeccion} from 'src/app/models/MetodoSeccion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MetodoEstudio } from 'src/app/models/MetodoEstudio';
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
   * Obtenemos los metodos del estudio
   * @param estudioId El ID del estudio a buscar
   */
  getMetodosEstudio(estudioId){
    return this.http.get(`${this.API_URI}/metodo/estudio/${estudioId}`);
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

  /**
   * Guardamos el metodo estudio
   * @param metodoSeccion El objeto del metodo con seccion
   */
  saveMetodoEstudio(metodoEstudio:MetodoEstudio):Observable<MetodoEstudio>{
    return this.http.post(`${this.API_URI}/metodo/estudio/save/`, metodoEstudio);
  }

  /**
   * Eliminamos el vinculo entre el metodo y la seccion
   * @param seccionId El id de la seccion a eliminar
   * @param metodoId El id del metodo a eliminar
   * @returns Respuesta del servicio
   */
  deleteMetodoSeccion(seccionId: number, metodoId: number){
    return this.http.delete(`${this.API_URI}/metodo/seccion/delete/${seccionId}/${metodoId}`);
  }
  
  /**
   * Eliminamos el vinculo entre el estudio y el metodo
   * @param estudioId El id del estudio a eliminar
   * @param metodoId El id del metodo a eliminar
   * @return Respuesta del servicio
   */
  deleteMetodoEstudio(estudioId: number, metodoId: number){
    return this.http.delete(`${this.API_URI}/metodo/estudio/delete/${estudioId}/${metodoId}`);
  }
}
