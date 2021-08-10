import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Menu } from '../../models/Menu';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SubMenu } from 'src/app/models/SubMenu';

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


  /**
   * Obtener todos los menus con sus respectivos submenus
   * @returns Menus con sus submenus
   */
  getAllMenuSubmenu(){
    return this.http.get(`${this.API_URI}/menu/all/menu/submenu`);
  }

  getMenu(id: number){
    return this.http.get(`${this.API_URI}/menu/get/${id}`);
  }

  /**
   * Se guarda el menu en base de datos
   * @param menu el objeto menu
   * @returns Respuesta del servicio
   */
  saveMenu(menu: Menu){
    return this.http.post(`${this.API_URI}/menu/save`, menu);
  }

  updateMenu(updatedMenu:Menu): Observable<Menu>{
    return this.http.post(`${this.API_URI}/menu/save`, updatedMenu);
  }

  saveSubMenu(menu: SubMenu){
    return this.http.post(`${this.API_URI}/menu/submenu/save`, menu);
  }

  updateSubMenu(updatedMenu:SubMenu): Observable<Menu>{
    return this.http.post(`${this.API_URI}/menu/submenu/save`, updatedMenu);
  }
}
