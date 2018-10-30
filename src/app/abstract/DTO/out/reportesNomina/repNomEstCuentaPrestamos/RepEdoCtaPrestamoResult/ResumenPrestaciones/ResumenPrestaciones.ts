import { DetallePrestamo } from "./DetallePrestamo";

export class ResumenPrestaciones{
    CodigoTrabajador: String;
    Trabajador: String;
    CodigoTipo: String;
    TipoPrestamo: String;
    FechaAsignacion: String;
    Numero: Number;
    Monto: Number;
    Interes: Number;
    Frecuencia: String;
    Metodo: String;
    Cuotas: Number;
    Fecha1Cuota: String;
    CuotasPagadas: Number;
    Saldo: Number;
    Suspendido: Boolean;
    HastaLaFecha: String;
    DetallePrestamo: Array<DetallePrestamo>;
}