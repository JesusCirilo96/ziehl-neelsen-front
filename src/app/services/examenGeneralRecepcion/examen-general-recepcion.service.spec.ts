import { TestBed } from '@angular/core/testing';

import { ExamenGeneralRecepcionService } from './examen-general-recepcion.service';

describe('ExamenGeneralRecepcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralRecepcionService = TestBed.get(ExamenGeneralRecepcionService);
    expect(service).toBeTruthy();
  });
});
