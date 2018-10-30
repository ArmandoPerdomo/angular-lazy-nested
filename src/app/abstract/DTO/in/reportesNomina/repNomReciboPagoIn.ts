import { Empresa } from "../../../class/user";

export class RepNomReciboPagoIn{
Co_emp: String;
Recibo_D: String ;
Recibo_H: String ;
Tabajador_D: String ;
Tabajador_H: String ;
Fecha_D: String ;
Fecha_H: String ;
Departamento: String;
Contrato: String;
DepGenerado_D:String;
DepGenerado_H: String;
ContGenerado_D: String;
ContGenerado_H: String;
Autenticacion: String

constructor(){
    const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_emp= Empresa.codigoNomina;
    this.Recibo_D= "" ;
    this.Recibo_H= "" ;
    this.Tabajador_D= "" ;
    this.Tabajador_H= "" ;
    this.Fecha_D= "" ;
    this.Fecha_H= "" ;
    this.Departamento= "";
    this.Contrato= "";
    this.DepGenerado_D="";
    this.DepGenerado_H= "";
    this.ContGenerado_D= "";
    this.ContGenerado_H= "";
    this.Autenticacion= ""
}
}