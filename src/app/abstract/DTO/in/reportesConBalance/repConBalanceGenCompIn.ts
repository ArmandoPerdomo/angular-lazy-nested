import { Empresa } from "../../../class/user";

//! se supone que el comparativo es el mensual
export class RepConConBalanceGenCompIn{

Co_Emp: String;
Co_cue_D: String;
Co_cue_h: String;
Fecha_D: String;
Fecha_H: String;
Co_cen_D: String;
Co_cen_h: String;
Co_gas_D: String;
Co_gas_h: String;
Co_adi_D: String ;
Co_adi_h: String;
Co_aux_D: String;
Co_aux_h: String;
Tipo_comprobante: String;
Cuenta_saldo: String;
Co_mone: String;
Nivel: String;
Exc_cta_orden: String;
Autenticacion: String;
constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp= Empresa.codigoContabilidad;
    this.Co_cue_D= "";
    this.Co_cue_h= "";
    this.Fecha_D= "";
    this.Fecha_H= "";
    this.Co_cen_D= "";
    this.Co_cen_h= "";
    this.Co_gas_D= "";
    this.Co_gas_h= "";
    this.Co_adi_D= "" ;
    this.Co_adi_h= "";
    this.Co_aux_D= "";
    this.Co_aux_h= "";
    this.Tipo_comprobante= "";
    this.Cuenta_saldo= "";
    this.Co_mone= "";
    this.Nivel= "";
    this.Exc_cta_orden= "";
    this.Autenticacion= "";
}
}
