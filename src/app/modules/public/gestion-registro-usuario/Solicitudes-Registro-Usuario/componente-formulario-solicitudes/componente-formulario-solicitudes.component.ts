import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-componente-formulario-solicitudes',
  templateUrl: './componente-formulario-solicitudes.component.html',
  styleUrls: ['./componente-formulario-solicitudes.component.css']
})
export class ComponenteFormularioSolicitudesComponent implements OnInit {
  model;

  constructor() { }

  ngOnInit() {
  }

}
