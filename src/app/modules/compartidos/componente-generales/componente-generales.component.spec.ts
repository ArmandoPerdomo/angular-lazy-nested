import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteGeneralesComponent } from './componente-generales.component';

describe('ComponenteGeneralesComponent', () => {
  let component: ComponenteGeneralesComponent;
  let fixture: ComponentFixture<ComponenteGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
