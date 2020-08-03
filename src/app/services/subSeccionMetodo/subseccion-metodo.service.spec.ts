import { TestBed } from '@angular/core/testing';

import { SubseccionMetodoService } from './subseccion-metodo.service';

describe('SubseccionMetodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubseccionMetodoService = TestBed.get(SubseccionMetodoService);
    expect(service).toBeTruthy();
  });
});
