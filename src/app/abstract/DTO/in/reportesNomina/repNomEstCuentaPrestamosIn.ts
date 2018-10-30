import { Empresa } from "../../../class/user";

export class RepNomEstCuentaPrestamosIn{
    Frecuencia: String;
    Autenticacion: String;
    Fecha_D: String;
    Metodo:String;
    Fecha_H:String;
    Co_emp:String;
    Tabajador_D: String;
    Contrato_H: String;
    Pagados: String;
    TipoPrestamo: String;
    Tabajador_H: String;
    Contrato_D: String;

    constructor(){
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Frecuencia= "";
        this.Autenticacion= "";
        this.Fecha_D= "";
        this.Metodo="";
        this.Fecha_H="";
        this.Co_emp= Empresa.codigoNomina;
        this.Tabajador_D= "";
        this.Contrato_H= "";
        this.Pagados= "";
        this.TipoPrestamo= "";
        this.Tabajador_H= "";
        this.Contrato_D= "";
    }
}