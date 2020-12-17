import { TestBed } from '@angular/core/testing';

import { ClasificacionPacienteService } from './clasificacion-paciente.service';

describe('ClasificacionPacienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasificacionPacienteService = TestBed.get(ClasificacionPacienteService);
    expect(service).toBeTruthy();
  });
});
