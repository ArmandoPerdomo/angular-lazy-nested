import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteEmpresasGestionComponent } from './componente-empresas-gestion.component';

describe('ComponenteEmpresasGestionComponent', () => {
  let component: ComponenteEmpresasGestionComponent;
  let fixture: ComponentFixture<ComponenteEmpresasGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteEmpresasGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteEmpresasGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
