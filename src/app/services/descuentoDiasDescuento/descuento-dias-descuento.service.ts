import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {DescuentoDiasDescuento} from '../../models/DescuentoDiasDescuento';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class DescuentoDiasDescuentoService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 
  }

  getDescuentosDias(){
    return this.http.get(`${this.API_URI}/descuentodiadescuento`);
  }

  getDescuentoDia(id: number){
    return this.http.get(`${this.API_URI}/descuentodiadescuento/${id}`);
  }

  deleteDescuentoDia(id:number){
    return this.http.delete(`${this.API_URI}/descuentodiadescuento/${id}`);
  }

  saveDescuentoDia(descuentoDiaDescuento: DescuentoDiasDescuento){
    return this.http.post(`${this.API_URI}/descuentodiadescuento`, descuentoDiaDescuento);
  }
}
