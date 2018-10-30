import { Empresa } from "../../../class/user";



export class RepAdmFormatoMovBancoIn{
    Co_Emp: String ;
    Numero_d: Number ;
    Numero_h: Number ;
    Fecha: String;
    Autenticacion: String;
    constructor(){  
    const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp= Empresa.codigoAdministrativo ;
    this.Numero_d= 0 ;
    this.Numero_h= 0 ;
    this.Fecha= "";
    this.Autenticacion= "";
    }
}