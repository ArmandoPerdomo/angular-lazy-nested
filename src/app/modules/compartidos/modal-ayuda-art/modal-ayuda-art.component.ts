import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ListaArticuloAyudaService } from '../../../core/services/gestion-ventas/listaArticuloAyuda.service';
import { ListaArticuloAyudaIn } from '../../../abstract/DTO/in/gestion-ventas/listaArticuloAyudaIn';
import { ListaArticuloAyudaOut } from '../../../abstract/DTO/out/gestion-ventas/ListaArticuloAyudaOut';
import { GetStocActualkArtService } from '../../../core/services/gestion-ventas/getStocActualkArt.service';
import { ListaStock } from '../../../abstract/class/listaStock';
import { GetStocActualkArtIn } from '../../../abstract/DTO/in/gestion-ventas/getStocActualkArtIn';
import { GetStocActualkArtOut } from '../../../abstract/DTO/out/gestion-ventas/getStocActualkArtOut';
@Component({
  selector: 'app-modal-ayuda-art',
  templateUrl: './modal-ayuda-art.component.html',
  styleUrls: ['./modal-ayuda-art.component.css']
})
export class ModalAyudaArtComponent implements OnInit {

  closeResult: string;
  comment : String;
  setComment: String;

  mostrarLimpiar : Boolean = false;
  mostrarFiltrar: Boolean = true;
  mostrarSubLinea: Boolean = false;
  mostrarOculto: Boolean = true;
  mostrarLineColor: Boolean = false;
  mostrarProCate: Boolean = false;
  mostrarInputs : Boolean = false;

  //public listaAyuda : Array<ListaAyuda>;
  public listaAyuda: any;

  public listaStock : Array<ListaStock>;

  componenteModal: FormGroup;

  @Input() codigoSelec : String;

  precio1 : String = "";
  precio2 : String = "";
  precio3 : String = "";
  precio4 : String = "";
  precio5 : String = "";

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
              public activeModal: NgbActiveModal, public listaArtAyuda: ListaArticuloAyudaService,
              public stockAct : GetStocActualkArtService) { }

  ngOnInit() {
     //Modal
   this.componenteModal = this.formBuilder.group({
    coment :[],
    artiBuscar : [],
    modeloBuscar : [],
    proveedorBuscar : [],
    lineaBuscar: [],
    colorBuscar: [],
    subLineaBuscar: [],
    categoriaBuscar: [],
    stock : []
   });

   this.mepostListaAyuda();

   this.listaAyuda =[{
    "sCodigo": "0101ALNJ-CD-8008B",
    "sDescripcion": "INTEL PENTIUM III  733 MHZ.",
    "sModelo": "733 MHZ.",
    "sRefrencia": "0512010574",
    "dPrecio1": 57.73,
    "dPrecio2": 62.72,
    "dPrecio3": 67.2,
    "dPrecio4": 0,
    "dPrecio5": 0
},
{
    "sCodigo": "0101ALNJ-CD-8010B",
    "sDescripcion": "INTEL PENTIUM III 667MHz",
    "sModelo": "667MHZ",
    "sRefrencia": "",
    "dPrecio1": 53.12,
    "dPrecio2": 57.71,
    "dPrecio3": 61.84,
    "dPrecio4": 0,
    "dPrecio5": 0
},
{
    "sCodigo": "0101BGGRI-0046",
    "sDescripcion": "INTEL PENTIUM III 866 MHz",
    "sModelo": "866 MHZ",
    "sRefrencia": "893055018986",
    "dPrecio1": 68.21,
    "dPrecio2": 74.11,
    "dPrecio3": 79.4,
    "dPrecio4": 0,
    "dPrecio5": 0
},
{
    "sCodigo": "0101BGGRI-0348",
    "sDescripcion": "INTEL PENTIUM IV 1.8 GHz",
    "sModelo": "IV 1.8 GHZ",
    "sRefrencia": "",
    "dPrecio1": 809.01,
    "dPrecio2": 878.92,
    "dPrecio3": 941.7,
    "dPrecio4": 0,
    "dPrecio5": 0
}];

  }

  mostrarBotones(){
    this.mostrarLimpiar = true;
    this.mostrarFiltrar = false;
    this.mostrarSubLinea = true;
    this.mostrarOculto = false;
    this.mostrarLineColor = true;
    this.mostrarProCate = true;
    this.mostrarInputs = true;
  }

  cerrarCampos(){
    this.mostrarLimpiar = false;
    this.mostrarSubLinea = false;
    this.mostrarLineColor = false;
    this.mostrarProCate = false;
    this.mostrarInputs = false;
    this.mostrarFiltrar = true;
  }


  listaArticuloAyu : ListaArticuloAyudaIn;
  mepostListaAyuda():void{
    console.log("se ejecuta");
    let listaOut : ListaArticuloAyudaOut = new ListaArticuloAyudaOut();
    listaOut = new ListaArticuloAyudaOut();
    listaOut.sCodigoEmpresa="AC01";
    listaOut.sIdioma ="ES-VE";
    this.listaArtAyuda.asListaArtAyuda(listaOut).subscribe(art=>{
      this.listaArticuloAyu = art;

      console.log("lista",this.listaArticuloAyu);

      console.log("otra",this.listaArticuloAyu['ListaAyuda']);
      //this.listaAyuda = this.listaArticuloAyu['ListaAyuda'];
      //this.dtTrigger.next();

    }, error => {
      console.log(<any> error);
      });
  }

  obtenerCodigo(codigo: any): void{
    console.log("codigo",codigo);
    console.log(codigo['sCodigo']);
    this.codigoSelec = codigo['sCodigo'];
    this.precio1= codigo['dPrecio1'];
    this.precio2= codigo['dPrecio2'];
    this.precio3= codigo['dPrecio3'];
    this.precio4= codigo['dPrecio4'];
    this.precio5= codigo['dPrecio5'];
    this.mepostStockArt(codigo['sCodigo']);
  }

  listaStocArt : GetStocActualkArtIn;

  mepostStockArt(codigo:String): void{
    let listaStockOut : GetStocActualkArtOut = new GetStocActualkArtOut();
    listaStockOut = new GetStocActualkArtOut();
    listaStockOut.sCodigoArticulo = "1234";
    listaStockOut.sCodigoEmpresa="AC01";
    listaStockOut.sIdioma ="ES-VE";
    this.stockAct.asStockActual(listaStockOut).subscribe(stock =>{
      this.listaStocArt = stock;
      //this.listaStock = this.listaStocArt['ListaStock'];
      console.log("listaStock",this.listaStocArt);
    }, error => {
        console.log(<any> error);
        });
  }

  cerrar():void{
  this.activeModal.close({codigo:this.codigoSelec,precio:this.precio1});
  }
}
