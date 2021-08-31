import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoDialogoComponent } from './descuento-dialogo.component';

describe('DescuentoDialogoComponent', () => {
  let component: DescuentoDialogoComponent;
  let fixture: ComponentFixture<DescuentoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
