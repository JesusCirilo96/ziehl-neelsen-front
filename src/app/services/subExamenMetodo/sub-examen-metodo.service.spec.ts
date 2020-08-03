import { TestBed } from '@angular/core/testing';

import { SubExamenMetodoService } from './sub-examen-metodo.service';

describe('SubExamenMetodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubExamenMetodoService = TestBed.get(SubExamenMetodoService);
    expect(service).toBeTruthy();
  });
});
