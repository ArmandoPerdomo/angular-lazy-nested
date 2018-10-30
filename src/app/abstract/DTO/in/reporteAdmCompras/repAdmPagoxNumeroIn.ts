import { Empresa } from "../../../class/user";



export class RepAdmPagoxNumeroIn{
        Co_Emp: String;
        NumeroD: Number;
        Numeroh: Number;
        FechaD: String;
        Fechah: String;
        Co_ProvD: String;
        Co_Provh: String;
        Moneda: String;
        Co_ZonaD: String;
        Co_Zonah: String;
        Co_SegmentoD: String;
        Co_Segmentoh: String;
        Condicion: String;
        Autenticacion: String;
        Condicion_Des: String;
        constructor(){   const Empresa : Empresa = JSON.parse(localStorage.getItem('user_data')).empresa
            this.Co_Emp= Empresa.codigoAdministrativo;
            this.NumeroD= 0;
            this.Numeroh= 0;
            this.FechaD= "";
            this.Fechah= "";
            this.Co_ProvD= "";
            this.Co_Provh= "";
            this.Moneda= "";
            this.Co_ZonaD= "";
            this.Co_Zonah= "";
            this.Co_SegmentoD= "";
            this.Co_Segmentoh= "";
            this.Condicion= "";
            this.Condicion_Des= ""; //? Este parametro es un trait
            this.Autenticacion= "";
    
        }

}