import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExamenEditComponent } from './sub-examen-edit.component';

describe('SubExamenEditComponent', () => {
  let component: SubExamenEditComponent;
  let fixture: ComponentFixture<SubExamenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubExamenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubExamenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
