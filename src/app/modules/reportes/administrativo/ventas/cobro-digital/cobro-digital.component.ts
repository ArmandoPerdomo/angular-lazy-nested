import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-cobro-digital',
  templateUrl: './cobro-digital.component.html',
  styleUrls: ['./cobro-digital.component.css']
})
export class CobroDigitalComponent implements OnInit {

  formatav: FormatoAdmVentas;

  constructor() { }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "COBRO";
    this.formatav.stipodoc = "Cobr";
    this.formatav.titulo = "Cobro digital"
    this.formatav.titulo_detalle = "Nro. de cobro"
  }

}
