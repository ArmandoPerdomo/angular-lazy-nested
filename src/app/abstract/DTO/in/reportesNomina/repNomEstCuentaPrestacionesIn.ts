import { Empresa } from "../../../class/user";

export class RepNomEstCuentaPrestacionesIn{
    Co_Emp: String ;
    Tabajador_D: String ;
    Tabajador_H: String ;
    Contrato_D: String ;
    Contrato_h: String ;
    Fecha_D: String ;
    Fecha_h: String ;
    Departamento_D: String ;
    Departamento_h: String ;
    DepGenerado_D: String ;
    DepGenerado_h: String ;
    ContGenerado_D: String;
    ContGenerado_h: String ;
    Autenticacion: String;


    constructor(){
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_Emp= Empresa.codigoNomina;
        this.Tabajador_D= "" ;
        this.Tabajador_H= "" ;
        this.Contrato_D= "" ;
        this.Contrato_h= "" ;
        this.Fecha_D= "" ;
        this.Fecha_h= "" ;
        this.Departamento_D= "" ;
        this.Departamento_h= "" ;
        this.DepGenerado_D= "" ;
        this.DepGenerado_h= "" ;
        this.ContGenerado_D= "";
        this.ContGenerado_h= "" ;
        this.Autenticacion= "";
    }
}