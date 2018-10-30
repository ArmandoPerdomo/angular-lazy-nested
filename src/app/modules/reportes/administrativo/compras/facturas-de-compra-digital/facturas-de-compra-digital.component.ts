import { Component, OnInit } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../abstract/DTO/formatoadmcompras';

@Component({
  selector: 'app-facturas-de-compra-digital',
  templateUrl: './facturas-de-compra-digital.component.html',
  styleUrls: ['./facturas-de-compra-digital.component.css']
})
export class FacturasDeCompraDigitalComponent implements OnInit {
  formatac: FormatoAdmCompras;
  constructor() { }

  ngOnInit() {
    this.formatac = new FormatoAdmCompras();
    this.formatac.type = "COMPRAS";
    this.formatac.stipodoc = "Factura";
    this.formatac.titulo = "Factura de compra"
    this.formatac.titulo_detalle = "Compra Nro.";
  }

}
