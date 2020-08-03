import { TestBed } from '@angular/core/testing';

import { MetodoService } from './metodo.service';

describe('MetodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetodoService = TestBed.get(MetodoService);
    expect(service).toBeTruthy();
  });
});
