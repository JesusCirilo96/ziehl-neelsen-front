import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubSeccionMetodo } from '../../models/SubSeccionMetodo';
import {AppSettings} from 'src/assets/js/messages';


@Injectable({
  providedIn: 'root'
})
export class SubseccionMetodoService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getSubSeccionMetodos(){
    return this.http.get(`${this.API_URI}/subseccionmetodo`);
  }

  getSubSeccionMetodo(id: number){
    return this.http.get(`${this.API_URI}/subseccionmetodo/${id}`);
  }

  deleteSubSeccionMetodo(id:number){
    return this.http.delete(`${this.API_URI}/subseccionmetodo/${id}`);
  }

  saveSubSeccionMetodo(subseccionmetodo: SubSeccionMetodo){
    return this.http.post(`${this.API_URI}/subseccionmetodo`, subseccionmetodo);
  }
}
