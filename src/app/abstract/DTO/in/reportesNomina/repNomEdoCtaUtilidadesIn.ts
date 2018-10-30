import { Empresa } from "../../../class/user";

export class RepNomEdoCtaUtilidadesIn{
Co_emp: String;
Departamento_D:String;
Autenticacion:String;
Departamento_H:String;
Concepto_D:String;
Contrato_H:String;
Contrato_D:String;
DepGenerado_H:String;
ContGenerado_D:String;
Fecha_D:String;
DepGenerado_D:String;
Fecha_H:String;
Concepto_H:String;
Tabajador_D:String;
ContGenerado_H:String;
Tabajador_H:String

    constructor(){
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_emp= Empresa.codigoNomina;
        this.Departamento_D="";
        this.Autenticacion="";
        this.Departamento_H="";
        this.Concepto_D="";
        this.Contrato_H="";
        this.Contrato_D="";
        this.DepGenerado_H="";
        this.ContGenerado_D="";
        this.Fecha_D="";
        this.DepGenerado_D="";
        this.Fecha_H="";
        this.Concepto_H="";
        this.Tabajador_D="";
        this.ContGenerado_H="";
        this.Tabajador_H=""
      
    }
}