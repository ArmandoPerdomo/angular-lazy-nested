import { Empresa } from "../../../class/user";

export class RepAdmFormatosCxcClientesIn {
    
    
    Co_Emp: String ;
    Nro_doc_D: Number ;
    Nro_doc_H: Number ;
    Fec_emis_D: String ;
    Fec_emis_H: String ;
    Co_cli_D: String ;
    Co_cli_H: String ;
    Co_ven_D: String ;
    Co_ven_H: String ;
    Condicion: String ;
    Tipo_doc: String ;
    Co_mone: String ;
    Co_zon_D: String ;
    Co_zon_H: String ;
    Co_seg_D: String ;
    Co_seg_H: String ;
    Autenticacion: String;

    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_Emp =  Empresa.codigoAdministrativo; 
        this.Nro_doc_D = 0 ;
        this.Nro_doc_H = 0 ;
        this.Fec_emis_D = "";
        this.Fec_emis_H = "";
        this.Co_cli_D = "";
        this.Co_cli_H = "";
        this.Co_ven_D = "";
        this.Co_ven_H = "";
        this.Condicion = "";
        this.Tipo_doc = "";
        this.Co_mone = "";
        this.Co_zon_D = "";
        this.Co_zon_H = "";
        this.Co_seg_D = "";
        this.Co_seg_H = "";
        this.Autenticacion = "";
    
    }
}