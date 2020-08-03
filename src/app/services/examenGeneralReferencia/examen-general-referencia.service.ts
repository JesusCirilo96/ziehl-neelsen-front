import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ExamenGeneralReferencia } from '../../models/ExamenGeneralReferencia';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralReferenciaService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getExamenGeneralReferencias(){
    return this.http.get(`${this.API_URI}/examengeneralreferencia`);
  }

  getExamenGeneralReferencia(id: number){
    return this.http.get(`${this.API_URI}/examengeneralreferencia/${id}`);
  }

  deleteExamenGeneralReferencia(id:number){
    return this.http.delete(`${this.API_URI}/examengeneralreferencia/${id}`);
  }

  saveExamenGeneralReferencia(examenGeneralReferencia: ExamenGeneralReferencia){
    return this.http.post(`${this.API_URI}/examengeneralreferencia`,examenGeneralReferencia);
  }
}
