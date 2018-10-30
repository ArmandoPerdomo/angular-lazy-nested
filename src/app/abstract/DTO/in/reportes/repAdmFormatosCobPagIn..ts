import { Empresa } from "../../../class/user";

// DataqueretornaelJsondelservicioparalosreportesdeVentas
export class RepAdmFormatosCobPagIn {
 Co_emp: String;

 Numero: Number;

 Co_ven: String;

  Documento: String;

  Autenticacion: String;

  
  constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_emp = Empresa.codigoAdministrativo; 
    this.Co_ven = "";
    this.Autenticacion = "";
    this.Numero = 0;
    this.Documento = "";
  }
  
}








