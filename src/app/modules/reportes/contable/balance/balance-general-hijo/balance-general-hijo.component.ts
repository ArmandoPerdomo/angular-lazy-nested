import { Component, OnInit, ViewChild } from '@angular/core';
import { FormatoContable } from '../../../../../abstract/DTO/formatocontable';

@Component({
  selector: 'app-balance-general-hijo',
  templateUrl: './balance-general-hijo.component.html',
  styleUrls: ['./balance-general-hijo.component.css']
})
export class BalanceGeneralHijoComponent implements OnInit {

  @ViewChild(BalanceGeneralHijoComponent) hijo: BalanceGeneralHijoComponent;
  formato: FormatoContable;

  constructor() {
    this.formato = new FormatoContable();
    this.formato.titulo = 'Balance general';
    this.formato.type = 'gnral';

  }


  ngOnInit() {
  }

}
