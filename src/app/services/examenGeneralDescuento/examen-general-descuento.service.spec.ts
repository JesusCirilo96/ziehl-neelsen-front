import { TestBed } from '@angular/core/testing';

import { ExamenGeneralDescuentoService } from './examen-general-descuento.service';

describe('ExamenGeneralDescuentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralDescuentoService = TestBed.get(ExamenGeneralDescuentoService);
    expect(service).toBeTruthy();
  });
});
