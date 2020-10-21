import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ExamenGeneral} from '../../models/ExamenGeneral';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralService {

  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 
  }

  getExamenesGenerales(){
    return this.http.get(`${this.API_URI}/examen/get/all`);
  }

  getExamenGeneral(id: number){
    return this.http.get(`${this.API_URI}/examen/get/${id}`);
  }

  saveExamenGeneral(examenGeneral: ExamenGeneral){
    return this.http.post(`${this.API_URI}/examen`, examenGeneral);
  }

  updateExamenGeneral(examen_gen_id:number, updatedExamenGeneral:ExamenGeneral): Observable<ExamenGeneral>{
    return this.http.put(`${this.API_URI}/examengeneral/${examen_gen_id}`, updatedExamenGeneral);
  }

}
