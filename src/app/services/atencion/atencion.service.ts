import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Atencion} from '../../models/Atencion';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getAtenciones(){
    return this.http.get(`${this.API_URI}/atencion`);
  }

  getAtencion(id: number){
    return this.http.get(`${this.API_URI}/atencion/${id}`);
  }

  deleteAtencion(id:number){
    return this.http.delete(`${this.API_URI}/atencion/${id}`);
  }

  saveAtencion(atencion: Atencion){
    return this.http.post(`${this.API_URI}/atencion`, atencion);
  }

  updateAtencion(atencion_id:number, updatedAtencion:Atencion): Observable<Atencion>{
    return this.http.put(`${this.API_URI}/atencion/${atencion_id}`, updatedAtencion);
  }
}
