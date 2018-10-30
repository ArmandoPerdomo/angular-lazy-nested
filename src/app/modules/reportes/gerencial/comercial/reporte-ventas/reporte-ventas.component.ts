import { Component, OnInit } from '@angular/core';
import { FormatoGerencial } from '../../../../../abstract/DTO/formatogerencial';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  formato: FormatoGerencial;

  constructor() {
    this.formato = new FormatoGerencial();
    this.formato.title = 'Ventas gerencial';
    this.formato.sub_title = 'RESUMEN DE VENTAS';
    this.formato.type = 'venta';
    this.formato.columna1 = 'Cotización a cliente';
    this.formato.columna2 = 'Pedidos';
    this.formato.columna3 = 'Ventas';
    this.formato.columna4 = 'Devolución';
  }


  ngOnInit() {
  }

}
