import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Descuento } from '../../models/Descuento';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/assets/js/messages';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getDescuentos() {
    return this.http.get(`${this.API_URI}/descuento/get/all`);
  }

  getDescuento(id: number) {
    return this.http.get(`${this.API_URI}/descuento/${id}`);
  }

  saveDescuento(descuento: Descuento) {
    return this.http.post(`${this.API_URI}/descuento`, descuento);
  }

  updateDescuento(descuento_id: number, updateDescuento: Descuento): Observable<Descuento> {
    return this.http.put(`${this.API_URI}/descuento/${descuento_id}`, updateDescuento);
  }

  /**
 * Consultar si el examen tiene descuento
 * @param id Id del examen
 */
  descuentoExamen(id: number) {
    return this.http.get(`${this.API_URI}/examen/descuento/${id}`);
  }

  descuentoPaquete() {
    return this.http.get(`${this.API_URI}/paquete/descuento/all`);
  }

  saveDescuentoExamen(descuentoExamen: any) {
    return this.http.post(`${this.API_URI}/descuento/examen/save`, descuentoExamen);
  }


  /**
   * Obtenemos los examenes por descuento
   * @param id El id del descuento
   * @returns Objeto con el descuento y el los estudios
   */
  getDescuentoExamen(id: number) {
    return this.http.get(`${this.API_URI}/descuento/examen/get/${id}`);
  }

  deleteDescuento(descuentoId:number){
    return this.http.delete(`${this.API_URI}/descuento/delete/${descuentoId}`);
  }
}
