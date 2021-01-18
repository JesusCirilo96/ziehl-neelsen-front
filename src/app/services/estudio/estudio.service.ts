import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Estudio} from 'src/app/models/Estudio';
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

}
