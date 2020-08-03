import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ExamenGeneralSubExamen  } from '../../models/ExamenGeneralSubExamen';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralSubExamenService {

  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getExamenGeneralSubexamenes(){
    return this.http.get(`${this.API_URI}/exgeneralsubex`);
  }

  getExamenGeneralSubexamen(id: number){
    return this.http.get(`${this.API_URI}/exgeneralsubex/${id}`);
  }

  deleteExamenGeneralSubexamen(id:number){
    return this.http.delete(`${this.API_URI}/exgeneralsubex/${id}`);
  }

  saveExamenGeneralSubexamen(examenGeneralSubExamen: ExamenGeneralSubExamen){
    return this.http.post(`${this.API_URI}/exgeneralsubex`, examenGeneralSubExamen);
  }

}
