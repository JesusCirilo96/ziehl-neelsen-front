import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Menu } from '../../models/Menu';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    
  constructor(private http: HttpClient) { 

  }

  API_URI = environment.apiUrl;

  getMenus(){
    return this.http.get(`${this.API_URI}/menu/get/all`);
  }

  getSubmenuPorMenu(id: number){
    return this.http.get(`${this.API_URI}/menu/submenu/${id}`);
  }

  getAllMenuSubmenu(){
    return this.http.get(`${this.API_URI}/menu/all/menu/submenu`);
  }

  getMenu(id: number){
    return this.http.get(`${this.API_URI}/menu/get/${id}`);
  }

  saveMenu(menu: Menu){
    return this.http.post(`${this.API_URI}/menu`, menu);
  }

  updateMenu(updatedMenu:Menu): Observable<Menu>{
    return this.http.post(`${this.API_URI}/menu`, updatedMenu);
  }
}
