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

  getReferencias(){
    return this.http.get(`${this.API_URI}/referencia/get/all`);
  }

  getReferenciaEstudio(id: number){
    return this.http.get(`${this.API_URI}/referencia/estudio/${id}`);
  }

  deleteReferencia(id:number){
    return this.http.delete(`${this.API_URI}/referencia/${id}`);
  }

  saveReferencia(referencia: Referencia){
    return this.http.post(`${this.API_URI}/referencia/save`, referencia);
  }

  updateReferencia(updatedReferencia:Referencia): Observable<Referencia>{
    return this.http.put(`${this.API_URI}/referencia/save`, updatedReferencia);
  }
}
