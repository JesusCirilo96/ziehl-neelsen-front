import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteEditComponent } from './paciente-edit.component';

describe('PacienteEditComponent', () => {
  let component: PacienteEditComponent;
  let fixture: ComponentFixture<PacienteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
