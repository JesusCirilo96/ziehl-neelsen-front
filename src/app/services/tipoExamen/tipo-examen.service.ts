import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TipoExamen } from '../../models/TipoExamen';
import { Observable } from 'rxjs';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class TipoExamenService {  

  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getTipoExamenes(){
    return this.http.get(`${this.API_URI}/tipoexamen`);
  }

  getTipoExamen(id: number){
    return this.http.get(`${this.API_URI}/tipoexamen/${id}`);
  }

  deleteTipoExamen(id:number){
    return this.http.delete(`${this.API_URI}/tipoexamen/${id}`);
  }

  saveTipoExamen(seccion: TipoExamen){
    return this.http.post(`${this.API_URI}/tipoexamen`, seccion);
  }

  updateTipoExamene(tipo_examen_id:number, updatedTipoExamen:TipoExamen): Observable<TipoExamen>{
    return this.http.put(`${this.API_URI}/tipoexamen/${tipo_examen_id}`, updatedTipoExamen);
  }

}
