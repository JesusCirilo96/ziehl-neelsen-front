import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Rol } from '../../models/Rol';
import { Observable } from 'rxjs';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class RolService { 
  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getRoles(){
    return this.http.get(`${this.API_URI}/rol`);
  }

  getRol(id: number){
    return this.http.get(`${this.API_URI}/rol/${id}`);
  }

  deleteRol(id:number){
    return this.http.delete(`${this.API_URI}/rol/${id}`);
  }

  saveRol(rol: Rol){
    return this.http.post(`${this.API_URI}/rol`, rol);
  }

  updateRol(rol_id:number, updatedRol:Rol): Observable<Rol>{
    return this.http.put(`${this.API_URI}/rol/${rol_id}`, updatedRol);
  }
}
