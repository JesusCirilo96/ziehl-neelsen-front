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
    return this.http.get(`${this.API_URI}/medico/get/all`);
  }

  getAtencion(id: number){
    return this.http.get(`${this.API_URI}/medico/get/id/${id}`);
  }

  deleteAtencion(id:number){
    return this.http.delete(`${this.API_URI}/medico/${id}`);
  }

  saveAtencion(atencion: Atencion){
    return this.http.post(`${this.API_URI}/medico`, atencion);
  }

  updateAtencion(updatedAtencion:Atencion): Observable<Atencion>{
    return this.http.post(`${this.API_URI}/medico/save`, updatedAtencion);
  }
}
