import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Rol } from '../../models/Rol';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService { 
  constructor(private http: HttpClient) { 

  }

  API_URI = environment.apiUrl;

  /**
   * Obetenemos todos los roles de usuario
   */
  getRoles(){
    return this.http.get(`${this.API_URI}/rol/get/all`);
  }

  /**
   * Obtenemos el Rol por ID
   * @param id El ID del rol
   */
  getRol(id: number){
    return this.http.get(`${this.API_URI}/rol/get/${id}`);
  }

  /**
   * Obtener los roles del usuario
   * @param id El ID del usuario
   */
  getRolByUsuario(id: number){
    return this.http.get(`${this.API_URI}/usuario/get/rol/${id}`);
  }

  /**
   * Obtenemos los menus del ROL
   * @param rolId El ID del ROL
   */
  getRolMenu(rolId: number){
    return this.http.get(`${this.API_URI}/rol/menu/${rolId}`);
  }

  /**
   * Guarda el rol en BD
   * @param rol El rol a guardar
   */
  saveRol(rol: Rol){
    return this.http.post(`${this.API_URI}/rol/save`, rol);
  }

  /**
   * Actualiza el rol en BD
   * @param updatedRol El rol a guardar
   */
  updateRol(updatedRol:Rol): Observable<Rol>{
    return this.http.post(`${this.API_URI}/rol/save`, updatedRol);
  }
}
