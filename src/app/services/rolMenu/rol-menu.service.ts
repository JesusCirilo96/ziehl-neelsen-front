import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RolMenu } from '../../models/RolMenu';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {

  constructor(private http: HttpClient) { 

  }

  API_URI = environment.apiUrl;

  getRolMenus(){
    return this.http.get(`${this.API_URI}/rolmenu`);
  }

  deleteRolMenu(rol_id:number){
    return this.http.delete(`${this.API_URI}/rolmenu/${rol_id}`);
  }

  saveRolMenu(rolMenu: RolMenu){
    return this.http.post(`${this.API_URI}/rolmenu`, rolMenu);
  }  
}
