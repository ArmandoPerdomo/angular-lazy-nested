import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraTareaComponent } from './barra-tarea.component';

describe('BarraTareaComponent', () => {
  let component: BarraTareaComponent;
  let fixture: ComponentFixture<BarraTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
