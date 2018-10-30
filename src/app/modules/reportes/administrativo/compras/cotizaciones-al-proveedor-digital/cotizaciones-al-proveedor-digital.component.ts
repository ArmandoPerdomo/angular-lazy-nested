import { Component, OnInit } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../abstract/DTO/formatoadmcompras';

@Component({
  selector: 'app-cotizaciones-al-proveedor-digital',
  templateUrl: './cotizaciones-al-proveedor-digital.component.html',
  styleUrls: ['./cotizaciones-al-proveedor-digital.component.css']
})
export class CotizacionesAlProveedorDigitalComponent implements OnInit {
  formatac: FormatoAdmCompras;
  constructor() { }

  ngOnInit() {
    this.formatac = new FormatoAdmCompras();
    this.formatac.type = "COTIZ_P";
    this.formatac.stipodoc = "Cotizaciones";
    this.formatac.titulo = "Cotización al proveedor"
    this.formatac.titulo_detalle = "Cotización nro.";

  }

}
