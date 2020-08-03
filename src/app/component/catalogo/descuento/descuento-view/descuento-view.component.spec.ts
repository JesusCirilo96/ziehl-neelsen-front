import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoViewComponent } from './descuento-view.component';

describe('DescuentoViewComponent', () => {
  let component: DescuentoViewComponent;
  let fixture: ComponentFixture<DescuentoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
