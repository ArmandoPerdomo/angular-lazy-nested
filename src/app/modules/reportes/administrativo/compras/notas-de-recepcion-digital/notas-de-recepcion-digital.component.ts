import { Component, OnInit } from '@angular/core';
import { FormatoAdmCompras } from '../../../../../abstract/DTO/formatoadmcompras';

@Component({
  selector: 'app-notas-de-recepcion-digital',
  templateUrl: './notas-de-recepcion-digital.component.html',
  styleUrls: ['./notas-de-recepcion-digital.component.css']
})
export class NotasDeRecepcionDigitalComponent implements OnInit {
  formatac: FormatoAdmCompras;
  constructor() { }

  ngOnInit() {
    this.formatac = new FormatoAdmCompras();
    this.formatac.type = "NOTA_R";
    this.formatac.stipodoc = "Nota";
    this.formatac.titulo = "Nota de recepción"
    this.formatac.titulo_detalle = "Nro.";
  }

}
