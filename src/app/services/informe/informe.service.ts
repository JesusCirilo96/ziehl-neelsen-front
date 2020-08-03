import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Informe } from '../../models/Informe';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

   
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getInformess(){
    return this.http.get(`${this.API_URI}/informe`);
  }

  getInforme(recepcion_id: string){
    return this.http.get(`${this.API_URI}/informe/${recepcion_id}`);
  }

  deleteInforme(id:number){
    return this.http.delete(`${this.API_URI}/informe/${id}`);
  }

  saveInforme(informe: Informe){
    return this.http.post(`${this.API_URI}/informe`, informe);
  }

  updateInforme(informe_id:number, updatedInforme:Informe): Observable<Informe>{
    return this.http.put(`${this.API_URI}/informe/actualizar/${informe_id}`, updatedInforme);
  }
}
