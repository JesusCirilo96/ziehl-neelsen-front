import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Menu } from '../../models/Menu';
import { Observable } from 'rxjs';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    
  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getMenus(){
    return this.http.get(`${this.API_URI}/menu`);
  }

  getMenu(id: number){
    return this.http.get(`${this.API_URI}/menu/${id}`);
  }

  deleteMenu(id:number){
    return this.http.delete(`${this.API_URI}/menu/${id}`);
  }

  saveMenu(menu: Menu){
    return this.http.post(`${this.API_URI}/menu`, menu);
  }

  updateMenu(menu_id:number, updatedMenu:Menu): Observable<Menu>{
    return this.http.put(`${this.API_URI}/menu/${menu_id}`, updatedMenu);
  }
}
