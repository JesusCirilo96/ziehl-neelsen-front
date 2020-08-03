import { TestBed } from '@angular/core/testing';

import { RolMenuService } from './rol-menu.service';

describe('RolMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolMenuService = TestBed.get(RolMenuService);
    expect(service).toBeTruthy();
  });
});
