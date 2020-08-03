import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubMenu } from '../../models/SubMenu';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {
  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getSubMenus(){
    return this.http.get(`${this.API_URI}/submenu`);
  }

  getSubMenu(id: number){
    return this.http.get(`${this.API_URI}/submenu/${id}`);
  }

  deleteSubMenu(id:number){
    return this.http.delete(`${this.API_URI}/submenu/${id}`);
  }

  saveSubMenu(submenu: SubMenu){
    return this.http.post(`${this.API_URI}/submenu`, submenu);
  }

  updateSubMenu(sub_menu_id:number, updatedSubMenu:SubMenu): Observable<SubMenu>{
    return this.http.put(`${this.API_URI}/submenu/${sub_menu_id}`, updatedSubMenu);
  }
}
