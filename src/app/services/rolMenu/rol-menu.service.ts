import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RolMenu } from '../../models/RolMenu';

import {AppSettings} from 'src/assets/js/messages';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {

  constructor(private http: HttpClient) { 

  }

  API_URI = AppSettings.API_ENDPOINT;

  getRolMenus(){
    return this.http.get(`${this.API_URI}/rolmenu`);
  }

  getRolMenu(rol_id: number){
    return this.http.get(`${this.API_URI}/rolmenu/${rol_id}`);
  }

  deleteRolMenu(rol_id:number){
    return this.http.delete(`${this.API_URI}/rolmenu/${rol_id}`);
  }

  saveRolMenu(rolMenu: RolMenu){
    return this.http.post(`${this.API_URI}/rolmenu`, rolMenu);
  }  
}
