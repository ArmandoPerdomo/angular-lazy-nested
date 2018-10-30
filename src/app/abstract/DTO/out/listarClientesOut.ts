// Data que se envia al Json del servicio Listar cliente
export class ListarClienteOut {
  [x: string]: any;
  sCodigo_D: String;
  sCodigo_H: String ;
  sCodigoEmpresa: String;
  sLikeCodigo: String;
  sLikeDescripcion: String;
  iTop: String;
  sIdioma: String;
  bCoincidirCodDes: Boolean;
  sAutenticador: String;
}
