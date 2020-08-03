import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExamenViewComponent } from './tipo-examen-view.component';

describe('TipoExamenViewComponent', () => {
  let component: TipoExamenViewComponent;
  let fixture: ComponentFixture<TipoExamenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoExamenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExamenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
