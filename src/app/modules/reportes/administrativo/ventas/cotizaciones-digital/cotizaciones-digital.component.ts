import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-cotizaciones-digital',
  templateUrl: './cotizaciones-digital.component.html',
  styleUrls: ['./cotizaciones-digital.component.css']
})
export class CotizacionesDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;

  constructor() { }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "COTIZ_C";
    this.formatav.stipodoc = "Coti";
    this.formatav.titulo = "Cotización digital"
    this.formatav.titulo_detalle =  "Cotización nro."
  }

}
