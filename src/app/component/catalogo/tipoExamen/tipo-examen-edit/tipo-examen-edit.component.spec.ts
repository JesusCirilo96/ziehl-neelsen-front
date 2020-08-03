import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoExamenEditComponent } from './tipo-examen-edit.component';

describe('TipoExamenEditComponent', () => {
  let component: TipoExamenEditComponent;
  let fixture: ComponentFixture<TipoExamenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoExamenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoExamenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
