import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSeccionViewComponent } from './sub-seccion-view.component';

describe('SubSeccionViewComponent', () => {
  let component: SubSeccionViewComponent;
  let fixture: ComponentFixture<SubSeccionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSeccionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSeccionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
