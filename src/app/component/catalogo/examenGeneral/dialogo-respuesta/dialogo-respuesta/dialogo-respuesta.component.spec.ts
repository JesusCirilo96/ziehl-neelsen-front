import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRespuestaComponent } from './dialogo-respuesta.component';

describe('DialogoRespuestaComponent', () => {
  let component: DialogoRespuestaComponent;
  let fixture: ComponentFixture<DialogoRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
