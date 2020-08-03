import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionViewComponent } from './seccion-view.component';

describe('SeccionViewComponent', () => {
  let component: SeccionViewComponent;
  let fixture: ComponentFixture<SeccionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
