import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoEditComponent } from './descuento-edit.component';

describe('DescuentoEditComponent', () => {
  let component: DescuentoEditComponent;
  let fixture: ComponentFixture<DescuentoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
