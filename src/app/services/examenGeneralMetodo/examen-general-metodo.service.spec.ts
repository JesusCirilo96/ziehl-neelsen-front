import { TestBed } from '@angular/core/testing';

import { ExamenGeneralMetodoService } from './examen-general-metodo.service';

describe('ExamenGeneralMetodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralMetodoService = TestBed.get(ExamenGeneralMetodoService);
    expect(service).toBeTruthy();
  });
});
