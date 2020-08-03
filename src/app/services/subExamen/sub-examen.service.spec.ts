import { TestBed } from '@angular/core/testing';

import { SubExamenService } from './sub-examen.service';

describe('SubExamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubExamenService = TestBed.get(SubExamenService);
    expect(service).toBeTruthy();
  });
});
