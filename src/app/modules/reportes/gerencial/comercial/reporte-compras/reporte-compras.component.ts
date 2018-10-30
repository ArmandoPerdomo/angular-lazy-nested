import { Component, OnInit } from '@angular/core';
import { FormatoGerencial } from '../../../../../abstract/DTO/formatogerencial';

@Component({
  selector: 'app-reporte-compras',
  templateUrl: './reporte-compras.component.html',
  styleUrls: ['./reporte-compras.component.css']
})
export class ReporteComprasComponent implements OnInit {

  formato: FormatoGerencial;

  constructor() {
    this.formato = new FormatoGerencial();
    this.formato.title = 'Compras gerencial';
    this.formato.sub_title = 'RESUMEN DE COMPRAS';
    this.formato.type = 'compra';
    this.formato.columna1 = 'Cotización de proveedor';
    this.formato.columna2 = 'Órden de compra';
    this.formato.columna3 = 'Compra';
    this.formato.columna4 = 'Devolución';
  }

  ngOnInit() {
  }

}
