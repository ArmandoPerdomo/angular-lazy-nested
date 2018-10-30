import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFormularioSolicitudesComponent } from './componente-formulario-solicitudes.component';

describe('ComponenteFormularioSolicitudesComponent', () => {
  let component: ComponenteFormularioSolicitudesComponent;
  let fixture: ComponentFixture<ComponenteFormularioSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteFormularioSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteFormularioSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
