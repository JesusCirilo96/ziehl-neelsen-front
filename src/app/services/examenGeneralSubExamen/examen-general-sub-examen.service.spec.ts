import { TestBed } from '@angular/core/testing';

import { ExamenGeneralSubExamenService } from './examen-general-sub-examen.service';

describe('ExamenGeneralSubExamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamenGeneralSubExamenService = TestBed.get(ExamenGeneralSubExamenService);
    expect(service).toBeTruthy();
  });
});
