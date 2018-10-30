import { Component, OnInit } from '@angular/core';
import { repConGananciasYPerdidasIn } from '../../../../../abstract/DTO/in/reportesConBalance/repConGananciasYPerdidasIn';
import { Location } from '@angular/common';
import { RepConGananciasyPerdidasService } from '../../../../../core/services/contables/repConGananciasyPerdidas.service';
import { Globals } from '../../../../../core/services/globals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfGananciaPerdidaService } from '../../../../../core/services/exportables/contable/balance/pdf-ganancia-perdida.service';
import { TreeNode } from '../../../../../abstract/class/treeNode';
 

@Component({
  selector: 'app-detalle-ganancia-perdida',
  templateUrl: './detalle-ganancia-perdida.component.html',
  styleUrls: ['./detalle-ganancia-perdida.component.css']
})
export class DetalleGananciaPerdidaComponent implements OnInit {
  title : String
  detalleReportin: repConGananciasYPerdidasIn;
  detalleReport:  TreeNode[] = new Array<TreeNode>();
 

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public router: Router, 
    public repGP: RepConGananciasyPerdidasService,
    public pdf: PdfGananciaPerdidaService,
    public global: Globals
  ) { }

  ngOnInit() {
    this.title = 'Ganancias y pérdidas';
    this.route.queryParams.subscribe(params => {

      this.detalleReportin = new repConGananciasYPerdidasIn();
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
      this.detalleReportin.Com_cierre = params["voucherClose"];
    });
    this.metRep(this.detalleReportin);
  }

  goBack() {
    this.location.back();
  }

  metRep(repformin: repConGananciasYPerdidasIn): void {
    this.global.showLoading();
    let msjerror; 
    this.repGP.repGananciasyPerdidas(repformin).subscribe(dev => {
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


  transforArray(detalleReport: any): TreeNode[]{
    let  dataOut : TreeNode[] = new Array<TreeNode>();
   
    detalleReport.RepGananciasyPerdidasResult.Comprobacion.forEach(a=> {
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

  
  createPdf(){
    this.global.showLoading();
    this.pdf.pdfGanPer(this.detalleReport,this.detalleReportin);
    this.global.hideLoading();
  }
}
