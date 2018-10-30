import { Component, OnInit, ViewChild } from '@angular/core';
import { FormatoContable } from '../../../../../abstract/DTO/formatocontable';

@Component({
  selector: 'app-balance-comprobacion',
  templateUrl: './balance-comprobacion.component.html',
  styleUrls: ['./balance-comprobacion.component.css']
})
export class BalanceComprobacionComponent implements OnInit {
  @ViewChild(BalanceComprobacionComponent) hijo: BalanceComprobacionComponent;

  formato: FormatoContable;

  constructor() {
    this.formato = new FormatoContable();
    this.formato.titulo = 'Balance de Comprobación';
    this.formato.type = 'comp';

  }

  ngOnInit() {
    
  }

}
