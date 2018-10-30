import { Empresa } from "../../class/user";

// Data que retorna el Json del servicio Listar cliente
export class ListarClientesIn {

  sCodigo_D: String;
  sCodigo_H: String;
  sCodigoEmpresa: String;
  sLikeCodigo: String;
  sLikeDescripcion: String;
  iTop: String;
  sIdioma: String; 
  bCoincidirCodDes: Boolean;
  sAutenticador: String;
  constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.sCodigo_D= '';
    this.sCodigo_H= '';
    this.sCodigoEmpresa= Empresa.codigoAdministrativo;
    this.sLikeCodigo= '';
    this.sLikeDescripcion= '';
    this.iTop= '';
    this.sIdioma= 'ES-VE'; 
    this.bCoincidirCodDes= false;
    this.sAutenticador= ''
  }
}
