import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPerfilComponent } from './dialogo-perfil.component';

describe('DialogoPerfilComponent', () => {
  let component: DialogoPerfilComponent;
  let fixture: ComponentFixture<DialogoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
