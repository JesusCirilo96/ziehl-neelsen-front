import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Seccion} from '../models/Seccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  API_URI = 'http://localhost:8090';

  constructor(private http: HttpClient) { 

  }

  getSecciones(){
    return this.http.get(`${this.API_URI}/seccion/getAll`);
  }
  
  getSeccionExamen(){
    return this.http.get(`${this.API_URI}/seccion/examen`);//obtener los examennes clasificados por seccion
  }

  getSeccion(id: number){
    return this.http.get(`${this.API_URI}/seccion/${id}`);
  }

  deleteSeccion(id:number){
    return this.http.delete(`${this.API_URI}/seccion/${id}`);
  }

  saveSeccion(seccion: Seccion){
    return this.http.post(`${this.API_URI}/seccion/save`, seccion);
  }

  updateSeccion(seccion_id:number, updatedSeccion:Seccion): Observable<Seccion>{
    return this.http.put(`${this.API_URI}/seccion/${seccion_id}`, updatedSeccion);
  }

}
