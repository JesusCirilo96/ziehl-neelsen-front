import { TestBed } from '@angular/core/testing';

import { ExamenGeneralReferenciaService } from './examen-general-referencia.service';

describe('ExamenGeneralReferenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralReferenciaService = TestBed.get(ExamenGeneralReferenciaService);
    expect(service).toBeTruthy();
  });
});
