import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubSeccionSubExamen  } from '../../models/SubSeccionSubExamen';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class SubseccionSubexamenService {
  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getSubSeccionesSubExamenes(){
    return this.http.get(`${this.API_URI}/subexamensubseccion`);
  }

  getSubSeccionSubExamen(id: number){
    return this.http.get(`${this.API_URI}/subexamensubseccion/${id}`);
  }

  deleteSubSeccionSubExamen(id:number){
    return this.http.delete(`${this.API_URI}/subexamensubseccion/${id}`);
  }

  saveSubSeccionSubExamen(subsSeccionSubExamen: SubSeccionSubExamen){
    return this.http.post(`${this.API_URI}/subexamensubseccion`, subsSeccionSubExamen);
  }

  updateSubSeccionSubExamen(sub_seccion_id:number, updatedSubSeccionSubExamen:SubSeccionSubExamen): Observable<SubSeccionSubExamen>{
    return this.http.put(`${this.API_URI}/subexamensubseccion/${sub_seccion_id}`, updatedSubSeccionSubExamen);
  }
}
