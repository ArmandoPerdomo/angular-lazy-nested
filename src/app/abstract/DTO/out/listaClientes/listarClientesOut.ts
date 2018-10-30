import { Lista } from './lista';
// Data que se envia al Json del servicio Listar cliente
export class ListarClienteOut {
  Lista: Array<Lista>;
  sMensajeError: String ;

 constructor(){
   this.Lista = [];
   this.sMensajeError = "";
 }

}
