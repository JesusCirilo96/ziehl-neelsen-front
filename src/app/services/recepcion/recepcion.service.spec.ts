import { TestBed } from '@angular/core/testing';

import { RecepcionService } from './recepcion.service';

describe('RecepcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecepcionService = TestBed.get(RecepcionService);
    expect(service).toBeTruthy();
  });
});
