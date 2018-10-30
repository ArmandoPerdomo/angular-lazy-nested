import { Component, OnInit } from '@angular/core';
import { FormatoGerencial } from '../../../../abstract/DTO/formatogerencial';

@Component({
  selector: 'app-todos-gerencial',
  templateUrl: './todos-gerencial.component.html',
  styleUrls: ['./todos-gerencial.component.css']
})
export class TodosGerencialComponent implements OnInit {

  formatoc: FormatoGerencial;
  formatov: FormatoGerencial;
  formatot: FormatoGerencial;

  constructor() {
    this.formatov = new FormatoGerencial();
    this.formatov.title = 'Gerencial';
    this.formatov.sub_title = 'RESUMEN DE VENTAS';
    this.formatov.type = 'venta';
    this.formatov.columna1 = 'Cotización a cliente';
    this.formatov.columna2 = 'Pedidos';
    this.formatov.columna3 = 'Ventas';
    this.formatov.columna4 = 'Devolución';
    this.formatov.grafico = false;
  
    this.formatoc = new FormatoGerencial();
    this.formatoc.sub_title = 'RESUMEN DE COMPRAS';
    this.formatoc.type = 'compra';
    this.formatoc.columna1 = 'Cotización de proveedor';
    this.formatoc.columna2 = 'Órden de compra';
    this.formatoc.columna3 = 'Compra';
    this.formatoc.columna4 = 'Devolución';
    this.formatoc.grafico = false;

    this.formatot = new FormatoGerencial();
    this.formatot .sub_title = 'RESUMEN DE TESORERÍA';
    this.formatot .type = 'tesoreria';
    this.formatot .grafico = false;
    this.formatot .columna1 = 'Cobros';
    this.formatot .columna2 = 'Depósitos';
    this.formatot .columna3 = 'Pagos';
    this.formatot .columna4 = 'Órden de pago';

  }
  ngOnInit() {
  }

}
