import { Component, OnInit } from '@angular/core';
import { FormatoGerencial } from '../../../../../abstract/DTO/formatogerencial';

@Component({
  selector: 'app-todos-comercial',
  templateUrl: './todos-comercial.component.html',
  styleUrls: ['./todos-comercial.component.css']
})
export class TodosComercialComponent implements OnInit {

  formatoc: FormatoGerencial;
  formatov: FormatoGerencial;

  constructor() {
    this.formatov = new FormatoGerencial();
    this.formatov.title = 'Comercial gerencial';
    this.formatov.sub_title = 'RESUMEN DE VENTAS';
    this.formatov.type = 'venta';
    this.formatov.columna1 = 'Cotización a cliente';
    this.formatov.columna2 = 'Pedidos';
    this.formatov.columna3 = 'Ventas';
    this.formatov.columna4 = 'Devolución';
    this.formatov.grafico = false;
  
    this.formatoc = new FormatoGerencial();
    this.formatoc.title = '';
    this.formatoc.sub_title = 'RESUMEN DE COMPRAS';
    this.formatoc.type = 'compra';
    this.formatoc.columna1 = 'Cotización de proveedor';
    this.formatoc.columna2 = 'Órden de compra';
    this.formatoc.columna3 = 'Compra';
    this.formatoc.columna4 = 'Devolución';
    this.formatoc.grafico = false;

  }


  ngOnInit() {
  }

}
