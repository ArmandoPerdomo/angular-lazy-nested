import { Empresa } from "../../../class/user";

//? En esta entrada estan varios formatos de venta y de compra, varia dependiendo del
//! TIPO DE FORMATO

export class RepAdmFormatosIn {
 Co_Emp: String;

 Numero: Number;

  NumeroNCR: Number;

 Co_ven: String;

  Documento: String;

  Autenticacion: String;

  
  constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp = Empresa.codigoAdministrativo; 
    this.Co_ven = "";
    this.Autenticacion = "";
    this.NumeroNCR = 0;
    this.Numero = 0;
    this.Documento = "";
  }
  


}








