import { EncabezadoDocumento } from "./encabezadoDocumento";
import { ItemRenglon } from "./itemRenglon";

export class GetPlantillaVentaResult{
    public Error: String;
    public Encabezado : EncabezadoDocumento;
    public ItemRenglon : Array<ItemRenglon>;

    
}