import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAyudaArtComponent } from './modal-ayuda-art.component';

describe('ModalAyudaArtComponent', () => {
  let component: ModalAyudaArtComponent;
  let fixture: ComponentFixture<ModalAyudaArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAyudaArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAyudaArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
