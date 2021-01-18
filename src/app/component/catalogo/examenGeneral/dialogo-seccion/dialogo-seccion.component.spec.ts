import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSeccionComponent } from './dialogo-seccion.component';

describe('DialogoSeccionComponent', () => {
  let component: DialogoSeccionComponent;
  let fixture: ComponentFixture<DialogoSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
