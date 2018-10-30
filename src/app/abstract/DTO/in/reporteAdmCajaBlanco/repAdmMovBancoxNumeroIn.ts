import { Empresa } from "../../../class/user";



export class RepAdmMovBancoxNumeroIn{
    Co_Emp: String ;
    Numero_d: Number ;
    Numero_h: Number ;
    CodigoCuenta_d: String ;
    CodigoCuenta_h: String ;
    CuentaIngreso_d: String ;
    CuentaIngreso_h: String ;
    Fecha_d: String;
    Fecha_h: String ;
    TipoMovim: String ;
    Conciliado: String ;
    OrigenMovim: String ;
    Moneda: String ;
    CuentaInactiva: String;
    Condicion: String ;
    Autenticacion: String;
    constructor(){  
    const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp= Empresa.codigoAdministrativo ;
    this.Numero_d= 0 ;
    this.Numero_h= 0 ;
    this.CodigoCuenta_d= "" ;
    this.CodigoCuenta_h= "" ;
    this.CuentaIngreso_d= "" ;
    this.CuentaIngreso_h= "" ;
    this.Fecha_d= "";
    this.Fecha_h= "" ;
    this.TipoMovim= "" ;
    this.Conciliado= "" ;
    this.OrigenMovim= "" ;
    this.Moneda= "" ;
    this.CuentaInactiva= "";
    this.Condicion= "" ;
    this.Autenticacion= "";
    }
}