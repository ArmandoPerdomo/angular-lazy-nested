import { Empresa } from "../../../class/user";

//? Data In Para todas las facturas
export class RepAdmFacturaResumenCompletoIn {
  Co_Emp: String;
  Numero_d: Number;
  Numero_h: Number;
  Cliente_d: String;
  Vendedor: String;
  Autentication: String;

  constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
    this.Co_Emp = Empresa.codigoAdministrativo; 
    this.Cliente_d = "";
    this.Autentication = "";
    this.Numero_h = 0;
    this.Numero_d = 0;
    this.Vendedor = "";
  }
}
