import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReferenciaComponent } from './dialog-referencia.component';

describe('DialogReferenciaComponent', () => {
  let component: DialogReferenciaComponent;
  let fixture: ComponentFixture<DialogReferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
