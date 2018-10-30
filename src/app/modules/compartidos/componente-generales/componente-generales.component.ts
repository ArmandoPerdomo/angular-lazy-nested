import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ListaClienteService } from '../../../core/services/gestion-ventas/listar-clientes.service';
import { ListarClientesIn } from '../../../abstract/DTO/in/listarClientesIn';
import { ListarVendedorService } from '../../../core/services/gestion-ventas/listar-vendedor.service';
import { ListarVendedorIn } from '../../../abstract/DTO/in/gestion-ventas/listarVendedorIn';
import { ListarTransportesService } from '../../../core/services/gestion-ventas/listar-transportes.service';
import { ListarTransportesIn } from '../../../abstract/DTO/in/gestion-ventas/listarTransportesIn';
import { ListarCondicionesService } from '../../../core/services/gestion-ventas/listar-condiciones.service';
import { ListarCondicionesIn } from '../../../abstract/DTO/in/gestion-ventas/listarCondicionesIn';
import { ListarMonedaService } from '../../../core/services/gestion-ventas/listar-moneda.service';
import { ListarMonedaIn } from '../../../abstract/DTO/in/gestion-ventas/listarMonedaIn';
import { ListaAlmacenService } from '../../../core/services/gestion-ventas/listar-almacen.service';
import { ListarAlmacenIn } from '../../../abstract/DTO/in/gestion-ventas/listarAlmacenIn';
import { ListaUnidadService } from '../../../core/services/gestion-ventas/listar-unidad.service';
import { ListarUnidadIn } from '../../../abstract/DTO/in/gestion-ventas/listarUnidadIn';
import { ListaArt } from '../../../core/services/gestion-ventas/listar-articulos.service';
import { ListarArticulosIn } from '../../../abstract/DTO/in/gestion-ventas/listarArticulosIn';
import { GetArticuloService } from '../../../core/services/gestion-ventas/getArticulo.service';
import { GetArticuloIn } from '../../../abstract/DTO/in/gestion-ventas/getArticuloIn';
import { CalcularItemService } from '../../../core/services/gestion-ventas/calcularItem.service';
import { CalcularItemIn } from '../../../abstract/DTO/in/gestion-ventas/calcularItemIn';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EncabezadoDocumento } from '../../../abstract/class/encabezadoDocumento';
import { GetPlantillaVentaIn } from '../../../abstract/DTO/in/gestion-ventas/getPlantillaVentaIn';
import { GetPlantillaVentaOut } from '../../../abstract/DTO/out/gestion-ventas/getPlantillaVentaOut';
import { GetPlantillaVentaService } from '../../../core/services/gestion-ventas/getPlantillaVenta.service';
import * as moment from 'moment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../../core/services/gestion-ventas/ngb-date-fr-parser-formatter";
import { DesplazamientoIn } from '../../../abstract/DTO/in/gestion-ventas/desplazamientoIn';
import { DesplazamientoService } from '../../../core/services/gestion-ventas/desplazamiento.service';
import { ModalAyudaArtComponent } from '../modal-ayuda-art/modal-ayuda-art.component';
import { ModalImportarComponent } from '../modal-importar/modal-importar.component';
import { ModalPlantillaBtimportarComponent } from '../modal-plantilla-btimportar/modal-plantilla-btimportar.component';
import { ListarUnidadOut } from '../../../abstract/DTO/out/gestion-ventas/listarUnidadOut';
import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'thousandsPipe'
    })

