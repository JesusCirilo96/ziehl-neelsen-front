import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubExamen } from '../../models/SubExamen';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class SubExamenService {

  
  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getSubExamenes(){
    return this.http.get(`${this.API_URI}/subexamen`);
  }

  getSubExamen(id: number){
    return this.http.get(`${this.API_URI}/subexamen/${id}`);
  }

  getMaxId(){
    return this.http.get(`${this.API_URI}/subexamen/getlastid`);
  }


  deleteSubExamen(id:number){
    return this.http.delete(`${this.API_URI}/subexamen/${id}`);
  }

  saveSubExamen(subexamen: SubExamen){
    return this.http.post(`${this.API_URI}/subexamen`, subexamen);
  }

  updateSubExamen(sub_examen_id:number, updatedSubExamen:SubExamen): Observable<SubExamen>{
    return this.http.put(`${this.API_URI}/subexamen/${sub_examen_id}`, updatedSubExamen);
  }

}
