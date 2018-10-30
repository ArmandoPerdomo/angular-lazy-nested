import { Component, OnInit } from '@angular/core';
import { FormatoGerencial } from '../../../../../abstract/DTO/formatogerencial';


@Component({
  selector: 'app-tesoreria',
  templateUrl: './tesoreria.component.html',
  styleUrls: ['./tesoreria.component.css'],
})
export class TesoreriaComponent implements OnInit {
  formato: FormatoGerencial;

  constructor() {
    this.formato = new FormatoGerencial();
    this.formato.title = 'Tesorería gerencial';
    this.formato.sub_title = 'RESUMEN DE TESORERÍA';
    this.formato.type = 'tesoreria';
    this.formato.columna1 = 'Cobros';
    this.formato.columna2 = 'Depósitos';
    this.formato.columna3 = 'Pagos';
    this.formato.columna4 = 'Órden de pago';
  }
  ngOnInit() {
  }
}
