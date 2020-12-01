import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Paciente} from '../../models/Paciente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  API_URI = environment.apiUrl;
  

  constructor(private http: HttpClient) { 

  }

  getPacientes(){
    return this.http.get(`${this.API_URI}/paciente/get/all`);
  }

  getPaciente(id: number){
    return this.http.get(`${this.API_URI}/paciente/get/${id}`);
  }

  savePaciente(paciente: Paciente){
    return this.http.post(`${this.API_URI}/paciente/save`, paciente);
  }

  updatePaciente(updatedPaciente:Paciente): Observable<Paciente>{
    return this.http.post(`${this.API_URI}/paciente/save`, updatedPaciente);
  }
  
}
