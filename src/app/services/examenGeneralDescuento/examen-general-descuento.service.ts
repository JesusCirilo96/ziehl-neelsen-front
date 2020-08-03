import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ExamenGeneralDescuento} from '../../models/ExamenGeneralDescuento';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralDescuentoService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getexamenDescuentos(){
    return this.http.get(`${this.API_URI}/examendescuento`);
  }

  getExamenDescuento(id: number){
    return this.http.get(`${this.API_URI}/examendescuento/${id}`);
  }

  saveExamenDescuento(examenDescuento: ExamenGeneralDescuento){
    return this.http.post(`${this.API_URI}/examendescuento`, examenDescuento);
  }  
}
