import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoViewComponent } from './metodo-view.component';

describe('MetodoViewComponent', () => {
  let component: MetodoViewComponent;
  let fixture: ComponentFixture<MetodoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
