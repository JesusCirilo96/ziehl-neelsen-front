import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  /**
   * Obtenemos los descuentos
   * @returns Lista con los descuentos
   */
  getDescuentos() {
    return this.http.get(`${this.API_URI}/descuento/get/all`);
  }

  /**
 * Consultar si el examen tiene descuento
 * @param id Id del examen
 */
  descuentoExamen(id: number) {
    return this.http.get(`${this.API_URI}/examen/descuento/${id}`);
  }

  /**
   * Guarda el descuento y los examenes relacionados
   * @param descuentoExamen El descuento con los examenes relacionados
   * @returns 
   */
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

  /**
   * Elimina el descuento y sus examenes relacionados
   * @param descuentoId El id del descuento
   * @returns 
   */
  deleteDescuento(descuentoId:number){
    return this.http.delete(`${this.API_URI}/descuento/delete/${descuentoId}`);
  }
}
