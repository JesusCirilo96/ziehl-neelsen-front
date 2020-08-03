import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Paciente} from '../../models/Paciente';
import { Observable } from 'rxjs';
import {AppSettings} from 'src/assets/js/messages';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  API_URI = AppSettings.API_ENDPOINT;
  

  constructor(private http: HttpClient) { 

  }

  getPacientes(){
    return this.http.get(`${this.API_URI}/paciente`);
  }

  getPaciente(id: number){
    return this.http.get(`${this.API_URI}/paciente/${id}`);
  }

  deletePaciente(id:number){
    return this.http.delete(`${this.API_URI}/paciente/${id}`);
  }

  savePaciente(paciente: Paciente){
    return this.http.post(`${this.API_URI}/paciente`, paciente);
  }

  updatePaciente(paciente_id:number, updatedPaciente:Paciente): Observable<Paciente>{
    return this.http.put(`${this.API_URI}/paciente/${paciente_id}`, updatedPaciente);
  }
  
}
