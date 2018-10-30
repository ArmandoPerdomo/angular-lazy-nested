import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasSruComponent } from './vistas-sru.component';

describe('VistasSruComponent', () => {
  let component: VistasSruComponent;
  let fixture: ComponentFixture<VistasSruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistasSruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistasSruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
