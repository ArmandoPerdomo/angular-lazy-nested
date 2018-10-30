import { Empresa } from "../../../class/user";



export class RepAdmFormatoPago2In{
    Co_emp: String;
    Numero_d: Number;
    Numero_h: Number;
    Co_Beneficiario: String;
    Autenticacion: String;
    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_emp= Empresa.codigoAdministrativo;
    this.Numero_d= 0;
    this.Numero_h= 0;
    this.Co_Beneficiario= "";
    this.Autenticacion= "";
    }
}