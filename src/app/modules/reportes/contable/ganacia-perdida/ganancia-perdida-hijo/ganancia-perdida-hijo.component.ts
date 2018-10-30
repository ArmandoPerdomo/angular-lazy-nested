import { Component, OnInit, ViewChild} from '@angular/core';
import { FormatoContable } from '../../../../../abstract/DTO/formatocontable';

@Component({
  selector: 'app-ganancia-perdida-hijo',
  templateUrl: './ganancia-perdida-hijo.component.html',
  styleUrls: ['./ganancia-perdida-hijo.component.css']
})
export class GananciaPerdidaHijoComponent implements OnInit {

  @ViewChild(GananciaPerdidaHijoComponent) hijo: GananciaPerdidaHijoComponent;
  formato: FormatoContable;

  constructor() {
    this.formato = new FormatoContable();
    this.formato.titulo = 'Ganancias y pérdidas';
    this.formato.type = 'ganper';

  }

  ngOnInit() {
  }

}
