import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ListaDocumentosOut } from '../../../../../../abstract/DTO/out/listaDocumentos/listaDocumentosOut';

@Component({
  selector: 'app-listado-plan-dev-clientes',
  templateUrl: './listado-plan-dev-clientes.html',
  styleUrls: ['./listado-plan-dev-clientes.css']
})
export class ListaPlanillaDevClientesComponent implements OnInit,OnChanges {
    @Input() ListaDocumentosClientes: ListaDocumentosOut;
    @Input() registro: Boolean = false;
    @Output() numEvent = new EventEmitter<String>();
    @Output() acceptEvent = new EventEmitter();

    constructor() {

    }

    ngOnChanges(){
    
    }
    numEventEmit(codigo: String){
      this.numEvent.emit(codigo);
    }
    
    doubleclick(){
      this.acceptEvent.emit();
    }
  ngOnInit() {

  }

  filaSeleccionada(event: any){
    let x=document.getElementsByClassName("gg");
    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute("class","gg fondoNormal");
    }

    event.setAttribute("class","gg fondoDeClic");
  }

}

