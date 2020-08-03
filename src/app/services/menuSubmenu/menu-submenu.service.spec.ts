import { TestBed } from '@angular/core/testing';

import { MenuSubmenuService } from './menu-submenu.service';

describe('MenuSubmenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuSubmenuService = TestBed.get(MenuSubmenuService);
    expect(service).toBeTruthy();
  });
});
