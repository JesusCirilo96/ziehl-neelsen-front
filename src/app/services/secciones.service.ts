import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Seccion} from '../models/Seccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  API_URI = 'http://localhost:8888';

  constructor(private http: HttpClient) { 

  }

  getSecciones(){
    return this.http.get(`${this.API_URI}/seccion/get/all`);
  }
  
  getSeccionExamen(){
    return this.http.get(`${this.API_URI}/seccion/examen`);//obtener los examennes clasificados por seccion
  }

  getSeccion(id: number){
    return this.http.get(`${this.API_URI}/seccion/get/id/${id}`);
  }

  deleteSeccion(id:number){
    return this.http.delete(`${this.API_URI}/seccion/${id}`);
  }

  saveSeccion(seccion: Seccion){
    return this.http.post(`${this.API_URI}/seccion/save`, seccion);
  }

  updateSeccion(updatedSeccion:Seccion): Observable<Seccion>{
    return this.http.post(`${this.API_URI}/seccion/save`, updatedSeccion);
  }

}
