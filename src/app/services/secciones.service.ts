import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Seccion} from '../models/Seccion';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  getSecciones(){
    return this.http.get(`${this.API_URI}/categoria/get/all`);
  }
  
  getSeccionExamen(){
    return this.http.get(`${this.API_URI}/categoria/examen`);//obtener los examennes clasificados por seccion
  }

  getSeccion(id: number){
    return this.http.get(`${this.API_URI}/categoria/get/${id}`);
  }

  saveSeccion(seccion: Seccion){
    return this.http.post(`${this.API_URI}/categoria/save`, seccion);
  }

  updateSeccion(updatedSeccion:Seccion): Observable<Seccion>{
    return this.http.post(`${this.API_URI}/categoria/save`, updatedSeccion);
  }

}
