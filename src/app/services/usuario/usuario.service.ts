import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/Usuario';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(private http: HttpClient) { 

  }

  API_URI = environment.apiUrl;

  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuario/get/all`);
  }

  getUsuario(id: number){
    return this.http.get(`${this.API_URI}/usuario/get/${id}`);
  }

  deleteUsuario(id:number){
    return this.http.delete(`${this.API_URI}/usuario/${id}`);
  }

  saveUsuario(usuario: Usuario){
    return this.http.post(`${this.API_URI}/usuario/save`, usuario);
  }

  updateUsuario(updatedUsuario:Usuario): Observable<Usuario>{
    return this.http.post(`${this.API_URI}/usuario/save`, updatedUsuario);
  }
}
