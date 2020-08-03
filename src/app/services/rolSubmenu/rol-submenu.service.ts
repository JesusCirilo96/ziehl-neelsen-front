import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RolSubMenu } from '../../models/RolSubMenu';

import {AppSettings} from 'src/assets/js/messages';


@Injectable({
  providedIn: 'root'
})
export class RolSubmenuService {
  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getRolSubMenus(){
    return this.http.get(`${this.API_URI}/rolsubmenu`);
  }

  getRolSubMenu(rol_id: number){
    return this.http.get(`${this.API_URI}/rolsubmenu/${rol_id}`);
  }

  deleteRolSubMenu(rol_id:number){
    return this.http.delete(`${this.API_URI}/rolsubmenu/${rol_id}`);
  }

  saveRolSubMenu(rolSubMenu: RolSubMenu){
    return this.http.post(`${this.API_URI}/rolsubmenu`, rolSubMenu);
  }
}
