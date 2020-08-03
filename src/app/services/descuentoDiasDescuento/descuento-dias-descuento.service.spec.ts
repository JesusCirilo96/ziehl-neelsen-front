import { TestBed } from '@angular/core/testing';

import { DescuentoDiasDescuentoService } from './descuento-dias-descuento.service';

describe('DescuentoDiasDescuentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescuentoDiasDescuentoService = TestBed.get(DescuentoDiasDescuentoService);
    expect(service).toBeTruthy();
  });
});
