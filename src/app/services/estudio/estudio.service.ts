import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Estudio} from 'src/app/models/Estudio';
import {ResultadoSelectEstudio} from 'src/app/models/ResultadoSelectEstudio';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {


  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  /**
   * Obtenemos todos los estudios
   */
  getEstudios(){
    return this.http.get(`${this.API_URI}/estudio/get/all`);
  }

  /**
   * Obtener un estudio por ID
   * @param id ID del estudio
   */
  getEstudio(id: number){
    return this.http.get(`${this.API_URI}/estudio/get/${id}`);
  }

  /**
   * Actualizamos el estudio si es comodin o no
   * @param estudioId El id del estudio a guardar
   * @param estado el estado a poner
   * @returns respuesta del servicio
   */
  updateComodin(estudioId: number, estado: boolean){
    return this.http.get(`${this.API_URI}/estudio/update/comodin/${estudioId}/${estado}`)
  }

  /**
   * Actualizamos el campo de posibles resultados en BD
   * @param resultadoSelect El objeto con el estudio y los resultados
   * @returns Respuesta del servicio
   */
  updateResultadoSelect(resultadoSelect: ResultadoSelectEstudio){
    return this.http.post(`${this.API_URI}/estudio/update/select/`, resultadoSelect);
  }

  /**
   * Guardar estudio nuevo
   * @param estudio El objeto de estudio
   */
  saveEstudio(estudio: Estudio){
    return this.http.post(`${this.API_URI}/estudio/save/`, estudio);
  }

  /**
   * Actualizamos los datos del examen general
   * @param updatedEstudio El estudio a actualizar
   */
  updateEstudio(updatedEstudio:Estudio): Observable<Estudio>{
    return this.http.post(`${this.API_URI}/estudio/save/`, updatedEstudio);
  }

  /**
   * Guardamos listas de estudios
   * @param estudio El objeto con los datos del estudio
   */
   saveEstudioMasivo(estudio: any){
    return this.http.post(`${this.API_URI}/estudio/save/masivo/`, estudio);
  }

}
