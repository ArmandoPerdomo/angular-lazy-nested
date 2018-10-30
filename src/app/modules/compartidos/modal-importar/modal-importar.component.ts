import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPlantillaBtimportarComponent } from '../modal-plantilla-btimportar/modal-plantilla-btimportar.component';

@Component({
  selector: 'app-modal-importar',
  templateUrl: './modal-importar.component.html',
  styleUrls: ['./modal-importar.component.css']
})
export class ModalImportarComponent implements OnInit {

  modalImportar : FormGroup;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.modalImportar = this.formBuilder.group({
      vista: []
    });
  }

  vista(): void{
    this.modalImportar.get('vista').value;
    console.log("vista",this.modalImportar.get('vista').value);
    let title : String;
    if( this.modalImportar.get('vista').value ==="cotiCliente"){
      title="Cotizaciones a cliente";
    }else if(this.modalImportar.get('vista').value ==="pedidos"){
      title="Pedidos";
    }else if(this.modalImportar.get('vista').value ==="facVentas"){
      title="Factura de ventas";
    }else if(this.modalImportar.get('vista').value ==="planVentas"){
      title="Plantilla de ventas";
    }
    
    
    
    this.activeModal.close(this.modalImportar.get('vista').value);

    const modalRef = this.modalService.open(ModalPlantillaBtimportarComponent);
    modalRef.componentInstance.title = title;

  }

}
