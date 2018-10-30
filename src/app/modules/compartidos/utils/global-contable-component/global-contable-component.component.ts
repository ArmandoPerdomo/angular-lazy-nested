import { Component, OnInit, Input } from '@angular/core';
import { FormatoContable } from '../../../../abstract/DTO/formatocontable';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FormControlService } from '../../../../core/services/form-control.service';
import { ListaMonedaService } from '../../../../core/services/listas/lista-monedas.service';
import { ListaMonedasIn } from '../../../../abstract/DTO/in/listaMonedasIn';
import { Globals } from '../../../../core/services/globals.service';
import { RepConBalanceComprobacionIn } from '../../../../abstract/DTO/in/reportesConBalance/repConBalanceComprobacionIn';
import { RepConBalanceComprobacionService } from '../../../../core/services/contables/repConBalanceComprobacion.service';
import { PdfBalanceComprobacionService } from '../../../../core/services/exportables/contable/balance/pdf-balance-comprobacion.service';
import { ListaContableService } from '../../../../core/services/listas/section-mock/lista-contable.service';
import { DateConstPipe } from '../../../../core/pipes/date-const.pipe';
import { RepConBalanceGeneralIn } from '../../../../abstract/DTO/in/reportesConBalance/repConBalanceGenIn';
import { PdfBalanceGeneralService } from '../../../../core/services/exportables/contable/balance/pdf-balance-general.service';
import { RepConBalanceGeneralService } from '../../../../core/services/balance/repConBalanceGen.service';
import { repConGananciasYPerdidasIn } from '../../../../abstract/DTO/in/reportesConBalance/repConGananciasYPerdidasIn';
import { RepConGananciasyPerdidasService } from '../../../../core/services/contables/repConGananciasyPerdidas.service';
import { PdfGananciaPerdidaService } from '../../../../core/services/exportables/contable/balance/pdf-ganancia-perdida.service';
import { PdfContableMensualService } from '../../../../core/services/exportables/contable/balance/pdf-ganancia-perdida-mensual.service';
import { RepConConBalanceGenCompIn } from '../../../../abstract/DTO/in/reportesConBalance/repConBalanceGenCompIn';
import { RepConBalanceGeneralCompService } from '../../../../core/services/contables/repConBalanceGeneralComp.service';
import { repConGananciasYPerdidasMesesIn } from '../../../../abstract/DTO/in/reportesConBalance/repConGananciasYPerdidasCompIn';
import { RepConGananciasyPerdidasMesesService } from '../../../../core/services/contables/repConGananciasyPerdidasMeses.service';
import { TreeNodeM, TreeNode } from '../../../../abstract/class/treeNode';



const now = new Date();
@Component({
  selector: 'app-global-contable-component',
  templateUrl: './global-contable-component.component.html',
  styleUrls: ['./global-contable-component.component.css'],
  providers: [NgbDatepickerConfig] 
})

export class GlobalContableComponentComponent implements OnInit {

 
    //? Models
    accF: String;
    accU: String;
    cosF: String;
    cosU: String;
    speF: String;
    speU: String;
    attF: String;
    attU: String;
    assF: String;
    assU: String;
    tip: String;
    wbal: String;
    coi: String;
    lev: String;
    exa: String;
    vcl: String
    send = '';
    //? Fecha
    dat: NgbDateStruct;
    datF: NgbDateStruct;
    datU: NgbDateStruct;
    maxDate: NgbDateStruct;
    minDate: NgbDateStruct;

    //? formGroup
    generalContable: FormGroup
    //? Variales para combo
    accountCallback: Observable<any>;
    costCallback: Observable<any>;
    spendingCallback: Observable<any>;
    attributeCallback: Observable<any>;
    assistantCallback: Observable<any>;
    typeCallback: Observable<any>;
    wbalanceCallback: Observable<any>;
    coinCallback: Observable<any>;
    levelCallback: Observable<any>;
    excludeACallback: Observable<any>;
    voucherCloseCallback: Observable<any>;
  
