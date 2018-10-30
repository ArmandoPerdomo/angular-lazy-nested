import { Component, OnInit } from '@angular/core';
import { FormatoGerencial } from '../../../../../abstract/DTO/formatogerencial';

@Component({
  selector: 'app-todos-administrativo',
  templateUrl: './todos-administrativo.component.html',
  styleUrls: ['./todos-administrativo.component.css']
})
export class TodosAdministrativoComponent implements OnInit {

  formato: FormatoGerencial;

  constructor() {
    this.formato = new FormatoGerencial();
    this.formato.title = 'Administrativo gerencial';
    this.formato.sub_title = 'RESUMEN DE TESORERÍA';
    this.formato.type = 'tesoreria';
    this.formato.grafico = false;
    this.formato.columna1 = 'Cobros';
    this.formato.columna2 = 'Depósitos';
    this.formato.columna3 = 'Pagos';
    this.formato.columna4 = 'Órden de pago';

  }
  ngOnInit() {
  }

}
