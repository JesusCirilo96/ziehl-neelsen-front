import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Referencia } from '../../models/Referencia';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  
  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  /**
   * Obtenemos todas las referencias
   */
  getReferencias(){
    return this.http.get(`${this.API_URI}/referencia/get/all`);
  }

  /**
   * Obtenemos la referencia del estudio
   * @param id El id del estudio
   */
  getReferenciaEstudio(id: number){
    return this.http.get(`${this.API_URI}/referencia/estudio/${id}`);
  }

  /**
   * Borramos la referencia
   * @param id 
   */
  deleteReferencia(id:number){
    return this.http.delete(`${this.API_URI}/referencia/${id}`);
  }

  /**
   * El objeto de la referencia a guardar
   * @param referencia El objeto de la referencia a guardar
   */
  saveReferencia(referencia: Referencia){
    return this.http.post(`${this.API_URI}/referencia/save`, referencia);
  }

  /**
   * Actualizamos la referencia
   * @param updatedReferencia El objeto de la referencia a actualizar
   */
  updateReferencia(updatedReferencia:Referencia): Observable<Referencia>{
    return this.http.put(`${this.API_URI}/referencia/save`, updatedReferencia);
  }
}
