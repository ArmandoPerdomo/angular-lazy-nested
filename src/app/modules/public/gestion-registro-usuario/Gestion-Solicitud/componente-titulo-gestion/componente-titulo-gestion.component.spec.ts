import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteTituloGestionComponent } from './componente-titulo-gestion.component';

describe('ComponenteTituloGestionComponent', () => {
  let component: ComponenteTituloGestionComponent;
  let fixture: ComponentFixture<ComponenteTituloGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteTituloGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteTituloGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
