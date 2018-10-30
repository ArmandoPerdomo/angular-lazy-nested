import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteTituloComponent } from './componente-titulo.component';

describe('ComponenteTituloComponent', () => {
  let component: ComponenteTituloComponent;
  let fixture: ComponentFixture<ComponenteTituloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteTituloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
