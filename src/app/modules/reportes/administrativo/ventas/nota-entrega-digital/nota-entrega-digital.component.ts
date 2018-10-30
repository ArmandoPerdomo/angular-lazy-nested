import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-nota-entrega-digital',
  templateUrl: './nota-entrega-digital.component.html',
  styleUrls: ['./nota-entrega-digital.component.css']
})
export class NotaEntregaDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;

  constructor() { }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "NOTA_E";
    this.formatav.stipodoc = "NtEn";
    this.formatav.titulo = "Nota de entrega digital";
    this.formatav.titulo_detalle = "Nota de entrega";
  }

}
