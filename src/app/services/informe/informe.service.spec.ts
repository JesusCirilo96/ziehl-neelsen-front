import { TestBed } from '@angular/core/testing';

import { InformeService } from './informe.service';

describe('InformeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformeService = TestBed.get(InformeService);
    expect(service).toBeTruthy();
  });
});
