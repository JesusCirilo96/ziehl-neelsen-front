import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionPacienteEditComponent } from './clasificacion-paciente-edit.component';

describe('ClasificacionPacienteEditComponent', () => {
  let component: ClasificacionPacienteEditComponent;
  let fixture: ComponentFixture<ClasificacionPacienteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificacionPacienteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionPacienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
