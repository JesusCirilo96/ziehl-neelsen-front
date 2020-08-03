import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubExamenReferencia } from '../../models/SubExamenReferencia';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class SubExamenReferenciaService {
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getSubExamenesReferencia(){
    return this.http.get(`${this.API_URI}/subexamenreferencia`);
  }

  getSubExamenReferencia(id: number){
    return this.http.get(`${this.API_URI}/subexamenreferencia/${id}`);
  }

  deleteSubExamenReferencia(id:number){
    return this.http.delete(`${this.API_URI}/subexamenreferencia/${id}`);
  }

  saveSubExamenReferencia(subExamenReferencia: SubExamenReferencia){
    return this.http.post(`${this.API_URI}/subexamenreferencia`,subExamenReferencia);
  }
}
