import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ExamenGeneral} from '../../models/ExamenGeneral';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExamenGeneralService {

  
  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getExamenesGenerales(){
    return this.http.get(`${this.API_URI}/examen/get/all`);
  }

  getExamenGeneral(id: number){
    return this.http.get(`${this.API_URI}/examen/get/${id}`);
  }

  saveExamenGeneral(examenGeneral: ExamenGeneral){
    return this.http.post(`${this.API_URI}/examen/save/`, examenGeneral);
  }

  updateExamenGeneral(updatedExamenGeneral:ExamenGeneral): Observable<ExamenGeneral>{
    return this.http.post(`${this.API_URI}/examen/save/`, updatedExamenGeneral);
  }

}
