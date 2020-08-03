import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  ExamenGeneralSubSeccion } from '../../models/ExamenGeneralSubSeccion';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralSubseccionService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getExamenGeneralSubsecciones(){
    return this.http.get(`${this.API_URI}/examengeneralsubseccion`);
  }

  getExamenGeneralSubseccion(id: number){
    return this.http.get(`${this.API_URI}/examengeneralsubseccion/${id}`);
  }

  deleteExamenGeneralSubseccion(id:number){
    return this.http.delete(`${this.API_URI}/examengeneralsubseccion/${id}`);
  }

  saveExamenGeneralSubseccion(subsSeccionSubExamen: ExamenGeneralSubSeccion){
    return this.http.post(`${this.API_URI}/examengeneralsubseccion`, subsSeccionSubExamen);
  }

  updateExamenGeneralSubseccion(sub_seccion_id:number, updatedSubSeccionSubExamen:ExamenGeneralSubSeccion): Observable<ExamenGeneralSubSeccion>{
    return this.http.put(`${this.API_URI}/examengeneralsubseccion/${sub_seccion_id}`, updatedSubSeccionSubExamen);
  }
}
