import { Component, OnInit, OnDestroy } from '@angular/core';
import { Globals } from '../../../../../core/services/globals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RepConConBalanceGenCompIn } from '../../../../../abstract/DTO/in/reportesConBalance/repConBalanceGenCompIn';
import { RepConConBalanceGenCompOut } from '../../../../../abstract/DTO/out/reportesContables/RepConBalanceGeneralComparativo/RepConConBalanceGenCompOut';
import { RepConBalanceGeneralCompService } from '../../../../../core/services/contables/repConBalanceGeneralComp.service';
import { PdfContableMensualService } from '../../../../../core/services/exportables/contable/balance/pdf-ganancia-perdida-mensual.service';
import { Subscription } from 'rxjs';
import { TreeNodeM } from '../../../../../abstract/class/treeNode';

  
@Component({
  selector: 'app-detalle-balance-general-mensual',
  templateUrl: './detalle-balance-general-mensual.component.html',
  styleUrls: ['./detalle-balance-general-mensual.component.css']
})
export class DetalleBalanceGeneralMensualComponent implements OnInit, OnDestroy {

  title: string;
  detalleReportin: RepConConBalanceGenCompIn;
  detalleReportuot: RepConConBalanceGenCompOut;
  detalleReport:  TreeNodeM[] = new Array<TreeNodeM>(); 
  ahnos = [];
  total = [];
  repDev :Subscription;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public router: Router, 
    public repCon: RepConBalanceGeneralCompService,   
    public pdf: PdfContableMensualService,
    public global: Globals 
  ) {}
  

  ngOnInit(){ 
    this.title = 'Balance general mensual';
    this.route.queryParams.subscribe(params => {
      this.detalleReportin = new RepConConBalanceGenCompIn();
      this.detalleReportin.Co_cue_D = params["accountF"];
      this.detalleReportin.Co_cue_h = params["accountU"];
      this.detalleReportin.Fecha_D = params["dateF"];
      this.detalleReportin.Fecha_H = params["dateU"];
      this.detalleReportin.Co_cen_D = params["costF"];
      this.detalleReportin.Co_cen_h = params["costU"];
      this.detalleReportin.Co_gas_D = params["spendingF"];
      this.detalleReportin.Co_gas_h = params["spendingU"];
      this.detalleReportin.Co_adi_D = params["attributeF"];
      this.detalleReportin.Co_adi_h = params["attributeU"];
      this.detalleReportin.Co_aux_D = params["assistantF"];
      this.detalleReportin.Co_aux_h = params["assistantU"];
      this.detalleReportin.Tipo_comprobante = params["type"];
      this.detalleReportin.Cuenta_saldo = params["wbalance"];
      this.detalleReportin.Co_mone = params["coin"];
      this.detalleReportin.Nivel = params["level"];
      this.detalleReportin.Exc_cta_orden = params["excludeA"];
    });
    this.metRep( this.detalleReportin);
  }


  
  metRep(repformin: RepConConBalanceGenCompIn): void {
    this.global.showLoading();
    let msjerror; 
    this.repDev = this.repCon.repBalanceGenComp(repformin).subscribe(dev => {
      if(dev.RepBalanceGeneralComparativoResult.Error.toString()==""){
        msjerror = "No hay información para mostrar";
      }else{
        msjerror = dev.RepBalanceGeneralComparativoResult.Error.toString();
      }
      if (dev.RepBalanceGeneralComparativoResult.Error || dev.RepBalanceGeneralComparativoResult.Error == null || dev.RepBalanceGeneralComparativoResult.Ahnos.length == 0) {

        swal(
          dev.RepBalanceGeneralComparativoResult.Error ? "ERROR": "INFO", 
          msjerror,
          dev.RepBalanceGeneralComparativoResult.Error ? "error": "info"
        )
          .then((value) => {
            if (value || value == null) {
              this.goBack();
              this.global.hideLoading();
         
            }
          });
        $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');
        
      } else {
        this.detalleReport = this.transforArray(dev);
        this.ahnos = this.transforMonth(dev)
        this.total = this.acum(this.detalleReport, this.ahnos);
        this.global.hideLoading();
      }
        
      },
      error => {

      }
    );
  }

  goBack() {
    this.location.back();
  }

  transforArray(detalleReport: any): TreeNodeM[]{
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

    detalleReport.RepBalanceGeneralComparativoResult.Comprobacion.Registros.forEach(a=> {
      
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
    detalleReport.RepBalanceGeneralComparativoResult.Ahnos.forEach(a => {
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

  createPdf(){
    this.global.showLoading();
    this.pdf.pdfMensual(this.detalleReport, this.detalleReportin, this.ahnos , this.total,2);
    this.global.hideLoading();

  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
