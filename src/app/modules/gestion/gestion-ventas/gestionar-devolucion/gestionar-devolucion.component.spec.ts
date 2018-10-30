import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarDevolucionComponent } from './gestionar-devolucion.component';

describe('GestionarDevolucionComponent', () => {
  let component: GestionarDevolucionComponent;
  let fixture: ComponentFixture<GestionarDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
