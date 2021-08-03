import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SeccionEstudio } from '../../models/SeccionEstudio';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private http: HttpClient) { 

  }

  API_URI = environment.apiUrl;

  /**
   * 
   * @param id Obtenemos los estudios de la seccion
   */
  getSeccionEstudio(id: number){
    return this.http.get(`${this.API_URI}/seccion/estudio/${id}`);
  }

  /**
   * Guardamos el estudio correspondiente a la seccion
   * @param seccionEstudio El objeto con el id de la seccion y el nombre del estudio
   */
  saveSeccionEstudio(seccionEstudio: SeccionEstudio){
    return this.http.post(`${this.API_URI}/seccion/estudio/save`, seccionEstudio);
  }

  /**
   * Eliminamos la seccion estudio
   * @param seccionId El id de la seccion
   * @param estudioId El id del estudio
   * @returns Respuesta del servicio
   */
  deleteSeccionEstudio(seccionId: number, estudioId: number){
    return this.http.delete(`${this.API_URI}/seccion/estudio/delete/${seccionId}/${estudioId}`);
  }

  /**
   * Guardamos el estudio correspondiente a la seccion
   * @param seccionEstudio El objeto con el id de la seccion y el nombre del estudio
   */
   updateSeccionEstudio(seccionEstudio: SeccionEstudio){
    return this.http.put(`${this.API_URI}/seccion/estudio/update`, seccionEstudio);
  }

}
