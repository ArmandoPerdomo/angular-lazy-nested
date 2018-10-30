import { Cargo } from "./Cargo";
import { Registro } from "./Registro";

export class Recibos{
                Cargo: Cargo;
                Registro: Array<Registro>;
                Periodo_D: String;
                Periodo_H: String;
                N_Recibo: Number;
                Co_Empleado: String;
                PNombre: String;
                SNombre: String;
                PApellido: String;
                SApellido: String;
                CI: String;
                Fecha_Ingreso: String;
                Sueldo_Men: String;
                Departamento: String;
}