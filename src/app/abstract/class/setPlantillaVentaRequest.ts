import { EncabezadoDocumento } from "./encabezadoDocumento";
import { ItemRenglon } from "./itemRenglon";

export class SetPlantillaVentaRequest{
    public Encabezado : EncabezadoDocumento;
    public ItemRenglon : Array<ItemRenglon>;
}