  constructor(
    public router: Router,
    public formService: FormControlService,
    public lcoi: ListaMonedaService,
    public lcont: ListaContableService,
    public global: Globals,
    public pdfComp: PdfBalanceComprobacionService,
    public repComp: RepConBalanceComprobacionService,
    public pdfGen: PdfBalanceGeneralService,
    public repGen: RepConBalanceGeneralService,
    public repGP: RepConGananciasyPerdidasService,
    public pdfGP: PdfGananciaPerdidaService,
    public repBGC: RepConBalanceGeneralCompService, 
    public repGPM: RepConGananciasyPerdidasMesesService,
    public pdfMensual: PdfContableMensualService,
    public config: NgbDatepickerConfig,
    public datePipe : DateConstPipe) { }

  @Input() formatocontable: FormatoContable;


  ngOnInit() {
    this.send = '';
    this.datU = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.dat = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.minDate = {year: now.getFullYear()-20, month: now.getMonth() + 1, day: now.getDate()};
    this.datF = {year: now.getFullYear(), month: 1 , day: 1};

    //? Combo
    /*
    let lacc: ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.accountCallback = this.lacc.listaTipogeneralContable(lacc);

    let lcos: ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.costCallback = this.lcos.listaTipogeneralContable(lcos);

    let lspe ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.spendingCallback = this.lspe.listaTipogeneralContable(lspe);

    let latt: ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.attributeCallback = this.latt.listaTipogeneralContable(latt);

    let lass ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.assistantCallback = this.lass.listaTipogeneralContable(lass);

    let ltip: ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.typeCallback = this.ltp.listaTipogeneralContable(ltip);

    let lwban: ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.wbalanceCallback = this.lwban.listaTipogeneralContable(lwban);
  */
    let lcoi: ListaMonedasIn = new ListaMonedasIn();
    this.coinCallback = this.lcoi.listaMonedas(lcoi);
  
    this.levelCallback = this.lcont.listaNivel();
/*
    let lexa: ListaTipogeneralContableIn = new ListaTipogeneralContableIn();
    this.excludeACallback = this.lexa.listaTipogeneralContable(lexa);
  */
  


    this.generalContable = new FormGroup({
      accountF: new FormControl(''),
      accountU: new FormControl(''),
      dateF: new FormControl(this.datF, [Validators.required]),
      dateU: new FormControl(this.datU, [Validators.required]),
      date: new FormControl(this.dat, [Validators.required]),
      costF: new FormControl(''),
      costU: new FormControl(''),
      spendingF: new FormControl(''),
      spendingU: new FormControl(''),
      attributeF: new FormControl(''),
      attributeU: new FormControl(''),
      assistantF: new FormControl(''),
      assistantU: new FormControl(''),
      type: new FormControl(''),
      wbalance: new FormControl(''),
      coin: new FormControl(''),
      level: new FormControl(''),
      excludeA: new FormControl(''),
      voucherClose: new FormControl(''),
      sendTo: new FormControl('', [Validators.required])   
   });
    
  }
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  
  cleanAccount(code: String) {
    this.accU = code;
    this.accF = code;
  }
  cleanCost(code: String) {
    this.cosF = code;
    this.cosU = code;
  }
  cleanSpending(code: String) {
    this.speF = code;
    this.speU = code;
  }
  cleanAttribute(code: String) {
    this.attF = code;
    this.attU = code;
  }
  cleanAssistan(code: String) {
    this.assF = code;
    this.assU = code;
  } 
  cleanType(code: String) {
    this.tip = code;
  } 
  cleanWBalance(code: String) {
    this.wbal = code;
  } 
  cleanCoin(code: String) {
    this.coi = code;
  } 
  cleanLevel(code: String) {
    this.lev = code;
  } 
  cleanExclude(code: String) {
    this.exa = code;
  } 
  cleanVClose(code: String) {
    this.vcl = code;
  } 

  clean(){
    this.cleanAccount(null);
    this.cleanCost(null);
    this.cleanSpending(null);
    this.cleanAttribute(null);
    this.cleanAssistan(null);
    this.cleanType(null);
    this.cleanWBalance(null);
    this.cleanCoin(null);
    this.cleanLevel(null);
    this.cleanExclude(null);
    this.cleanVClose(null);
    this.datU = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.dat = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.datF = {year: now.getFullYear(), month: 1 , day: 1};
  }

