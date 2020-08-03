import { TestBed } from '@angular/core/testing';

import { RolSubmenuService } from './rol-submenu.service';

describe('RolSubmenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolSubmenuService = TestBed.get(RolSubmenuService);
    expect(service).toBeTruthy();
  });
});
