import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImportarComponent } from './modal-importar.component';

describe('ModalImportarComponent', () => {
  let component: ModalImportarComponent;
  let fixture: ComponentFixture<ModalImportarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImportarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
