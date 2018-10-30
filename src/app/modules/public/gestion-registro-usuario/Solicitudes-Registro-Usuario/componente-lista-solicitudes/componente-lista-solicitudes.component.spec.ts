import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteListaSolicitudesComponent } from './componente-lista-solicitudes.component';

describe('ComponenteListaSolicitudesComponent', () => {
  let component: ComponenteListaSolicitudesComponent;
  let fixture: ComponentFixture<ComponenteListaSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteListaSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteListaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
