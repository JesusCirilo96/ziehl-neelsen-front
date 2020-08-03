import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionEditComponent } from './seccion-edit.component';

describe('SeccionEditComponent', () => {
  let component: SeccionEditComponent;
  let fixture: ComponentFixture<SeccionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
