import { TestBed } from '@angular/core/testing';

import { PaqueteService } from './paquete.service';

describe('PaqueteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaqueteService = TestBed.get(PaqueteService);
    expect(service).toBeTruthy();
  });
});
