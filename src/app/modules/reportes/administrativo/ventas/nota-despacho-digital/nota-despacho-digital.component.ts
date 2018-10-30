import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-nota-despacho-digital',
  templateUrl: './nota-despacho-digital.component.html',
  styleUrls: ['./nota-despacho-digital.component.css']
})
export class NotaDespachoDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;

  constructor() { }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "NOTA_D";
    this.formatav.stipodoc = "NtDp";
    this.formatav.titulo = "Nota de despacho digital";
    this.formatav.titulo_detalle = "Guía de despacho nro.";
  }

}
