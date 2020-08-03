import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {DiasDescuento} from '../../models/DiasDescuento';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class DiasDescuentoService {

  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getDiasDescuentos(){
    return this.http.get(`${this.API_URI}/diadescuento`);
  }

  getDiaDescuento(id: number){
    return this.http.get(`${this.API_URI}/diadescuento/${id}`);
  }

  saveDiaDescuento(descuento: DiasDescuento){
    return this.http.post(`${this.API_URI}/diadescuento`, descuento);
  }

  updateDiaDescuento(descuento_id:number, updateDescuento:DiasDescuento): Observable<DiasDescuento>{
    return this.http.put(`${this.API_URI}/diadescuento/${descuento_id}`, updateDescuento);
  }
}
