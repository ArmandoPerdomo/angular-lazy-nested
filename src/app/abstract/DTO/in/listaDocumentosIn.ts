import { Empresa } from "../../class/user";

export class ListaDocumentosIn{
    sTipoDoc: String;
    sCodigo_Cliente_D: String;
    sCodigo_Cliente_H: String;
    sCodigo_Vendedor_D: String;
    sCodigo_Vendedor_H: String;
    sFecha_D: String;
    sFecha_H: String;
    iNumero_D: Number;
    iNumero_H: Number;
    sCodigoEmpresa: String;
    sIdioma: String;
    sAutenticador: String;

    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.sTipoDoc = "";
        this.sCodigo_Cliente_D = "";
        this.sCodigo_Cliente_H = "";
        this.sCodigo_Vendedor_D="";
        this.sCodigo_Vendedor_H="";
        this.sFecha_D="";
        this.sFecha_H="";
        this.iNumero_D=0;
        this.iNumero_H=0;
        this.sCodigoEmpresa= Empresa.codigoAdministrativo; 
        this.sIdioma="ES-VE";
    }
}