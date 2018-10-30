import { Component, OnInit, ViewChild} from '@angular/core';
import { DesplazamientoService } from '../../../../core/services/gestion-ventas/desplazamiento.service';
import { DesplazamientoIn } from '../../../../abstract/DTO/in/gestion-ventas/desplazamientoIn';
import { GetPlantillaVentaIn } from '../../../../abstract/DTO/in/gestion-ventas/getPlantillaVentaIn';
import { GetPlantillaVentaOut } from '../../../../abstract/DTO/out/gestion-ventas/getPlantillaVentaOut';
import { GetPlantillaVentaService } from '../../../../core/services/gestion-ventas/getPlantillaVenta.service';
import { SetPlantillaVentaIn } from '../../../../abstract/DTO/in/gestion-ventas/setPlantillaVentaIn';
import { SetPlantillaVentaService } from '../../../../core/services/gestion-ventas/setPlantillaVenta.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ListaPlantillaVentaService } from '../../../../core/services/gestion-ventas/listaPlantillaVenta.service';
import { ListaPlantillaVentaIn } from '../../../../abstract/DTO/in/gestion-ventas/listaPlantillaVentaIn';
import { ListaPlantillaVentaOut } from '../../../../abstract/DTO/out/gestion-ventas/listaPlantillaVentaOut';

@Component({
  selector: 'app-gestionar-plantilla-venta',
  templateUrl: './gestionar-plantilla-venta.component.html',
  styleUrls: ['./gestionar-plantilla-venta.component.css']
})
export class GestionarPlantillaVentaComponent implements OnInit {

  getPlantillaPrimero : GetPlantillaVentaIn;

  @ViewChild('generales')  generales: any;

  public plantilla : any = {};

  formulario: FormGroup;

  fechaEmis : any;
  fechaVenc : any;

  public salidaPlantillaVenta : GetPlantillaVentaIn;

  constructor(public despla : DesplazamientoService, public plantGet: GetPlantillaVentaService,
              public guardar: SetPlantillaVentaService, public listaPlantVenta : ListaPlantillaVentaService,
              private formBuilder: FormBuilder) {

                this.salidaPlantillaVenta = new GetPlantillaVentaIn();
              }

