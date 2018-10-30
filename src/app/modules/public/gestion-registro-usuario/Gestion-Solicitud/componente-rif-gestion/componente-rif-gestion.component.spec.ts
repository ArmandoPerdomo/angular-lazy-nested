import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteRifGestionComponent } from './componente-rif-gestion.component';

describe('ComponenteRifGestionComponent', () => {
  let component: ComponenteRifGestionComponent;
  let fixture: ComponentFixture<ComponenteRifGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteRifGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteRifGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
