import { GetPlantillaVentaResult } from "../../../class/getPlantillaVentaResult";
//https://nehalist.io/working-with-models-in-angular/
export class GetPlantillaVentaIn{
    public eTipoDocumento: Number;
    public sIdioma: String ;
    public sCodigoEmpresa: String;
    public sAutenticador: String;
    public GetPlantillaVentaResult : GetPlantillaVentaResult;
    public bProcesado : Boolean;
    public sMensajeError: String;
}
