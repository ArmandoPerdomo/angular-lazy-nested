import { Empresa } from "../../../class/user";

export class RepConBalanceComprobacionIn{
Co_Emp: String;
Co_cue_D: String;
Co_cue_H: String;
Fecha_D: String;
Fecha_H: String;
Co_cen_D: String;
Co_cen_H: String;
Co_gas_D: String;
Co_gas_H: String;
Co_adi_D: String ;
Co_adi_H: String;
Co_aux_D: String;
Co_aux_H: String;
Tipo_comprobante: String;
Cuenta_saldo: String;
Co_mone: String;
Nivel: String;
Exc_cta_orden: String;
Autenticacion: String;
constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp= Empresa.codigoContabilidad;
    this.Co_cue_D= "";
    this.Co_cue_H= "";
    this.Fecha_D= "";
    this.Fecha_H= "";
    this.Co_cen_D= "";
    this.Co_cen_H= "";
    this.Co_gas_D= "";
    this.Co_gas_H= "";
    this.Co_adi_D= "" ;
    this.Co_adi_H= "";
    this.Co_aux_D= "";
    this.Co_aux_H= "";
    this.Tipo_comprobante= "";
    this.Cuenta_saldo= "";
    this.Co_mone= "";
    this.Nivel= "";
    this.Exc_cta_orden= "";
    this.Autenticacion= "";
}
}
