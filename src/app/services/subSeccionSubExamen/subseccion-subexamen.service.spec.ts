import { TestBed } from '@angular/core/testing';

import { SubseccionSubexamenService } from './subseccion-subexamen.service';

describe('SubseccionSubexamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubseccionSubexamenService = TestBed.get(SubseccionSubexamenService);
    expect(service).toBeTruthy();
  });
});
