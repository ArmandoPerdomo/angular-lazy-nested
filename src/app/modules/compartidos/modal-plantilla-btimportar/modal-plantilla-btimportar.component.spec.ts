import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlantillaBtimportarComponent } from './modal-plantilla-btimportar.component';

describe('ModalPlantillaBtimportarComponent', () => {
  let component: ModalPlantillaBtimportarComponent;
  let fixture: ComponentFixture<ModalPlantillaBtimportarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPlantillaBtimportarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlantillaBtimportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
