import { Component, OnInit,ViewChild} from '@angular/core';
import { FormatoContable } from '../../../../../abstract/DTO/formatocontable';

@Component({
  selector: 'app-ganacia-perdida-mensual',
  templateUrl: './ganacia-perdida-mensual.component.html',
  styleUrls: ['./ganacia-perdida-mensual.component.css']
})
export class GanaciaPerdidaMensualComponent implements OnInit {

  @ViewChild(GanaciaPerdidaMensualComponent) hijo: GanaciaPerdidaMensualComponent;
  formato: FormatoContable;

  constructor() {
    this.formato = new FormatoContable();
    this.formato.titulo = 'Ganancias y pérdidas mensual';
    this.formato.type = 'ganperm';
  }

  ngOnInit() {
  }

}
