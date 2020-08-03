import { TestBed } from '@angular/core/testing';

import { ReferenciaService } from './referencia.service';

describe('ReferenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferenciaService = TestBed.get(ReferenciaService);
    expect(service).toBeTruthy();
  });
});
