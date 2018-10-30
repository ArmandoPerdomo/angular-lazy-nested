import { Empresa } from "../../../class/user";

export class ReporteGerencialIn{

    Moneda:String;
    Autenticacion:String;
    Tipo:Number;
    Co_emp:String;
    Todos:Number;



    constructor(){
    const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Moneda = "bs";
    this.Autenticacion= "";
    this.Tipo= 3;
    this.Co_emp= Empresa.codigoAdministrativo; 
    this.Todos= 0;
    }
}
