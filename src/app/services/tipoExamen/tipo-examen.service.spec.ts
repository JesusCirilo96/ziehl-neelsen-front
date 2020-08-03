import { TestBed } from '@angular/core/testing';

import { TipoExamenService } from './tipo-examen.service';

describe('TipoExamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoExamenService = TestBed.get(TipoExamenService);
    expect(service).toBeTruthy();
  });
});