@Component({
  selector: 'app-componente-generales',
  templateUrl: './componente-generales.component.html',
  styleUrls: ['./componente-generales.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ComponenteGeneralesComponent implements OnInit, PipeTransform {

    sCodigo: String;
    sDescripcion: String;

    @Input() ComponentesGenerales: FormGroup;

    @Input() mostrarStatus: boolean;

    @Input() idRenglon : any;

    itemId : any;

    @Input() listaRenglones: any;

    @Input() newAttribute: any;

    public salidaPlantillaVenta : GetPlantillaVentaIn;

    validar : Boolean = false;

    @Input() mostrarSel : Boolean = false;
    @Input() mostrarbt : Boolean = true;
    @Input() ocultarImp : Boolean = true;
    @Input() mostrarImp : Boolean = false;
    @Input() title : String ="";

    encabezadoData: EncabezadoDocumento;

    @Input() dtVenc : Date;

    @Input() dtEmis : Date;

    codigArtSelec : any;
    empresa : any = "AC01";
    total :number = 0;
    iva : number = 0;
    subTotal : number = 0;


  constructor(private formBuilder: FormBuilder, private location: Location, public listaC: ListaClienteService,
              public listaV : ListarVendedorService, public listaT : ListarTransportesService,
              public listaCond : ListarCondicionesService, public listaMoned : ListarMonedaService,
              public listaAlma : ListaAlmacenService, public listaUni : ListaUnidadService,
              public listaArt: ListaArt, public obtenerArt : GetArticuloService,
              public calcularItem: CalcularItemService,public despla : DesplazamientoService,
              public plantGet: GetPlantillaVentaService, private modalService: NgbModal) {

                this.dtVenc = new Date();
                this.dtEmis = new Date();
                console.log(this.dtVenc);
                this.salidaPlantillaVenta = new GetPlantillaVentaIn();
  }

  ngOnInit() {

    this.ComponentesGenerales = this.formBuilder.group({
      encabezadoData : this.formBuilder.group({
       iNumeroDocumento: ['', Validators.compose([Validators.required, Validators.requiredTrue, Validators.pattern('[0-9]{3,6}')])],
       sCodigoCliente: ['', Validators.compose([Validators.required, Validators.requiredTrue])],
       sCodigoVendedor:['', Validators.compose([Validators.required, Validators.requiredTrue])],
       sCodigoTransporte:['', Validators.compose([Validators.required, Validators.requiredTrue])],
       sFormaPago:['', Validators.compose([Validators.required, Validators.requiredTrue])],
       sMoneda:['BS', Validators.compose([Validators.required, Validators.requiredTrue])],
       sStatus : [],
       sFec_emis :['', Validators.compose([Validators.required, Validators.requiredTrue])],
       sFec_venc :['', Validators.compose([Validators.required, Validators.requiredTrue])],
       sDescrip: [],
     }),
     articuloInput: [],
     almacen : [],
     cantidad: [],
     precio: [],
     unidad : [],
     descuento: [],
     iva: [],
     neto: [],
     descripcionTabla: [],
     imp: [],
     selSelect : [],
     total : [],
     subTotal : [],
     iva2 : []

   });

    this.onChanges();

    this.mepostCliente();

    this.mepostVendedor();

    this.mepostTransporte();

    this.mepostCondiciones();

    this.mepostMoneda();

    this.mepostAlmacen();

    this.mepostArt();

    this.mepostGetArt();

    this.mepostDesplazamiento("plavent",this.empresa,4,"","");

    this.newAttribute ={
      "iNumeroDocumento": 0,
      "iReng_Num": 0,
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
  }


  onChanges(): void{
    this.ComponentesGenerales.get('encabezadoData').get('iNumeroDocumento').valueChanges.subscribe(val => {
      this.validar = this.ComponentesGenerales.get('encabezadoData').get('iNumeroDocumento').valid;
    });
    this.ComponentesGenerales.get('encabezadoData').get('sDescrip').valueChanges.subscribe(val => {

    });

    this.ComponentesGenerales.get('encabezadoData').get('sFormaPago').valueChanges.subscribe(val => {

    });

    this.ComponentesGenerales.get('almacen').valueChanges.subscribe(val => {
      alert("almacen" +val);
      let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
      console.log(resultado);
      resultado['sCo_alma'] =val;
      resultado['sCo_alma2'] =val;
    });

    this.ComponentesGenerales.get('unidad').valueChanges.subscribe(val => {
      alert("unidad" +val);
      let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
      console.log(resultado);
      resultado['sUni_Venta'] =val;
    });

    this.ComponentesGenerales.get('cantidad').valueChanges.subscribe(val => {
      alert("cantidad" +val);
      let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
      console.log(resultado);

      resultado['dTotal_Art'] =val;
      console.log(resultado['dPrec_Vta']);

      let montoPrecio =resultado['dPrec_Vta'];
      let iva = resultado['sTipoImp'];
      let desc = resultado['sPorc_Desc'];

      console.log('precio',montoPrecio);
      console.log('iva',iva);
      console.log('desc',desc);
      console.log('cantidad',val);

      let data = this.mepostCalItem(montoPrecio,desc,val,iva,this.empresa);
      resultado['dReng_Neto'] = data['dMontoBruto'];
    });


    this.ComponentesGenerales.get('precio').valueChanges.subscribe(val => {
      alert("precio" +val);
      let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
      console.log(resultado);
      resultado['dPrec_Vta'] =val;

      let montoPrecio =resultado['dPrec_Vta'];
      let iva = resultado['sTipoImp'];
      let cantidad = resultado['dTotal_Art'];
      let desc = resultado['sPorc_Desc'];

      console.log('precio',montoPrecio);
      console.log('iva',iva);
      console.log('desc',desc);
      console.log('cantidad',cantidad);

      this.mepostCalItem(montoPrecio,desc,cantidad,iva,this.empresa);

    });

    this.ComponentesGenerales.get('descuento').valueChanges.subscribe(val => {
      alert("descuento" +val);
      let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
      console.log(resultado);
      resultado['sPorc_Desc'] =val;

      let montoPrecio =resultado['dPrec_Vta'];
      let iva = resultado['sTipoImp'];
      let cantidad = resultado['dTotal_Art'];
      let desc = resultado['sPorc_Desc'];

      console.log('precio',montoPrecio);
      console.log('iva',val);
      console.log('desc',desc);
      console.log('cantidad',cantidad);

      this.mepostCalItem(montoPrecio,desc,cantidad,iva,this.empresa);

    });

    this.ComponentesGenerales.get('iva').valueChanges.subscribe(val => {
      alert("iva" +val);
      let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
      console.log(resultado);
      resultado['sTipoImp'] =val;

      let montoPrecio =resultado['dPrec_Vta'];
      let cantidad = resultado['dTotal_Art'];
      let desc = resultado['sPorc_Desc'];

      console.log('precio',montoPrecio);
      console.log('iva',val);
      console.log('desc',desc);
      console.log('cantidad',cantidad);

      this.mepostCalItem(montoPrecio,desc,cantidad,val,this.empresa);

    });

  }




  //Servicio del Listar Cliente
  listaCliente: ListarClientesIn[];
  // Método que hace llamado al servicio
  mepostCliente(): void {
    this.listaC.asCli().subscribe( cli => {
      this.listaCliente = cli.Lista;
      },
      error => {
      console.log(<any> error);
      }
    );
  }

  //Servicio para listar los vendedores
  listaVendedor : ListarVendedorIn[];

  mepostVendedor(): void {
    this.listaV.asVend().subscribe(vend =>{
        this.listaVendedor = vend.Lista;
      },
      error =>{
        console.log(<any> error);
      }
    );
  }

   //Servicio para listar los transportistas
   listaTransporte : ListarTransportesIn[];

   mepostTransporte(): void {
     this.listaT.asTrans().subscribe(trans =>{
         this.listaTransporte = trans.Lista;
       },
       error =>{
        console.log(<any> error);
       }
     );

   }

   listaCondiciones : ListarCondicionesIn[];

   mepostCondiciones() : void{
     this.listaCond.asCond().subscribe(condi =>{
       this.listaCondiciones = condi.Lista;
     },
    error=>{
      console.log(<any> error);
    })
   }

   listaMoneda : ListarMonedaIn[];

   mepostMoneda() : void {
     this.listaMoned.asMone().subscribe(mone =>{
       this.listaMoneda = mone.Lista;
     },
     error=>{
       console.log(<any> error);
     })
   }

   listaAlmacen : ListarAlmacenIn[];

   mepostAlmacen(): void{
     this.listaAlma.asAlma().subscribe(al =>{
       this.listaAlmacen = al.Lista;
     },
     error=>{
       console.log(<any> error);
     })
   }

   listaUnidad : ListarUnidadIn[];

   mepostUnidad(codigo:any) : void{
    let dataEntrada : ListarUnidadOut = new ListarUnidadOut();
    dataEntrada.sCodigo_Art = codigo;
    dataEntrada.sAutenticador = "Demo";
    dataEntrada.sIdioma ="ES-VE";
    dataEntrada.sCodigoEmpresa = this.empresa;
     this.listaUni.asUni(dataEntrada).subscribe(un =>{
       this.listaUnidad = un.Lista;
       console.log(this.listaUnidad);
     },
     error=>{
       console.log(<any> error);
     })
   }

  listaArticulos : ListarArticulosIn[];

  mepostArt() : void{
    this.listaArt.asArt().subscribe(ar =>{
      this.listaArticulos = ar.Lista;
    },
    error=>{
      console.log(<any> error);
    })
  }

  obtenerArticulo : GetArticuloIn[];

  mepostGetArt() : void{
    this.obtenerArt.asArt("1902OV3001057").subscribe(obtA=>{
      this.obtenerArticulo = obtA.Lista;
    },
    error=>{
      console.log(<any> error);
    })
  }

  desplazamiento : DesplazamientoIn;
  mepostDesplazamiento(tabla: String, cod: String, opc: Number,ref: String, vend: String): void{
    this.despla.asDesplaz(tabla,cod,opc,ref,vend).subscribe(des=>{
      this.desplazamiento = des.Lista;
      var y = +des.sResultado;
      this.mepostGetPlantillaVenta(y);
    },error=>{
      console.log(<any> error);
    })
  }

  mepostGetPlantillaVenta(numero:Number): void{
    ////console.log("numero",numero);
    let entradaPlantillaVenta : GetPlantillaVentaOut = new GetPlantillaVentaOut();
    entradaPlantillaVenta = new GetPlantillaVentaOut();
    entradaPlantillaVenta.iNumero = numero;
    entradaPlantillaVenta.sAutenticador ="Demo";
    entradaPlantillaVenta.sCodigoEmpresa = this.empresa;
    entradaPlantillaVenta.sIdioma ="ES-VE";
    this.plantGet.asGetPlantV(entradaPlantillaVenta).subscribe(plant=>{
    this.salidaPlantillaVenta = plant;

    this.listaRenglones = this.salidaPlantillaVenta['Renglones'];

      console.log("get plantilla venta",this.salidaPlantillaVenta);
      this.recibirDataPlantilla(this.salidaPlantillaVenta);
    },error=>{
      console.log(<any> error);
    })

  }
  //probar
  calItem : CalcularItemIn[];
  mepostCalItem(monto: Number, desc: String, canti: Number, iva: String, empresa:String){
    this.calcularItem.asCalcularItem(monto,desc,canti,iva,empresa).subscribe(cal=>{
      this.calItem = cal;
      console.log(this.calItem);

      this.total = this.total + this.calItem['dMontoNeto'];
      this.iva = this.iva + this.calItem['dMontoIva'];
      this.subTotal = this.subTotal + this.calItem['dMontoBruto'];
      console.log("total",this.total);
      console.log("iva",this.iva);
      console.log("subTotal",this.subTotal);

      this.ComponentesGenerales.get('total').setValue(this.total);
      this.ComponentesGenerales.get('iva2').setValue(this.iva);
      this.ComponentesGenerales.get('subTotal').setValue(this.subTotal);

      /*let resul =this.milesNumeros(this.calItem['dMontoNeto']);
      console.log(resul);*/

    },error=>{
      console.log(<any> error);
    })
    return this.calItem;
  }

  recibirDataPlantilla(data): void{
    console.log("data",data['Encabezado']['iNumeroDocumento']);
    this.ComponentesGenerales.get('encabezadoData.iNumeroDocumento').setValue(data['Encabezado']['iNumeroDocumento']);
    this.ComponentesGenerales.get('encabezadoData.sCodigoCliente').setValue(data['Encabezado']['sCodigoCliente'].trim());
    this.ComponentesGenerales.get('encabezadoData.sCodigoVendedor').setValue(data['Encabezado']['sCodigoVendedor'].trim());
    this.ComponentesGenerales.get('encabezadoData.sCodigoTransporte').setValue(data['Encabezado']['sCodigoTransporte'].trim());
    this.ComponentesGenerales.get('encabezadoData.sFormaPago').setValue(data['Encabezado']['sFormaPago'].trim());
    this.ComponentesGenerales.get('encabezadoData.sMoneda').setValue(data['Encabezado']['sMoneda'].trim());
    console.log("Cliente",data['Encabezado']['sCodigoCliente'].trim());
    this.ComponentesGenerales.get('encabezadoData.sStatus').setValue(data['Encabezado']['sStatus'].trim());

    console.log(data['Encabezado']['sFec_emis']);
    console.log(data['Encabezado']['sFec_venc']);
    let fechaEmi =  moment(data['Encabezado']['sFec_emis'], "YYYYMMDD").format("DD/MM/YYYY");
    console.log(fechaEmi);
    this.ComponentesGenerales.get('encabezadoData.sFec_emis').setValue(fechaEmi);

    this.dtEmis = new Date(moment(data['Encabezado']['sFec_emis']).format("YYYY-MM-DD h:mm:ss"));
    console.log("dtEmis",this.dtEmis);


    let fechaVenc =  moment(data['Encabezado']['sFec_venc'], "YYYYMMDD").format("DD/MM/YYYY");
    console.log(fechaVenc);

    this.dtVenc = new Date(moment(data['Encabezado']['sFec_venc'], "YYYYMMDD").format("YYYY-MM-DD h:mm:ss"));
    console.log(this.dtVenc);

    this.ComponentesGenerales.get('encabezadoData.sFec_venc').setValue(fechaVenc);
    this.ComponentesGenerales.get('encabezadoData.sDescrip').setValue(data['Encabezado']['sDescrip']);
    this.salidaPlantillaVenta = data;
    this.listaRenglones = this.salidaPlantillaVenta['Renglones'];
    console.log(this.listaRenglones);
    for(let lista of this.listaRenglones){
        console.log(lista['sCo_Art']);
        this.mepostUnidad(lista['sCo_Art']);

        let montoPrecio =lista['dPrec_Vta'];
      let iva = lista['sTipoImp'];
      let cantidad = lista['dTotal_Art'];
      let desc = lista['sPorc_Desc'];

      this.mepostCalItem(montoPrecio,desc,cantidad,iva,this.empresa);

    }
  }


  //-----------Modal--------------
  open() {
    const modalRef = this.modalService.open(ModalAyudaArtComponent,{ size: 'lg' });

    modalRef.result.then((result) => {
      console.log("result",result);
      //console.log(this.ComponentesGenerales.get('i').get('articuloInput'));
      //this.ComponentesGenerales.get('i').get('articuloInput').setValue(result);
      if(result['codigo'] !=""){
        console.log("entro");
        let resultado : any = this.listaRenglones.find(x => x.iReng_Num == this.itemId);
        console.log(resultado);
        resultado['sCo_Art'] =result['codigo'];
        this.codigArtSelec = result['codigo'];

        resultado['dPrec_Vta'] = result['precio'];
        this.mepostUnidad(this.codigArtSelec);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  //--------Fin modal------------------

  //Limpiar los campos cuando es un nuevo registro{
    limpiarCampos(): void{
    this.ComponentesGenerales.get('encabezadoData.iNumeroDocumento').setValue(0);
    this.ComponentesGenerales.get('encabezadoData.sCodigoCliente').setValue('');
    this.ComponentesGenerales.get('encabezadoData.sCodigoVendedor').setValue('');
    this.ComponentesGenerales.get('encabezadoData.sCodigoTransporte').setValue('');
    this.ComponentesGenerales.get('encabezadoData.sFormaPago').setValue('');
    this.ComponentesGenerales.get('encabezadoData.sMoneda').setValue('');
    this.ComponentesGenerales.get('encabezadoData.sStatus').setValue('');
    this.ComponentesGenerales.get('encabezadoData.sFec_emis').setValue(new Date());
    this.ComponentesGenerales.get('encabezadoData.sFec_venc').setValue(new Date());
    this.ComponentesGenerales.get('encabezadoData.sDescrip').setValue('');
    this.dtEmis = new Date();
    this.dtVenc = new Date();
    this.salidaPlantillaVenta = new GetPlantillaVentaIn;
    this.listaRenglones = this.salidaPlantillaVenta['Renglones'];

    this.listaRenglones =[{
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
      }];
    }


    obtenerItem(id,itemId): void{
      console.log("posicion de la columna en la tabla:",id);
      this.idRenglon = id;
      this.itemId = itemId;

    }

  openImportar(): void{
    const modalRef = this.modalService.open(ModalImportarComponent,{ size: 'sm' });

  }

  openVistaImportar(): void{
    const modalRef = this.modalService.open(ModalPlantillaBtimportarComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  public transform(value: any) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
    }

    milesNumeros(numero) {
      return numero.toString().replace(/(\d)(?:(?=\d+(?=[^\d.]))(?=(?:[0-9]{3})+\b)|(?=\d+(?=\.))(?=(?:[0-9]{3})+(?=\.)))/g, "$1,");
  };

  }
