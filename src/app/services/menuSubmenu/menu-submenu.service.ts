import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MenuSubMenu } from '../../models/MenuSubmenu';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class MenuSubmenuService {  
  constructor(private http: HttpClient) { 

  }
  API_URI = AppSettings.API_ENDPOINT;

  getMenuSubMenus(){
    return this.http.get(`${this.API_URI}/menusubmenu`);
  }

  getMenuSubMenu(id: number){
    return this.http.get(`${this.API_URI}/menusubmenu/${id}`);
  }

  deleteMenuSubMenu(id:number){
    return this.http.delete(`${this.API_URI}/menusubmenu/${id}`);
  }

  saveMenuSubMenu(menuSubMenu: MenuSubMenu){
    return this.http.post(`${this.API_URI}/menusubmenu`, menuSubMenu);
  }
}
