import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';


@Component({
  selector: 'app-devoluciones-digital',
  templateUrl: './devoluciones-digital.component.html',
  styleUrls: ['./devoluciones-digital.component.css']
})
export class DevolucionesDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;
  constructor() {

  }
  ngOnInit(){
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "DEV_CLI";
    this.formatav.stipodoc = "PlDev";
    this.formatav.titulo = "Devolución digital";
    this.formatav.titulo_detalle = "Devolución nro.";
  }


}
