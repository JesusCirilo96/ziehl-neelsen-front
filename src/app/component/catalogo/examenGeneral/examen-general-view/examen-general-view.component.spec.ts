import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenGeneralViewComponent } from './examen-general-view.component';

describe('ExamenGeneralViewComponent', () => {
  let component: ExamenGeneralViewComponent;
  let fixture: ComponentFixture<ExamenGeneralViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenGeneralViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenGeneralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
