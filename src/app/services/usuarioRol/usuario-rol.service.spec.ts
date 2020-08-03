import { TestBed } from '@angular/core/testing';

import { UsuarioRolService } from './usuario-rol.service';

describe('UsuarioRolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioRolService = TestBed.get(UsuarioRolService);
    expect(service).toBeTruthy();
  });
});
