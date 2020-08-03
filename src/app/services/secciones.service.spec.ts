import { TestBed } from '@angular/core/testing';

import { SeccionesService } from './secciones.service';

describe('SeccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeccionesService = TestBed.get(SeccionesService);
    expect(service).toBeTruthy();
  });
});
