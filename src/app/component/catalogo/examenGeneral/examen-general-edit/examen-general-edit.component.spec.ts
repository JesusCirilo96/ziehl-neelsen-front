import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenGeneralEditComponent } from './examen-general-edit.component';

describe('ExamenGeneralEditComponent', () => {
  let component: ExamenGeneralEditComponent;
  let fixture: ComponentFixture<ExamenGeneralEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenGeneralEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenGeneralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
