import { Component, OnInit } from '@angular/core';
import { FormatoAdmVentas } from '../../../../../abstract/DTO/formatoadmventas';

@Component({
  selector: 'app-plantilla-digital',
  templateUrl: './plantilla-digital.component.html',
  styleUrls: ['./plantilla-digital.component.css']
})
export class PlantillaDigitalComponent implements OnInit {
  formatav: FormatoAdmVentas;

  constructor() { }

  ngOnInit() {
    this.formatav = new FormatoAdmVentas();
    this.formatav.type = "PLAVENT";
    this.formatav.stipodoc = "Plvta";
    this.formatav.titulo = "Plantilla de venta digital";
    this.formatav.titulo_detalle = "Plantilla nro.";
  }

}
