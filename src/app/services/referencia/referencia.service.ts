import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Referencia } from '../../models/Referencia';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getReferencias(){
    return this.http.get(`${this.API_URI}/referencia`);
  }

  getReferencia(id: number){
    return this.http.get(`${this.API_URI}/referencia/${id}`);
  }

  getMaxId(){
    return this.http.get(`${this.API_URI}/referencia/getlastid`);
  }
  deleteReferencia(id:number){
    return this.http.delete(`${this.API_URI}/referencia/${id}`);
  }

  saveReferencia(referencia: Referencia){
    return this.http.post(`${this.API_URI}/referencia`, referencia);
  }

  updateReferencia(referencia_id:number, updatedReferencia:Referencia): Observable<Referencia>{
    return this.http.put(`${this.API_URI}/referencia/${referencia_id}`, updatedReferencia);
  }
}
