import { TestBed } from '@angular/core/testing';

import { SubSeccionService } from './sub-seccion.service';

describe('SubSeccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubSeccionService = TestBed.get(SubSeccionService);
    expect(service).toBeTruthy();
  });
});
