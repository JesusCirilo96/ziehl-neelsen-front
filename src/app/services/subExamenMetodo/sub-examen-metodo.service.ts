import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubExamenMetodo } from '../../models/SubExamenMetodo';
import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class SubExamenMetodoService {

  API_URI = AppSettings.API_ENDPOINT;

  constructor(private http: HttpClient) { 

  }

  getSubExamenMetodos(){
    return this.http.get(`${this.API_URI}/subexamenmetodo`);
  }

  getSubExamenMetodo(id: number){
    return this.http.get(`${this.API_URI}/subexamenmetodo/${id}`);
  }

  deleteSubExamenMetodo(id:number){
    return this.http.delete(`${this.API_URI}/subexamenmetodo/${id}`);
  }

  saveSubExamenMetodo(subexamenmetodo: SubExamenMetodo){
    return this.http.post(`${this.API_URI}/subexamenmetodo`, subexamenmetodo);
  }
}
