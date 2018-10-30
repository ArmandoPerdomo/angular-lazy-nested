import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFormularioGestionComponent } from './componente-formulario-gestion.component';

describe('ComponenteFormularioGestionComponent', () => {
  let component: ComponenteFormularioGestionComponent;
  let fixture: ComponentFixture<ComponenteFormularioGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteFormularioGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteFormularioGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
