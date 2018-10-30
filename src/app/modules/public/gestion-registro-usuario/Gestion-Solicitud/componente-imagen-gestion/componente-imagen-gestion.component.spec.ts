import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteImagenGestionComponent } from './componente-imagen-gestion.component';

describe('ComponenteImagenGestionComponent', () => {
  let component: ComponenteImagenGestionComponent;
  let fixture: ComponentFixture<ComponenteImagenGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteImagenGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteImagenGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
