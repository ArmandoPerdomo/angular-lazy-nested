import { Component, OnInit, OnDestroy } from '@angular/core';
import { RepConBalanceComprobacionService } from '../../../../../core/services/contables/repConBalanceComprobacion.service';
import { RepConBalanceComprobacionIn } from '../../../../../abstract/DTO/in/reportesConBalance/repConBalanceComprobacionIn';
import { Globals } from '../../../../../core/services/globals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RepConBalanceComprobacionOut } from '../../../../../abstract/DTO/out/reportesContables/RepConBalanceComprobacion/RepConBalanceComprobacionOut';
import { PdfBalanceComprobacionService } from '../../../../../core/services/exportables/contable/balance/pdf-balance-comprobacion.service';
import { TreeNode } from '../../../../../abstract/class/treeNode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-balance-comprobacion',
  templateUrl: './detalle-balance-comprobacion.component.html',
  styleUrls: ['./detalle-balance-comprobacion.component.css']
})

export class DetalleBalanceComprobacionComponent implements OnInit, OnDestroy {
    
  title: string;
  detalleReportin: RepConBalanceComprobacionIn;
  detalleReport: RepConBalanceComprobacionOut;
  dataOut : TreeNode[] = new Array<TreeNode>();
  repDev: Subscription;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public router: Router, 
    public repCon: RepConBalanceComprobacionService,
    public pdf: PdfBalanceComprobacionService,
    public global: Globals 
  ) {}
  

  ngOnInit(){ 
    this.title = 'Balance de comprobación';
    
    this.route.queryParams.subscribe(params => {

      this.detalleReportin = new RepConBalanceComprobacionIn();
      this.detalleReportin.Co_cue_D = params["accountF"];
      this.detalleReportin.Co_cue_H = params["accountU"];
      this.detalleReportin.Fecha_D = params["dateF"];
      this.detalleReportin.Fecha_H = params["dateU"];
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
      this.detalleReportin.Exc_cta_orden = params["excludeA"];

    });
    this.metRep( this.detalleReportin);
  }

  transforArray(){
    this.dataOut = [];
   
    this.detalleReport.RepBalanceComprobacionResult.Comprobacion.forEach(a=> {
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
        this.dataOut.push(dataFirst);
    });
  }

  getSaldoIAcum(): number {
    let acum: number = 0;
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a => {
          acum += +a.data.saldoInicial;
      });
    }
      return acum;
  }

  getDebeAcum(): number {
    let acum: number = 0;
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a => {
          acum += +a.data.debe;
      });
    }
      return acum;
  }

  
  getHaberAcum(): number {
    let acum: number = 0;
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a => {
          acum += +a.data.haber;
      });
    }
      return acum;
  }

  getSaldoAAcum(): number {
    let acum: number = 0;
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a => {
          acum += +a.data.saldoActual;
      });
    }
      return acum;
  }

  getActivo(){
    let acum: Number = 0
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a =>{
        if(a.data.desc == "ACTIVOS")
          acum = a.data.saldoActual;
      })
    }
      return acum;
  }

  

  
  getPasivoCapital(){
    let acum: Number = 0
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a =>{
        if(a.data.desc == "PASIVOS")
          acum = a.data.saldoActual;
      })
    }
      return acum;
  }
  
  getIngresoEgreso(){
    let acum: Number = 0
    let ing: Number = 0
    let egr: Number = 0
    if (this.dataOut.length != 0){
      this.dataOut.forEach(a =>{
        if(a.data.desc == "INGRESOS")
          ing = a.data.saldoActual;
        if(a.data.desc == "COSTOS" || a.data.desc == "GASTOS" )
          egr =  +egr  + +a.data.saldoActual;
      })
      acum =  +ing - +egr;
    }
      return acum;
  }
  

  metRep(repformin: RepConBalanceComprobacionIn): void {
    this.global.showLoading();
    let msjerror; 
    this.repDev = this.repCon.repBalanceComp(repformin).subscribe(dev => {
      if(dev.RepBalanceComprobacionResult.Error.toString()==""){
        msjerror = "No hay información para mostrar";
      }else{
        msjerror = dev.RepBalanceComprobacionResult.Error.toString();
      }
      if (dev.RepBalanceComprobacionResult.Error || dev.RepBalanceComprobacionResult.Comprobacion.length == 0) {
        swal(
          dev.RepBalanceComprobacionResult.Error ? "ERROR": "INFO", 
          msjerror, 
          dev.RepBalanceComprobacionResult.Error ? "error": "info"
        )
          .then((value) => {
            if (value || value == null) {
              this.goBack();
              this.global.hideLoading();
         
            }
          });
        $(".swal-overlay").css('background-color', 'rgba(0,0,0,0.8)');

      } else {
  
        this.detalleReport = dev;
        this.global.hideLoading();
        this.transforArray();
      }
        
      },
      error => {

      }
    );
  }

  goBack() {
    this.location.back();
  }

  createPdf(){
    this.global.showLoading();
    this.pdf.pdfComprobacion(this.dataOut,this.detalleReportin);
    this.global.hideLoading();

  }

  ngOnDestroy(){
    this.global.hideLoading();
    this.repDev.unsubscribe();
  }

  
}