  accept(){
    let datef = this.datePipe.transform(this.generalContable.value.dateF, "fullstring");
    let dateu = this.datePipe.transform(this.generalContable.value.dateU, "fullstring");
    let date = this.datePipe.transform(this.generalContable.value.dateU, "fullstring");
    this.formService.markFormGroupTouched(this.generalContable);
    if(this.generalContable.valid){
      if (this.generalContable.value["sendTo"] == "Listado" && this.validarFecha(this.generalContable.value["dateF"] , this.generalContable.value["dateU"])){
        
        this.generalContable.controls["dateF"].setValue(datef);
        this.generalContable.controls["dateU"].setValue(dateu);
        this.generalContable.controls["date"].setValue(date);
        this.router.navigate([`${this.router.url}/detalle`], { queryParams: this.generalContable.value });
      }else if(this.generalContable.value["sendTo"] == "PDF" && this.validarFecha(this.generalContable.value["dateF"] , this.generalContable.value["dateU"])){
        this.createPDF();
      }
    }else{
      if (this.generalContable.value["sendTo"] == "") {
        swal("", "Debe seleccionar una opción válida", "info")
          .then((value) => {
            if (value || value == null) {

            }
        });
      }
    }
    
  }

  createPDF(){
    this.global.showLoading();
    
    let datef = this.datePipe.transform(this.generalContable.value.dateF, "fullstring");
    let dateu = this.datePipe.transform(this.generalContable.value.dateU, "fullstring");
    let date = this.datePipe.transform(this.generalContable.value.dateU, "fullstring");
 
    switch(this.formatocontable.type){
      case "comp":
      {
        let detalleReportin: RepConBalanceComprobacionIn = new RepConBalanceComprobacionIn();

        detalleReportin.Co_cue_D = this.generalContable.value["accountF"];
        detalleReportin.Co_cue_H = this.generalContable.value["accountU"];
        detalleReportin.Fecha_D = datef;
        detalleReportin.Fecha_H = dateu;
        detalleReportin.Co_cen_D = this.generalContable.value["costF"];
        detalleReportin.Co_cen_H = this.generalContable.value["costU"];
        detalleReportin.Co_gas_D = this.generalContable.value["spendingF"];
        detalleReportin.Co_gas_H = this.generalContable.value["spendingU"];
        detalleReportin.Co_adi_D = this.generalContable.value["attributeF"];
        detalleReportin.Co_adi_H = this.generalContable.value["attributeU"];
        detalleReportin.Co_aux_D = this.generalContable.value["assistantF"];
        detalleReportin.Co_aux_H = this.generalContable.value["assistantU"];
        detalleReportin.Tipo_comprobante = this.generalContable.value["type"];
        detalleReportin.Cuenta_saldo = this.generalContable.value["wbalance"];
        detalleReportin.Co_mone = this.generalContable.value["coin"];
        detalleReportin.Nivel = this.generalContable.value["level"];
        detalleReportin.Exc_cta_orden = this.generalContable.value["excludeA"];
        let msjerror;
        this.repComp.repBalanceComp(detalleReportin).subscribe(dev => {
          if(dev.RepBalanceComprobacionResult.Error.toString()==""){
            msjerror = "No hay información para mostrar";
          }else{
            msjerror = dev.RepBalanceComprobacionResult.Error.toString();
          }
          if (dev.RepBalanceComprobacionResult.Error || dev.RepBalanceComprobacionResult.Comprobacion.length == 0) {
            swal(
              dev.RepBalanceComprobacionResult.Error ? "ERROR": "INFO", 
              msjerror,
              dev.RepBalanceComprobacionResult.Error ?  "error": "info"
              )
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
             
                }
              });
    
          } else {
            this.pdfComp.pdfComprobacion(this.transforArrayComp(dev), detalleReportin);
            this.global.hideLoading();
          }
            
          },
          error => {
    
          }
        );

      }
      break;
      case "gnral":
      {
        let detalleReportin: RepConBalanceGeneralIn = new RepConBalanceGeneralIn();
        detalleReportin.Co_cue_D = this.generalContable.value["accountF"];
        detalleReportin.Co_cue_H = this.generalContable.value["accountU"];
        detalleReportin.Fecha = date;
        detalleReportin.Co_cen_D = this.generalContable.value["costF"];
        detalleReportin.Co_cen_H = this.generalContable.value["costU"];
        detalleReportin.Co_gas_D = this.generalContable.value["spendingF"];
        detalleReportin.Co_gas_H = this.generalContable.value["spendingU"];
        detalleReportin.Co_adi_D = this.generalContable.value["attributeF"];
        detalleReportin.Co_adi_H = this.generalContable.value["attributeU"];
        detalleReportin.Co_aux_D = this.generalContable.value["assistantF"];
        detalleReportin.Co_aux_H = this.generalContable.value["assistantU"];
        detalleReportin.Tipo_comprobante = this.generalContable.value["type"];
        detalleReportin.Cuenta_saldo = this.generalContable.value["wbalance"];
        detalleReportin.Co_mone = this.generalContable.value["coin"];
        detalleReportin.Nivel = this.generalContable.value["level"];
        let msjerror; 
        this.repGen.repGeneral(detalleReportin).subscribe(dev => {
          if(dev.RepBalanceGeneralResult.Error.toString()==""){
            msjerror = "No hay información para mostrar";
          }else{
            msjerror = dev.RepBalanceGeneralResult.Error.toString();
          } 
          if (dev.RepBalanceGeneralResult.Error || dev.RepBalanceGeneralResult.Comprobacion.length == 0) {
            swal(
              dev.RepBalanceGeneralResult.Error ? "ERROR": "INFO", 
              msjerror,
              dev.RepBalanceGeneralResult.Error ?  "error": "info"          
              )
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
             
                }
              });
    
          } else {
            this.pdfGen.pdfGeneral(this.transforArray(dev.RepBalanceGeneralResult) , detalleReportin);
            this.global.hideLoading();
          }
            
          },
          error => {
    
          }
        );
      }
      break;
      case "gnralm":
      {
         let detalleReportin: RepConConBalanceGenCompIn = new RepConConBalanceGenCompIn();
          detalleReportin.Co_cue_D = this.generalContable.value["accountF"];
          detalleReportin.Co_cue_h = this.generalContable.value["accountU"];
          detalleReportin.Fecha_D = datef
          detalleReportin.Fecha_H = dateu
          detalleReportin.Co_cen_D = this.generalContable.value["costF"];
          detalleReportin.Co_cen_h = this.generalContable.value["costU"];
          detalleReportin.Co_gas_D = this.generalContable.value["spendingF"];
          detalleReportin.Co_gas_h = this.generalContable.value["spendingU"];
          detalleReportin.Co_adi_D = this.generalContable.value["attributeF"];
          detalleReportin.Co_adi_h = this.generalContable.value["attributeU"];
          detalleReportin.Co_aux_D = this.generalContable.value["assistantF"];
          detalleReportin.Co_aux_h = this.generalContable.value["assistantU"];
          detalleReportin.Tipo_comprobante = this.generalContable.value["type"];
          detalleReportin.Cuenta_saldo = this.generalContable.value["wbalance"];
          detalleReportin.Co_mone = this.generalContable.value["coin"];
          detalleReportin.Nivel = this.generalContable.value["level"];
          detalleReportin.Exc_cta_orden = this.generalContable.value["excludeA"];
          let msjerror; 
          this.repBGC.repBalanceGenComp(detalleReportin).subscribe(dev => {
            if(dev.RepBalanceGeneralComparativoResult.Error.toString()==""){
              msjerror = "No hay información para mostrar";
            }else{
              msjerror = dev.RepBalanceGeneralComparativoResult.Error.toString();
            } 
            if (dev.RepBalanceGeneralComparativoResult.Error || dev.RepBalanceGeneralComparativoResult.Ahnos.length == 0) {
              swal(
                dev.RepBalanceGeneralComparativoResult.Error ? "ERROR": "INFO", 
               msjerror,
               dev.RepBalanceGeneralComparativoResult.Error ?  "error": "info"
              )
                .then((value) => {
                  if (value || value == null) {
                    this.global.hideLoading();
              
                  }
                });
              $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');
      
            } else {
              let detalleReport = this.transforArrayMensual(dev.RepBalanceGeneralComparativoResult.Comprobacion.Registros);
              let ahnos = this.transforMonth(dev.RepBalanceGeneralComparativoResult)
              let total = this.acum(detalleReport, ahnos);
              this.pdfMensual.pdfMensual(detalleReport, detalleReportin, ahnos,total,2);
              this.global.hideLoading();
            }
              
          }, error => {});

      }
      break;
      case "ganper":
      {
        let detalleReportin: repConGananciasYPerdidasIn = new repConGananciasYPerdidasIn();

        detalleReportin.Co_cue_D = this.generalContable.value["accountF"];
        detalleReportin.Co_cue_H = this.generalContable.value["accountU"];
        detalleReportin.Fecha_D = datef;
        detalleReportin.Fecha_H = dateu;
        detalleReportin.Co_cen_D = this.generalContable.value["costF"];
        detalleReportin.Co_cen_H = this.generalContable.value["costU"];
        detalleReportin.Co_gas_D = this.generalContable.value["spendingF"];
        detalleReportin.Co_gas_H = this.generalContable.value["spendingU"];
        detalleReportin.Co_adi_D = this.generalContable.value["attributeF"];
        detalleReportin.Co_adi_H = this.generalContable.value["attributeU"];
        detalleReportin.Co_aux_D = this.generalContable.value["assistantF"];
        detalleReportin.Co_aux_H = this.generalContable.value["assistantU"];
        detalleReportin.Tipo_comprobante = this.generalContable.value["type"];
        detalleReportin.Cuenta_saldo = this.generalContable.value["wbalance"];
        detalleReportin.Co_mone = this.generalContable.value["coin"];
        detalleReportin.Nivel = this.generalContable.value["level"];
        detalleReportin.Exc_cta_orden = this.generalContable.value["excludeA"];
        detalleReportin.Com_cierre = this.generalContable.value["voucherClose"];
        let msjerror;
        this.repGP.repGananciasyPerdidas(detalleReportin).subscribe(dev => {
          if(dev.RepGananciasyPerdidasResult.Error.toString()==""){
            msjerror = "No hay información para mostrar";
          }else{
            msjerror = dev.RepGananciasyPerdidasResult.Error.toString();
          }
          if (dev.RepGananciasyPerdidasResult.Error || dev.RepGananciasyPerdidasResult.Comprobacion.length == 0) {
            swal(
              dev.RepGananciasyPerdidasResult.Error ? "ERROR": "INFO", 
              msjerror,
              dev.RepGananciasyPerdidasResult.Error ?  "error": "info"
            )
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
             
                }
              });
    
          } else {
            console.log(dev.RepGananciasyPerdidasResult)
            this.pdfGP.pdfGanPer(this.transforArray(dev.RepGananciasyPerdidasResult), detalleReportin);
            this.global.hideLoading();
          }
            
          },
          error => {
    
          }
        );

      }
      break;
      case "ganperm":
      {
        var detalleReportin: repConGananciasYPerdidasMesesIn = new repConGananciasYPerdidasMesesIn();
        detalleReportin.Co_cue_D = this.generalContable.value["accountF"];
        detalleReportin.Co_cue_H = this.generalContable.value["accountU"];
        detalleReportin.Fecha_D = datef;
        detalleReportin.Fecha_H = dateu;
        detalleReportin.Co_cen_D = this.generalContable.value["costF"];
        detalleReportin.Co_cen_H = this.generalContable.value["costU"];
        detalleReportin.Co_gas_D = this.generalContable.value["spendingF"];
        detalleReportin.Co_gas_H = this.generalContable.value["spendingU"];
        detalleReportin.Co_adi_D = this.generalContable.value["attributeF"];
        detalleReportin.Co_adi_H = this.generalContable.value["attributeU"];
        detalleReportin.Co_aux_D = this.generalContable.value["assistantF"];
        detalleReportin.Co_aux_H = this.generalContable.value["assistantU"];
        detalleReportin.Tipo_comprobante = this.generalContable.value["type"];
        detalleReportin.Cuenta_saldo = this.generalContable.value["wbalance"];
        detalleReportin.Co_mone = this.generalContable.value["coin"];
        detalleReportin.Nivel = this.generalContable.value["level"];
        detalleReportin.Exc_cta_orden = this.generalContable.value["excludeA"];
        detalleReportin.Com_cierre = this.generalContable.value["voucherClose"];
        let msjerror
        this.repGPM.repConGananciasyPerdidas(detalleReportin).subscribe(dev => {
          if(dev.RepGananciasyPerdidasMesesResult.Error.toString()==""){
            msjerror = "No hay información para mostrar";
          }else{
            msjerror = dev.RepGananciasyPerdidasMesesResult.Error.toString();
          }
          if (dev.RepGananciasyPerdidasMesesResult.Error || dev.RepGananciasyPerdidasMesesResult.Columnas == 0) {
            swal(    
              dev.RepGananciasyPerdidasMesesResult.Error ? "ERROR": "INFO", 
              msjerror,
              dev.RepGananciasyPerdidasMesesResult.Error ?  "error": "info"
            )
              .then((value) => {
                if (value || value == null) {
                  this.global.hideLoading();
             
                }
              });
    
          } else {
            let detalleReport = this.transforArrayMensual(dev.RepGananciasyPerdidasMesesResult.GananPerdiVariosMeses);
            let ahnos = this.transforMonth(dev.RepGananciasyPerdidasMesesResult)
            let total = this.acum(detalleReport, ahnos);
            this.pdfMensual.pdfMensual(detalleReport, detalleReportin, ahnos,total);
            this.global.hideLoading();
            
          }
            
          },
          error => {
    
          }
        );
        

      }
      break;
    }
  }

  changeAccount(code: String) {
    this.accU = code;
  }

  changeCost(code: String) {
    this.cosU = code;
  }

  changeSpending(code: String) {
    this.speU = code;
  }

  changeAttribute(code: String) {
    this.attU = code;
  }

  changeAssistan(code: String) {
    this.assU = code;
  }

  validarFecha(dateD, dateH): boolean{
    if (dateD > dateH)
      return false;
    else
      return true;
  }

  transforArrayComp(detalleReport: any):TreeNode[]{
    let dataOut : TreeNode[] = new Array<TreeNode>();
   
    detalleReport.RepBalanceComprobacionResult.Comprobacion.forEach(a=> {
      let dataFirst : TreeNode = new TreeNode;

      //Inicializando acumuladores del nivel 1
      let acumSaldo = 0;
      let acumDebe = 0;
      let acumHaber = 0;
      let acumActual = 0;

      a.Registro.forEach(b => {
        let dataSecond : TreeNode  = new TreeNode;

        //Inicializando acumuladores del nivel 2
        let acumSaldo2 = 0;
        let acumDebe2 = 0;
        let acumHaber2 = 0;
        let acumActual2 = 0;

        b.Clasificacion.forEach(c => {
          let dataThird: TreeNode  = new TreeNode;
          
          //Inicializando acumuladores del nivel 3
          let acumSaldo3 = 0;
          let acumDebe3 = 0;
          let acumHaber3 = 0;
          let acumActual3 = 0;

          c.SubClasificacion.forEach(d=> {      
            let dataFourth: TreeNode  = new TreeNode;

            //Acumulando montos del 3nivel
            acumSaldo3 = +acumSaldo3 + +d.Saldo_inicial;
            acumDebe3 = +acumDebe3 + +d.Debe;
            acumHaber3 = +acumHaber3 + +d.Haber;
            acumActual3 = +acumActual3 + +d.Saldo_renglon;

            //Añadiendo los informacion al 4nivel
            dataFourth.data.code = d.Co_cue;
            dataFourth.data.desc = d.Des_cue;
            dataFourth.data.saldoInicial = d.Saldo_inicial;
            dataFourth.data.debe = d.Debe;
            dataFourth.data.haber = d.Haber;
            dataFourth.data.saldoActual = d.Saldo_renglon;

            //insertando el 4nivel
            dataThird.children.push(dataFourth);
          })

          //Acumulando montos del 2nivel
          acumSaldo2 =  +acumSaldo2 + +acumSaldo3;
          acumDebe2 = +acumDebe2 + +acumDebe3 ;
          acumHaber2 = +acumHaber2 + +acumHaber3;
          acumActual2 = +acumActual2  + +acumActual3;

          //Añadiendo los informacion al 3nivel
          dataThird.data.code = c.Co_Adi;
          dataThird.data.desc = c.Des_Adi;
          dataThird.data.saldoInicial = acumSaldo3;
          dataThird.data.debe = acumDebe3;
          dataThird.data.haber = acumHaber3;
          dataThird.data.saldoActual = acumActual3;

          //insertando el 3nivel
          dataSecond.children.push(dataThird);
        });
        
        //Acumulando montos del 1nivel
        acumSaldo = +acumSaldo + + +acumSaldo2;
        acumDebe = +acumDebe + +acumDebe2;
        acumHaber = +acumHaber + +acumHaber2;
        acumActual = +acumActual  + +acumActual2;

        //Añadiendo los informacion al 2nivel
        dataSecond.data.code = b.Co_gas;
        dataSecond.data.desc = b.Des_gas;
        dataSecond.data.saldoInicial = acumSaldo2;
        dataSecond.data.debe = acumDebe2;
        dataSecond.data.haber = acumHaber2;
        dataSecond.data.saldoActual = acumActual2;

        //insertando el 2nivel
        dataFirst.children.push(dataSecond);
      });
        //Añadiendo los informacion al 1nivel
        dataFirst.data.code = a.Co_cen;
        dataFirst.data.desc = a.Des_cen;
        dataFirst.data.saldoInicial = acumSaldo;
        dataFirst.data.debe = acumDebe;
        dataFirst.data.haber = acumHaber;
        dataFirst.data.saldoActual = acumActual;

        //insertando el 1nivel
        dataOut.push(dataFirst);
    });
    return dataOut
  }
  

  transforArray(detalleReport: any): TreeNode[]{
    var dataOut : TreeNode[] = new Array<TreeNode>();
    
    detalleReport.Comprobacion.forEach(a=> {
      let dataFirst : TreeNode = new TreeNode;

      //Inicializando acumuladores del nivel 1
      let acumActual = 0;

      a.Registro.forEach(b => {
        let dataSecond : TreeNode  = new TreeNode;

        //Inicializando acumuladores del nivel 2
        let acumActual2 = 0;

        b.Clasificacion.forEach(c => {
          let dataThird: TreeNode  = new TreeNode;
          
          //Inicializando acumuladores del nivel 3
          let acumActual3 = 0;

          c.SubClasificacion.forEach(d=> {      
            let dataFourth: TreeNode  = new TreeNode;

            //Acumulando montos del 3nivel
            acumActual3 = +acumActual3 + +d.Saldo_actual;

            //Añadiendo los informacion al 4nivel
            dataFourth.data.code = d.Co_cue;
            dataFourth.data.desc = d.Des_cue;
            dataFourth.data.saldoActual = d.Saldo_actual;

            //insertando el 4nivel
            dataThird.children.push(dataFourth);
          })

          //Acumulando montos del 2nivel
          acumActual2 =  +acumActual2 + +acumActual3;

          //Añadiendo los informacion al 3nivel
          dataThird.data.code = c.Co_adi;
          dataThird.data.desc = c.Des_adi;
          dataThird.data.saldoActual = acumActual2;

          //insertando el 3nivel
          dataSecond.children.push(dataThird);
        });
        
        //Acumulando montos del 1nivel
        acumActual = +acumActual  + +acumActual2;

        //Añadiendo los informacion al 2nivel
        dataSecond.data.code = b.Co_gas;
        dataSecond.data.desc = b.Des_gas;
        dataSecond.data.saldoActual = acumActual2;

        //insertando el 2nivel
        dataFirst.children.push(dataSecond);
      });
        //Añadiendo los informacion al 1nivel
        dataFirst.data.code = a.Co_cen;
        dataFirst.data.desc = a.Des_cen;
        dataFirst.data.saldoActual = acumActual;

        //insertando el 1nivel
        dataOut.push(dataFirst);
    });

    return dataOut
  }

  transforArrayMensual(detalleReport: any): TreeNodeM[]{
    let  dataOut: TreeNodeM[] = new Array<TreeNodeM>();
    let lastFirstLevel_Co_Cue = "";
    let lastSecondLevel_Co_Cue ="";  
    let lastThirdLevel_Co_Cue = "";  
    let lastFourthLevel_Co_Cue = "";    
   // let lastFirstLevel_Co_Cue = "";  
   let lastWord1 = null;   
   let lastWord2 = null;   
   let lastWord3 = null;   
   let lastWord4 = null;   
   let dataFirst : TreeNodeM = new TreeNodeM;
   let dataSecond : TreeNodeM = new TreeNodeM;
   let dataThird : TreeNodeM = new TreeNodeM;
   let dataFourth : TreeNodeM = new TreeNodeM;

    detalleReport.forEach(a=> {
      
      if(a.Co_cue.trim().length == 2){
        dataFirst = new TreeNodeM;

        dataFirst.data.code = a.Co_cue;
        dataFirst.data.desc = a.Des_cue;
        dataFirst.data.yeari = a.Saldo_actual;

        lastFirstLevel_Co_Cue = a.Co_cue.trim();

       

      }else {
        if(a.Co_cue.trim().length == 4){
          dataSecond  = new TreeNodeM;

          dataSecond.data.code = a.Co_cue;
          dataSecond.data.desc = a.Des_cue;
          dataSecond.data.yeari = a.Saldo_actual;

          lastSecondLevel_Co_Cue = a.Co_cue.trim();  
         

        }else{
          if(a.Co_cue.trim().length == 7){
            dataThird  = new TreeNodeM;
  
            dataThird.data.code = a.Co_cue;
            dataThird.data.desc = a.Des_cue;
            dataThird.data.yeari = a.Saldo_actual;

            lastThirdLevel_Co_Cue = a.Co_cue.trim();
           

          }else{
            dataFourth  = new TreeNodeM;

            dataFourth.data.code = a.Co_cue;
            dataFourth.data.desc = a.Des_cue;
            dataFourth.data.yeari = a.Saldo_actual;
            
            lastFourthLevel_Co_Cue = a.Co_cue.trim();
          }
        }
      }

      if(lastWord4 != lastFourthLevel_Co_Cue)
          dataThird.children.push(dataFourth);

      if(lastWord3 != lastThirdLevel_Co_Cue && lastThirdLevel_Co_Cue.substring(0,1) == lastFirstLevel_Co_Cue.substring(0,1) && lastSecondLevel_Co_Cue.substring(0,1) == lastThirdLevel_Co_Cue.substring(0,1))
          dataSecond.children.push(dataThird);

      if(lastWord2 != lastSecondLevel_Co_Cue && lastSecondLevel_Co_Cue.substring(0,1) == lastFirstLevel_Co_Cue.substring(0,1))
          dataFirst.children.push(dataSecond);

      if (lastWord1 != lastFirstLevel_Co_Cue){
        dataOut.push(dataFirst);
      }
          

      lastWord1 = lastFirstLevel_Co_Cue;
      lastWord2 = lastSecondLevel_Co_Cue;
      lastWord3 = lastThirdLevel_Co_Cue;
      lastWord4 = lastFourthLevel_Co_Cue; 
      
    });
    return dataOut;
  }

  

  transforMonth(detalleReport: any):any{
    let arrayMonth = [];
    detalleReport.Ahnos.forEach(a => {
      let month;
      month = a.split('|');
      let y = month[0];
      let m = month[1];
      if(m == 'January')
        arrayMonth.push(y+'|Enero');
      if(m == 'February')
        arrayMonth.push(y+'|Febrero');
      if(m == 'March')
        arrayMonth.push(y+'|Marzo');
      if(m == 'April')
        arrayMonth.push(y+'|Abril');
      if(m == 'May')
        arrayMonth.push(y+'|Mayo');
      if(m == 'June')
        arrayMonth.push(y+'|Junio');
      if(m == 'July')
        arrayMonth.push(y+'|Julio');
      if(m == 'August')
        arrayMonth.push(y+'|Agosto');
      if(m == 'September')
        arrayMonth.push(y+'|Septiembre');
      if(m == 'October')
        arrayMonth.push(y+'|Octubre');
      if(m == 'November')
        arrayMonth.push(y+'|Noviembre');
      if(m == 'December')
        arrayMonth.push(y+'|Diciembre');

    });
    return arrayMonth;
  }

  acum(detalle: any, ahnos: any): any{
    let arrayAcum = [];
    let i = 0;

    ahnos.forEach(a => {
      let acum = 0

      detalle.forEach(b => {

        b.data.yeari.forEach((c , index )=> {
          if(i == index){
            acum = +acum + + c;
          }   
          
        });

      });
      
      arrayAcum.push(acum);
      i++;
    });

    return arrayAcum;
  }
  
}
