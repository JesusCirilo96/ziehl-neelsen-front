import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionPacienteViewComponent } from './clasificacion-paciente-view.component';

describe('ClasificacionPacienteViewComponent', () => {
  let component: ClasificacionPacienteViewComponent;
  let fixture: ComponentFixture<ClasificacionPacienteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificacionPacienteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionPacienteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
