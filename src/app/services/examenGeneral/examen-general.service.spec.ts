import { TestBed } from '@angular/core/testing';

import { ExamenGeneralService } from './examen-general.service';

describe('ExamenGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralService = TestBed.get(ExamenGeneralService);
    expect(service).toBeTruthy();
  });
});
