import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteAdicionalesComponent } from './componente-adicionales.component';

describe('ComponenteAdicionalesComponent', () => {
  let component: ComponenteAdicionalesComponent;
  let fixture: ComponentFixture<ComponenteAdicionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteAdicionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
