import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepConBalanceGeneralService } from '../../../../../core/services/balance/repConBalanceGen.service';
import { Globals } from '../../../../../core/services/globals.service';
import { RepConBalanceGeneralIn } from '../../../../../abstract/DTO/in/reportesConBalance/repConBalanceGenIn';
import { Location } from '@angular/common';
import { PdfBalanceGeneralService } from '../../../../../core/services/exportables/contable/balance/pdf-balance-general.service';
import { TreeNode } from '../../../../../abstract/class/treeNode';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-detalle-balance-general-hijo',
  templateUrl: './detalle-balance-general-hijo.component.html',
  styleUrls: ['./detalle-balance-general-hijo.component.css']
})
export class DetalleBalanceGeneralHijoComponent implements OnInit, OnDestroy {
  title : String
  detalleReportin: RepConBalanceGeneralIn;
  detalleReport:  TreeNode[] = new Array<TreeNode>();
  repDev: Subscription;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public router: Router, 
    public repGen: RepConBalanceGeneralService,
    public pdf: PdfBalanceGeneralService,
    public global: Globals
  ) { }

  ngOnInit() {
    this.title = 'Balance general';
    this.route.queryParams.subscribe(params => {

      this.detalleReportin = new RepConBalanceGeneralIn();
      this.detalleReportin.Co_cue_D = params["accountF"];
      this.detalleReportin.Co_cue_H = params["accountU"];
      this.detalleReportin.Fecha = params["date"];
      this.detalleReportin.Co_cen_D = params["costF"];
      this.detalleReportin.Co_cen_H = params["costU"];
      this.detalleReportin.Co_gas_D = params["spendingF"];
      this.detalleReportin.Co_gas_H = params["spendingU"];
      this.detalleReportin.Co_adi_D = params["attributeF"];
      this.detalleReportin.Co_adi_H = params["attributeU"];
      this.detalleReportin.Co_aux_D = params["assistantF"];
      this.detalleReportin.Co_aux_H = params["assistantU"];
      this.detalleReportin.Tipo_comprobante = params["type"];
      this.detalleReportin.Cuenta_saldo = params["wbalance"];
      this.detalleReportin.Co_mone = params["coin"];
      this.detalleReportin.Nivel = params["level"];

    });

    this.metRep(this.detalleReportin);
  }

  
  metRep(repformin: RepConBalanceGeneralIn): void {
    this.global.showLoading();
    let msjerror; 
    this.repDev = this.repGen.repGeneral(repformin).subscribe(dev => {
      if(dev.RepBalanceGeneralResult.Error.toString()==""){
        msjerror = "No hay información para mostrar";
      }else{
        msjerror = dev.RepBalanceGeneralResult.Error.toString();
      }
      if (dev.RepBalanceGeneralResult.Error || dev.RepBalanceGeneralResult.Comprobacion.length == 0) {
        swal(
           dev.RepBalanceGeneralResult.Error ? "ERROR": "INFO", 
            msjerror, 
            dev.RepBalanceGeneralResult.Error ? "error": "info"
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


  transforArray(detalleReport: any): TreeNode[]{
    let  dataOut : TreeNode[] = new Array<TreeNode>();
   
    detalleReport.RepBalanceGeneralResult.Comprobacion.forEach(a=> {
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
    return dataOut;
  }


  
  getSaldoAAcum(): number {
    let acum: number = 0;
    if (this.detalleReport.length != 0){
      this.detalleReport.forEach(a => {
          acum += +a.data.saldoActual;
      });
    }
      return acum;
  }

  getAcum(str: String){
    let acum: Number = 0
    if (this.detalleReport.length != 0){
      this.detalleReport.forEach(a =>{
        if(a.data.desc == str)
          acum = a.data.saldoActual;
      })
    }
      return acum;
  }

  getIngresoEgreso(){
    let acum: Number = 0
    let ing: Number = 0
    let egr: Number = 0
    if (this.detalleReport.length != 0){
      this.detalleReport.forEach(a =>{
        if(a.data.desc == "INGRESOS")
          ing = a.data.saldoActual;
        if(a.data.desc == "COSTOS" || a.data.desc == "GASTOS" )
          egr =  +egr  + +a.data.saldoActual;
      })
      acum =  +ing - +egr;
    }
      return acum;
  }


  createPdf(){
    this.global.showLoading();
    this.pdf.pdfGeneral(this.detalleReport,this.detalleReportin);
    this.global.hideLoading();
  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }
}
