import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HematicaComponent } from './hematica.component';

describe('HematicaComponent', () => {
  let component: HematicaComponent;
  let fixture: ComponentFixture<HematicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HematicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
