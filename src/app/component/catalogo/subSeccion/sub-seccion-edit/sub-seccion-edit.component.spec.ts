import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSeccionEditComponent } from './sub-seccion-edit.component';

describe('SubSeccionEditComponent', () => {
  let component: SubSeccionEditComponent;
  let fixture: ComponentFixture<SubSeccionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSeccionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSeccionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
