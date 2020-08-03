import { TestBed } from '@angular/core/testing';

import { SubExamenReferenciaService } from './sub-examen-referencia.service';

describe('SubExamenReferenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubExamenReferenciaService = TestBed.get(SubExamenReferenciaService);
    expect(service).toBeTruthy();
  });
});
