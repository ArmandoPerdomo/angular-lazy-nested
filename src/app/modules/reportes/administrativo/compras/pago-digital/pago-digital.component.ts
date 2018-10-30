import { Component, OnInit } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../abstract/DTO/formatoadmcompras';

@Component({
  selector: 'app-pago-digital',
  templateUrl: './pago-digital.component.html',
  styleUrls: ['./pago-digital.component.css']
})
export class PagoDigitalComponent implements OnInit {

  formatac: FormatoAdmCompras;

  constructor() { }

  ngOnInit() {
    this.formatac = new FormatoAdmCompras();
    this.formatac.type = "PAGO";
    this.formatac.stipodoc = "Pago";
    this.formatac.titulo = "Pago digital"
    this.formatac.titulo_detalle = "Nro. de Pago";
  }

}
