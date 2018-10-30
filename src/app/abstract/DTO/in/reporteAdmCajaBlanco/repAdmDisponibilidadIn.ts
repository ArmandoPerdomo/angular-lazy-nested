import { Empresa } from "../../../class/user";



export class RepAdmDisponibilidadIn{
    Co_Emp: String;
    Fec_emis: String;
    Tasa: String;
    Autenticacion: String;
    constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_Emp= Empresa.codigoAdministrativo;
        this.Fec_emis= "";
        this.Tasa= "";
        this.Autenticacion= "";
    }
}