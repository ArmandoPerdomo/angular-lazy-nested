import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPlantillaVentaComponent } from './gestionar-plantilla-venta.component';

describe('GestionarPlantillaVentaComponent', () => {
  let component: GestionarPlantillaVentaComponent;
  let fixture: ComponentFixture<GestionarPlantillaVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarPlantillaVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarPlantillaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
