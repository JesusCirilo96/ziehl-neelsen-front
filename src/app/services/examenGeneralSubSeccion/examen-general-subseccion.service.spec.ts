import { TestBed } from '@angular/core/testing';

import { ExamenGeneralSubseccionService } from './examen-general-subseccion.service';

describe('ExamenGeneralSubseccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralSubseccionService = TestBed.get(ExamenGeneralSubseccionService);
    expect(service).toBeTruthy();
  });
});
