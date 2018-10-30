import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionDashboardComponent } from './configuracion-dashboard.component';

describe('ConfiguracionDashboardComponent', () => {
  let component: ConfiguracionDashboardComponent;
  let fixture: ComponentFixture<ConfiguracionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
