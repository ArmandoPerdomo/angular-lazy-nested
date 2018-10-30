import { Acumulados_Iniciales } from "./Acumulados_Iniciales";
import { Registro } from "./Registro";

export class Prestaciones{
    Acumulados_Iniciales: Acumulados_Iniciales;
    Registro: Array<Registro>;
    Co_Empleado: String;
    PNombre: String;
    SNombre: String;
    PApellido: String;
    SApellido: String;
    CI: String;
    Fecha_Ingreso: String;
    Dias_abon_total: Number;
    Monto_abon_total: Number;
    Dias_adic_total: Number;
    Monto_dias_adicionales_total: Number;
    Monto_interes_total: Number;
    Acumulado_interese_total: Number;


    constructor(){
        this.Acumulados_Iniciales= new Acumulados_Iniciales;
        this. Registro = new Array<Registro>();
        this.Co_Empleado= "";
        this.PNombre = "";
        this.SNombre= "";
        this.PApellido="";
        this.SApellido="";
        this.CI ="";
        this.Fecha_Ingreso="";
        this.Dias_abon_total=0;
        this.Monto_abon_total=0;
        this.Dias_adic_total=0;
        this.Monto_dias_adicionales_total=0;
        this.Monto_interes_total=0;
        this.Acumulado_interese_total=0;
    
    }
}