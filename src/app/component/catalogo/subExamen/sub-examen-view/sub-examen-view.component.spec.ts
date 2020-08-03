import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExamenViewComponent } from './sub-examen-view.component';

describe('SubExamenViewComponent', () => {
  let component: SubExamenViewComponent;
  let fixture: ComponentFixture<SubExamenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubExamenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubExamenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
