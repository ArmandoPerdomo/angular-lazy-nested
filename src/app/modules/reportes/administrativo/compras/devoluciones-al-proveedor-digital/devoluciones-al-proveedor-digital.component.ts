import { Component, OnInit } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../abstract/DTO/formatoadmcompras';

@Component({
  selector: 'app-devoluciones-al-proveedor-digital',
  templateUrl: './devoluciones-al-proveedor-digital.component.html',
  styleUrls: ['./devoluciones-al-proveedor-digital.component.css']
})
export class DevolucionesAlProveedorDigitalComponent implements OnInit {
  formatac: FormatoAdmCompras;
  constructor() { }

  ngOnInit() {
    this.formatac = new FormatoAdmCompras();
    this.formatac.type = "DEV_PROV";
    this.formatac.stipodoc = "Devolucion";
    this.formatac.titulo = "Devolución al proveedor"
    this.formatac.titulo_detalle = "Nro.";
  }

}
