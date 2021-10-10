import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  API_URI = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  /**
   * Obtenemos los paquetes
   * @returns Lista con los paquetes de descuentos
   */
  getPaquetes() {
    return this.http.get(`${this.API_URI}/paquete/get/all`);
  }

  /**
 * Consultar si el examenes por paquete
 * @param id Id del examen
 */
  paqueteExamen(id: number) {
    return this.http.get(`${this.API_URI}/paquete/examen/${id}`);
  }

  /**
   * Guarda el paquete y los examenes relacionados
   * @param paqueteExamen El descuento con los examenes relacionados
   * @returns 
   */
  savePaqueteExamen(paqueteExamen: any) {
    return this.http.post(`${this.API_URI}/paquete/examen/save`, paqueteExamen);
  }


  /**
   * Obtenemos los examenes por paquete
   * @param id El id del paquete
   * @returns Objeto con el descuento y el los estudios
   */
  getDescuentoExamen(id: number) {
    return this.http.get(`${this.API_URI}/paquete/examen/get/${id}`);
  }

  /**
   * Elimina el descuento y sus examenes relacionados
   * @param paqueteId El id del paquete
   * @returns 
   */
   deletePaquete(paqueteId:number){
    return this.http.delete(`${this.API_URI}/paquete/delete/${paqueteId}`);
  }
}
