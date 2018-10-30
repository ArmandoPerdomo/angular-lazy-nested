import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
 selector: 'app-resumen-factura',
 templateUrl: './resumen-factura.component.html',
 styleUrls: ['./resumen-factura.component.css']
})
export class ResumenFacturaComponent implements OnInit {
  formatav: FormatoAdmVentas;

  constructor() {
  }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "RESUMENFACT";
    this.formatav.stipodoc = "Fact";
    this.formatav.titulo = "Resumen factura";
    this.formatav.titulo_detalle = "Nro. ";
  }
}
