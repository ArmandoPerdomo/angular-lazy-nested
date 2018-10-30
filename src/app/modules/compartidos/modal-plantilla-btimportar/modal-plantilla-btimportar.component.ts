import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-plantilla-btimportar',
  templateUrl: './modal-plantilla-btimportar.component.html',
  styleUrls: ['./modal-plantilla-btimportar.component.css']
})
export class ModalPlantillaBtimportarComponent implements OnInit {

  componenteModal : FormGroup;

  @Input() title : String;

  //@Output mostrarTitle : Ev

  constructor(private formBuilder: FormBuilder,private modalService: NgbModal, 
    public activeModal: NgbActiveModal) { 
      
    }

  ngOnInit() {
    this.componenteModal = this.formBuilder.group({
      
    });
  }

}
