import { Component, OnInit,ViewChild } from '@angular/core';
import { FormatoContable } from '../../../../../abstract/DTO/formatocontable';

@Component({
  selector: 'app-balance-general-mensual',
  templateUrl: './balance-general-mensual.component.html',
  styleUrls: ['./balance-general-mensual.component.css']
})
export class BalanceGeneralMensualComponent implements OnInit {

  @ViewChild(BalanceGeneralMensualComponent) hijo: BalanceGeneralMensualComponent;

  formato: FormatoContable;

  constructor() {
    this.formato = new FormatoContable();
    this.formato.titulo = 'Balance general comparativo';
    this.formato.type = 'gnralm';
  }
  ngOnInit() {
  }

}
