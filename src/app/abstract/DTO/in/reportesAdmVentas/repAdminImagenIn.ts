import { Empresa } from "../../../class/user";

export class RepAdminImagenIn{

Co_Emp: String;
CodigoArticulo: String;

    constructor(){
        const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
        this.Co_Emp= Empresa.codigoAdministrativo;
        this.CodigoArticulo= "";
    
    }
}