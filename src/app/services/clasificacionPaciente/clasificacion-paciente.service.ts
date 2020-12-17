import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ClasificacionPaciente} from '../../models/ClasificacionPaciente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClasificacionPacienteService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { }


  /**
   * Obtenemos todas las clasificaciones de los pacientes
   */
  getClasificacionPacientes(){
    return this.http.get(`${this.API_URI}/clasificacion/paciente/get/all`);
  }

  /**
   * Obtener una clasificacion de paciente
   * @param id ID de la clasificacion
   */
  getClasificacionPaciente(id: number){
    return this.http.get(`${this.API_URI}/clasificacion/paciente/get/${id}`);
  }

  /**
   * El objeto de examen
   * @param clasificacion Guardamos el examen
   */
  saveClasificacion(clasificacion: ClasificacionPaciente){
    return this.http.post(`${this.API_URI}/clasificacion/paciente/save/`, clasificacion);
  }

  /**
   * Actualizamos los datos del examen general
   * @param updatedClasificacion El examen a actualizar
   */
  updateClasificacion(updatedClasificacion:ClasificacionPaciente): Observable<ClasificacionPaciente>{
    return this.http.post(`${this.API_URI}/clasificacion/paciente/save/`, updatedClasificacion);
  }
}
