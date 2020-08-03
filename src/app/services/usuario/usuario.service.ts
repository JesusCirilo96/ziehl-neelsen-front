import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/Usuario';
import { Observable } from 'rxjs';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuario`);
  }

  getUsuario(id: number){
    return this.http.get(`${this.API_URI}/usuario/${id}`);
  }

  deleteUsuario(id:number){
    return this.http.delete(`${this.API_URI}/usuario/${id}`);
  }

  saveUsuario(usuario: Usuario){
    return this.http.post(`${this.API_URI}/usuario`, usuario);
  }

  updateUsuario(usuario_id:number, updatedUsuario:Usuario): Observable<Usuario>{
    return this.http.put(`${this.API_URI}/usuario/${usuario_id}`, updatedUsuario);
  }
}
