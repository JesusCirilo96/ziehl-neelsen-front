import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubSeccion } from '../../models/SubSeccion';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class SubSeccionService {
  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getSubSecciones(){
    return this.http.get(`${this.API_URI}/subseccion`);
  }

  getSubSeccion(id: number){
    return this.http.get(`${this.API_URI}/subseccion/${id}`);
  }

  deleteSubSeccion(id:number){
    return this.http.delete(`${this.API_URI}/subseccion/${id}`);
  }

  saveSubSeccion(subseccion: SubSeccion){
    return this.http.post(`${this.API_URI}/subseccion`, subseccion);
  }

  updateSubSeccion(sub_seccion_id:number, updatedSubSeccion:SubSeccion): Observable<SubSeccion>{
    return this.http.put(`${this.API_URI}/subseccion/${sub_seccion_id}`, updatedSubSeccion);
  }
}
