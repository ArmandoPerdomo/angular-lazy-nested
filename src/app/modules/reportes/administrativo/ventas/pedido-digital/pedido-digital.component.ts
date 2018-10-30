import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-pedido-digital',
  templateUrl: './pedido-digital.component.html',
  styleUrls: ['./pedido-digital.component.css']
})
export class PedidoDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;
  constructor() { }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "PEDIDO";
    this.formatav.stipodoc = "Pedi";
    this.formatav.titulo = "Pedido digital"
    this.formatav.titulo_detalle = "Pedido nro.";
  }

}
