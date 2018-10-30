import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-factura-digital',
  templateUrl: './factura-digital.component.html',
  styleUrls: ['./factura-digital.component.css']
})
export class FacturaDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;

  constructor() { }

  ngOnInit() {

    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "FAC";
    this.formatav.stipodoc = "Fact";
    this.formatav.titulo = "Factura digital";
    this.formatav.titulo_detalle = "Nro. control";

  }

}
