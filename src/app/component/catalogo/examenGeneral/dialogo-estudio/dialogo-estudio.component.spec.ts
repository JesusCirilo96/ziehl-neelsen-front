import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEstudioComponent } from './dialogo-estudio.component';

describe('DialogoEstudioComponent', () => {
  let component: DialogoEstudioComponent;
  let fixture: ComponentFixture<DialogoEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
