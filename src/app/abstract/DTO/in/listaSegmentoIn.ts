import { Empresa } from "../../class/user";

export class ListaSegmentoIn{
    sCodigo_D: String;
    sCodigo_H: String;
    sCodigoEmpresa: String;
    sLikeCodigo: String;
    sLikeDescripcion: String;
    iTop: Number;
    sIdioma: String;
    sAutenticador: String

    constructor(){   
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.sCodigo_D= "";
        this.sCodigo_H= "";
        this.sCodigoEmpresa= Empresa.codigoAdministrativo; 
        this.sLikeCodigo= "";
        this.sLikeDescripcion= "";
        this.iTop= 0;
        this.sIdioma= "";
        this.sAutenticador= ""
    }
}