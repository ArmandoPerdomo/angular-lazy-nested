import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsuarioIndexComponent } from './gestion-usuario-index.component';

describe('GestionUsuarioIndexComponent', () => {
  let component: GestionUsuarioIndexComponent;
  let fixture: ComponentFixture<GestionUsuarioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionUsuarioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUsuarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
