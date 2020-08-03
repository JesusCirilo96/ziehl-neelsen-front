import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoEditComponent } from './metodo-edit.component';

describe('MetodoEditComponent', () => {
  let component: MetodoEditComponent;
  let fixture: ComponentFixture<MetodoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
