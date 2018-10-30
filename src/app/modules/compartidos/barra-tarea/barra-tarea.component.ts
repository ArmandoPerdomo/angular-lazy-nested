import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-tarea',
  templateUrl: './barra-tarea.component.html',
  styleUrls: ['./barra-tarea.component.css']
})
export class BarraTareaComponent implements OnInit {

  @Output() PasameElEvento = new EventEmitter();

  @Input() mostrar : Boolean = true;
  
  nombre:string;
  
  constructor() { 
  }

  btPrimero(){
    // Usamos el método emit
    this.nombre= "btPrimero"
    this.PasameElEvento.emit({nombre: this.nombre});
  }

  btAnterior(){
    this.nombre= "btAnterior"
    this.PasameElEvento.emit({nombre: this.nombre});
  }
  
  btSiguiente(){
    this.nombre= "btSiguiente"
    this.PasameElEvento.emit({nombre: this.nombre});
  }
  
  btUltimo(){
    this.nombre= "btUltimo"
    this.PasameElEvento.emit({nombre: this.nombre});
  }
  
  btNuevo(){
    this.nombre= "btNuevo"
    this.PasameElEvento.emit({nombre: this.nombre});
  }
  
  btGuardar(){
    this.nombre= "btGuardar"
    this.PasameElEvento.emit({nombre: this.nombre});
  }
  
  btRestaurar(){
    this.nombre= "btRestaurar"
    this.PasameElEvento.emit({nombre: this.nombre});

  }
  
  btImprimir(){
    this.nombre= "btImprimir"
    this.PasameElEvento.emit({nombre: this.nombre});
  }

  btAgregarRenglon(){
    this.nombre= "btAgregarRenglon"
    this.PasameElEvento.emit({nombre: this.nombre});

  }

  btEliminarRenglon(){
    this.nombre= "btEliminarRenglon"
    this.PasameElEvento.emit({nombre: this.nombre});
  }
  
  btCerrar(){
    this.nombre= "btCerrar"
    this.PasameElEvento.emit({nombre: this.nombre});
  }

  ngOnInit() {
  }

}