  recibirEvento(event):void{

    if(event.nombre=="btPrimero"){

      console.log(event.nombre);
      this.mepostDesplazamiento("plavent","AC01",1,"","");

    }else if(event.nombre=="btAnterior"){
      console.log("componenete",this.generales.ComponentesGenerales.value['encabezadoData']['iNumeroDocumento']);
      let ref =this.generales.ComponentesGenerales.value['encabezadoData']['iNumeroDocumento'];
      console.log(event.nombre);
      this.mepostDesplazamiento("plavent","AC01",3,ref,"");

    }else if(event.nombre=="btSiguiente"){
      console.log("componenete",this.generales.ComponentesGenerales['encabezadoData']);
      console.log(event.nombre);
      let ref =this.generales.ComponentesGenerales.value['encabezadoData']['iNumeroDocumento'];
      this.mepostDesplazamiento("plavent","AC01",2,ref,"");

    }else if(event.nombre=="btUltimo"){

      console.log(event.nombre);
      this.mepostDesplazamiento("plavent","AC01",4,"","");

    }else if(event.nombre=="btNuevo"){
      console.log(event.nombre);
      this.generales.limpiarCampos();

    }else if(event.nombre=="btGuardar"){

      console.log(event.nombre);
      this.mepostGuardar();

    }else if(event.nombre=="btRestaurar"){
      console.log(event.nombre);
      let ref =this.generales.ComponentesGenerales.value['encabezadoData']['iNumeroDocumento'];
      this.mepostGetPlantillaVenta(ref);

    }else if(event.nombre=="btImprimir"){
      console.log(event.nombre);

    }else if(event.nombre=="btAgregarRenglon"){
      console.log(event.nombre);
      this.addRenglon();

    }else if(event.nombre=="btEliminarRenglon"){
      console.log(event.nombre);
      console.log(this.generales.idRenglon);
      this.eliminarRenglon();

    }else if(event.nombre=="btCerrar"){
      console.log(event.nombre);
    }

  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      numeroBuscar : []
    });
  }

  value = '';
  onEnter(value: string) {
    this.value = value;
    alert(this.value);
    this.mepostListaPlantillaVenta();

  }

  desplazamiento : DesplazamientoIn;
  mepostDesplazamiento(tabla: String, cod: String, opc: Number,ref: String, vend: String): void{
    this.despla.asDesplaz(tabla,cod,opc,ref,vend).subscribe(des=>{
      this.desplazamiento = des.Lista;
      console.log("Desplazamiento: " ,des.sResultado);
      if(des.sResultado !=null){
        var y = +des.sResultado;
        this.mepostGetPlantillaVenta(y);
      }
    },error=>{
      console.log(<any> error);
    })
  }


  mepostGetPlantillaVenta(numero:Number): void{

    let entradaPlantillaVenta : GetPlantillaVentaOut = new GetPlantillaVentaOut();
    entradaPlantillaVenta = new GetPlantillaVentaOut();
    entradaPlantillaVenta.iNumero = numero;
    entradaPlantillaVenta.sAutenticador ="Demo";
    entradaPlantillaVenta.sCodigoEmpresa ="AC01";
    entradaPlantillaVenta.sIdioma ="ES-VE";
    this.plantGet.asGetPlantV(entradaPlantillaVenta).subscribe(plant=>{
      this.salidaPlantillaVenta = plant;
      //this.getPlantillaPrimero = salidaPlantillaVenta;
      console.log("salida",this.salidaPlantillaVenta);
      console.log("get plantilla venta",this.salidaPlantillaVenta['Renglones']);

      this.generales.recibirDataPlantilla(this.salidaPlantillaVenta);

    },error=>{
      console.log(<any> error);
    })

  }


  mepostGuardar(): void{
    this.plantilla['eTipoDocumento']= 0;
    this.plantilla['sIdioma'] = "ES-VE";
    this.plantilla['sCodigoEmpresa'] = "AC01";
    this.plantilla['sAutenticador'] = "";
    this.plantilla['Encabezado'] = {}
    this.plantilla['Encabezado']['iNumeroDocumento'] = this.generales.ComponentesGenerales.get('encabezadoData.iNumeroDocumento').value;
    this.plantilla['Encabezado']['bContrib'] = true;
    this.plantilla['Encabezado']['sNombre'] = '';
    this.plantilla['Encabezado']['sRif'] ='';
    this.plantilla['Encabezado']['sNit']= '';
    this.plantilla['Encabezado']['sStatus'] ='0';
    this.plantilla['Encabezado']['sComentario'] ='<RECONVERSION>';
    this.plantilla['Encabezado']['sDescrip']= this.generales.ComponentesGenerales.get('encabezadoData.sDescrip').value;
    this.plantilla['Encabezado']['nSaldo'] = 0;


    let fecha_emis = this.generales.ComponentesGenerales.get('encabezadoData.sFec_emis').value;
    let fecha_venc =  this.generales.ComponentesGenerales.get('encabezadoData.sFec_venc').value;
    console.log(fecha_emis);
    console.log(fecha_venc);
    //validar la fecha emis
    if(fecha_emis['year']){
      if(fecha_emis['month'] < 10){
        console.log("entro");
        fecha_emis['month'] = 0+""+fecha_emis['month'];
      }

      if(fecha_emis['day'] < 10){
        fecha_emis['day'] = 0+""+fecha_emis['day'];
      }

      this.fechaEmis =fecha_emis['year']+""+fecha_emis['month']+""+fecha_emis['day'];
    }else{
      this.fechaEmis = fecha_emis;
      console.log(this.fechaEmis);
    }

    //validar la fecha venc
    if(fecha_venc['year']){
      if(fecha_venc['month'] < 10){
        console.log("entro");
        fecha_venc['month'] = 0+""+fecha_venc['month'];
      }

      if(fecha_venc['day'] < 10){
        fecha_venc['day'] = 0+""+fecha_venc['day'];
      }
      this.fechaVenc  = fecha_venc['year']+""+fecha_venc['month']+""+fecha_venc['day'];
      console.log(this.fechaVenc);
    }else{
      this.fechaVenc = fecha_venc;
      console.log(this.fechaVenc);
    }


    if( fecha_emis === ""){
      console.log("entro sFec_emis");
      console.log(this.generales.dt);
      let nw_fecha_emis = moment(this.generales.dt).format("YYYYMMDD");
      this.plantilla['Encabezado']['sFec_emis'] = nw_fecha_emis;
    }else{
      console.log("this.fechaEmis",this.fechaEmis);
      let nw_fecha_emis = moment(this.fechaEmis, "DD/MM/YYYY").format("YYYYMMDD");
      this.plantilla['Encabezado']['sFec_emis'] = nw_fecha_emis;
    }

    if(fecha_venc === ""){
      console.log("entro sFec_venc");
      let nw_fecha_venc = moment(this.generales.dt).format("YYYYMMDD");
      this.plantilla['Encabezado']['sFec_venc'] = nw_fecha_venc;
    }else{
      let nw_fecha_venc = moment(this.fechaVenc, "DD/MM/YYYY").format("YYYYMMDD");
      this.plantilla['Encabezado']['sFec_venc'] = nw_fecha_venc;
    }

    this.plantilla['Encabezado']['sCodigoCliente'] = this.generales.ComponentesGenerales.get('encabezadoData.sCodigoCliente').value;
    this.plantilla['Encabezado']['sCliente'] = "";

    this.plantilla['Encabezado']['sCodigoVendedor'] = this.generales.ComponentesGenerales.get('encabezadoData.sCodigoVendedor').value;
    this.plantilla['Encabezado']['sVendedor'] = "";

    this.plantilla['Encabezado']['sCodigoTransporte'] = this.generales.ComponentesGenerales.get('encabezadoData.sCodigoTransporte').value;
    this.plantilla['Encabezado']['sTransporte'] = "";

    this.plantilla['Encabezado']['sDirecEntrega'] = "";

    this.plantilla['Encabezado']['sFormaPago'] = this.generales.ComponentesGenerales.get('encabezadoData.sFormaPago').value;
    this.plantilla['Encabezado']['sDescripFormaPago'] = "";



    this.plantilla['Encabezado']['dTotBruto'] =0;
    this.plantilla['Encabezado']['dTotNeto'] =0;
    this.plantilla['Encabezado']['dGlobDesc'] =0;
    this.plantilla['Encabezado']['dTotReca'] =0;
    this.plantilla['Encabezado']['dIva'] =0;
    this.plantilla['Encabezado']['dTasa'] =1;
    this.plantilla['Encabezado']['dTasaG'] =0;
    this.plantilla['Encabezado']['dTasa10'] =0;
    this.plantilla['Encabezado']['dTasa20'] =0;
    this.plantilla['Encabezado']['sPorcgDesc'] ="";
    this.plantilla['Encabezado']['sPorcReca'] ="";
    this.plantilla['Encabezado']['bAnulada'] = false;
    this.plantilla['Encabezado']['sMoneda'] = this.generales.ComponentesGenerales.get('encabezadoData.sMoneda').value;
    this.plantilla['Encabezado']['sCampo1'] ="";
    this.plantilla['Encabezado']['sCampo2'] ="";
    this.plantilla['Encabezado']['sCampo3'] ="";
    this.plantilla['Encabezado']['sCampo4'] ="";
    this.plantilla['Encabezado']['sCampo5'] ="";
    this.plantilla['Encabezado']['sCampo6'] ="";
    this.plantilla['Encabezado']['sCampo7'] ="";
    this.plantilla['Encabezado']['sCampo8'] ="";
    this.plantilla['Encabezado']['sCo_us_in'] ='WEB';
    this.plantilla['Encabezado']['sCo_us_mo'] ='WEB';
    this.plantilla['Encabezado']['sFe_us_mo'] = '20160101',
    this.plantilla['Encabezado']['sCo_Sucu'] ='FLOR';
    this.plantilla['Encabezado']['sDisCen'] ="";
    this.plantilla['Encabezado']['nAuxo1'] =0;
    this.plantilla['Encabezado']['sAux02'] ="";
    this.plantilla['Encabezado']['sTelefono'] ='';
    this.plantilla['Encabezado']['sPorcgDesc'] ="";
    this.plantilla['Encabezado']['sPorcReca'] ="";

    console.log("",this.plantilla);
    this.plantilla['Renglones'] = [];
    for(let lista of this.generales.listaRenglones){
      console.log(lista);
      this.plantilla['Renglones'].push(lista);
    }

    this.plantilla['bProcesado'] = null;
    this.plantilla['sMensajeError'] = null;

    console.log("Plantilla Renglones",this.plantilla['Renglones']);
    let respuestaGuardar : SetPlantillaVentaIn;
    console.log(this.plantilla);
    this.guardar.asGuardarPlantillaV(this.plantilla).subscribe(plant=>{
      respuestaGuardar = plant;
      console.log("guardar respuesta", respuestaGuardar);

    },error=>{
      console.log(<any> error);
    })

  }

  eliminarRenglon(){
    let id = this.generales.idRenglon;
    console.log(this.generales.listaRenglones);
    let remuve = this.generales.listaRenglones.splice(id,1);
    console.log("remuve",remuve);
    console.log(this.generales.listaRenglones);

    let nuevaLista: any;
    let item : any;
    let cont = 0;
    for(let lista of this.generales.listaRenglones){
      cont++;
      console.log("contador",cont);
        console.log(lista['iReng_Num']);
        lista['iReng_Num'] = cont;
    }
  }

  addRenglon(){

    let cont = 0;
   for(let lista of this.generales.listaRenglones){
     cont++;
     console.log(cont);
   }
     let newItem = {
      "iNumeroDocumento": 0,
      "iReng_Num": 1,
      "sTipo_Doc": "",
      "iReng_Doc": 0,
      "iNum_Doc": 0,
      "sCo_Art": "",
      "sArticulo": "",
      "sCo_alma": "",
      "sAlmacen": "",
      "dTotal_Art": 0,
      "dsTotal_Art": 0,
      "dPendiente": 0,
      "sUni_Venta": "",
      "sUnidad": "",
      "dPrec_Vta": 0,
      "dPrec_Vta2": 0,
      "sPorc_Desc": "",
      "sTipoImp": "",
      "dReng_Neto": 0,
      "dCos_Pro_Uni": 0,
      "dUlt_Cos_Uni": 0,
      "dCos_Pro_Om": 0,
      "dUlt_Cos_Om": 0,
      "sComentario": "",
      "dTotal_Uni": 0,
      "sCo_Alma2": "",
      "sDis_Cen": "",
      "sAux02": "",
      "dAux01": ""
     };
    newItem['iReng_Num'] = cont +1;
    this.generales.listaRenglones.push(newItem);

    cont =0;
    console.log(this.generales.listaRenglones);

  }


  listaPlant: ListaPlantillaVentaIn[];
  // Método que hace llamado al servicio
  mepostListaPlantillaVenta(): void {
    let listaSalida : ListaPlantillaVentaOut = new ListaPlantillaVentaOut();
    listaSalida.iNumero_D = 0;
    listaSalida.iNumero_H = 9999999;
    listaSalida.iTop = 1;
    listaSalida.bSoloProcesable = 0;
    listaSalida.sCodigoEmpresa = "AC01";
    listaSalida.sFecha_D = "";
    listaSalida.sFecha_H = "";
    listaSalida.sCo_Vendedor = "";
    listaSalida.sIdioma = "ES-VE";
    listaSalida.sAutenticador = "";
    this.listaPlantVenta.asListaPlan(listaSalida).subscribe( venta => {
      this.listaPlant = venta.Lista;
      console.log(this.listaPlant);
      },
      error => {
      console.log(<any> error);
      }
    );
  }
}

