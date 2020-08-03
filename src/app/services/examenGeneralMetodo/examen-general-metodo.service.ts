import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ExamenGeneralMetodo } from '../../models/ExamenGeneralMetodo';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralMetodoService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getExamenesGenMetodo(){
    return this.http.get(`${this.API_URI}/metodoexgeneral`);
  }

  getExamenGenMetodo(id: number){
    return this.http.get(`${this.API_URI}/metodoexgeneral/${id}`);
  }

  deleteExamenGenMetodo(id:number){
    return this.http.delete(`${this.API_URI}/metodoexgeneral/${id}`);
  }

  saveExamenGenMetodo(examenGenMetodo: ExamenGeneralMetodo){
    return this.http.post(`${this.API_URI}/metodoexgeneral`,examenGenMetodo);
  }
}
