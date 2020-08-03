import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionViewComponent } from './atencion-view.component';

describe('AtencionViewComponent', () => {
  let component: AtencionViewComponent;
  let fixture: ComponentFixture<AtencionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
