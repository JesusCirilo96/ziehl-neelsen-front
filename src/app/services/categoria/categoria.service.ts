import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Categoria} from 'src/app/models/Categoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) { 

  }

  /**
   * Obtenemos todas las categorias
   */
  getCategorias(){
    return this.http.get(`${this.API_URI}/categoria/get/all`);
  }
  
  /**
   * obtenemos los examenes clasificados por categoria
   */
  getCategoriaExamen(){
    return this.http.get(`${this.API_URI}/categoria/examen`);
  }

  /**
   * Obtenemos una categoria dada la ID
   * @param id Id de la categoria a obtener
   */
  getCategoria(id: number){
    return this.http.get(`${this.API_URI}/categoria/get/${id}`);
  }

  /**
   * Guardamos la categoria nueva
   * @param categoria La categoria a guardar
   */
  saveCategoria(categoria: Categoria){
    return this.http.post(`${this.API_URI}/categoria/save`, categoria);
  }

  /**
   * Actualizamos una categoria
   * @param updatedCategoria La categoria a actualizar
   */
  updateCategorias(updatedCategoria:Categoria): Observable<Categoria>{
    return this.http.post(`${this.API_URI}/categoria/save`, updatedCategoria);
  }
}
