import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ExamenGeneral} from '../../models/ExamenGeneral';
import {ExamenEstudio} from '../../models/ExamenEstudio';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamenSeccion } from 'src/app/models/ExamenSeccion';
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
   * Obtenemos los estudios correspondientes al examen
   * @param id El id del examen
   */
  getExamenEstudios(id: number){
    return this.http.get(`${this.API_URI}/examen/estudio/${id}`);
  }

  /**
   * El objeto de examen
   * @param examenGeneral Guardamos el examen
   */
  saveExamenGeneral(examenGeneral: ExamenGeneral){
    return this.http.post(`${this.API_URI}/examen/save/`, examenGeneral);
  }

  /**
   * Guardamos el id de examen y id de estudio
   * @param examenEstudio El examen estudio a guardar
   */
  saveExamenEstudio(examenEstudio: ExamenEstudio){
    return this.http.post(`${this.API_URI}/examen/estudio/save/`, examenEstudio);
  }

  /**
   * Guardamos el registro que une examen con secciones
   * @param examenSeccion El objeto de la tabla examenSeccion
   */
  saveExamenSeccion(examenSeccion: ExamenSeccion){
    return this.http.post(`${this.API_URI}/examen/seccion/save/`, examenSeccion);
  }

  /**
   * Actualizamos los datos del examen general
   * @param updatedExamenGeneral El examen a actualizar
   */
  updateExamenGeneral(updatedExamenGeneral:ExamenGeneral): Observable<ExamenGeneral>{
    return this.http.post(`${this.API_URI}/examen/save/`, updatedExamenGeneral);
  }

  /**
   * Elimina el vinculo de examen con la seccion
   * @param examenId El id del examen a eliminar
   * @param seccionId El id de la seccion a eliminar
   * @returns Respuesta del servicio
   */
  deleteExamenSeccion(examenId: number, seccionId: number){
    return this.http.delete(`${this.API_URI}/examen/seccion/delete/${examenId}/${seccionId}`);
  }

  /**
   * Elimina el vinculo entre el examen y estudio
   * @param examenId El id del examen a eliminar
   * @param estudioId El id del estudio a eliminar
   * @returns Respuesta del servicio
   */
  deleteExamenEstudio(examenId: number, estudioId: number){
    return this.http.delete(`${this.API_URI}/examen/estudio/delete/${examenId}/${estudioId}`);
  }

}
