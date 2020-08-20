import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Metodo} from '../../models/Metodo';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class MetodoService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getMetodos(){
    return this.http.get(`${this.API_URI}/metodo/get/all`);
  }

  getMetodo(id: number){
    return this.http.get(`${this.API_URI}/metodo/get/id/${id}`);
  }

  deleteMetodo(id:number){
    return this.http.delete(`${this.API_URI}/metodo/${id}`);
  }

  saveMetodo(metodo: Metodo){
    return this.http.post(`${this.API_URI}/metodo/save`, metodo);
  }

  updateMetodo(updatedMetodo:Metodo): Observable<Metodo>{
    return this.http.post(`${this.API_URI}/metodo/save/`, updatedMetodo);
  }

}
