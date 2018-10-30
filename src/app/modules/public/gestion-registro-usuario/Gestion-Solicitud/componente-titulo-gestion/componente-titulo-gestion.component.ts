import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente-titulo-gestion',
  templateUrl: './componente-titulo-gestion.component.html',
  styleUrls: ['./componente-titulo-gestion.component.css']
})
export class ComponenteTituloGestionComponent implements OnInit {

  model = {
    left: true,
    middle: false,
    right: false
  };
  constructor() { }

  ngOnInit() {
  }

}

