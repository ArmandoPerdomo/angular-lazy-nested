import { Component, OnInit } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../abstract/DTO/formatoadmcompras';

@Component({
  selector: 'app-ordenes-de-compra-digital',
  templateUrl: './ordenes-de-compra-digital.component.html',
  styleUrls: ['./ordenes-de-compra-digital.component.css']
})
export class OrdenesDeCompraDigitalComponent implements OnInit {

  formatac: FormatoAdmCompras;

  constructor() { }

  ngOnInit() {
    this.formatac = new FormatoAdmCompras();
    this.formatac.type = "ORDENC";
    this.formatac.stipodoc = "Ordenc";
    this.formatac.titulo = "Órden de compra"
    this.formatac.titulo_detalle = "Orden de compra Nro.";
  }

}
