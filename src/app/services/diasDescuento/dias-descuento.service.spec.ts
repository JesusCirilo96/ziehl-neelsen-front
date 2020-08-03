import { TestBed } from '@angular/core/testing';

import { DiasDescuentoService } from './dias-descuento.service';

describe('DiasDescuentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiasDescuentoService = TestBed.get(DiasDescuentoService);
    expect(service).toBeTruthy();
  });
});
