import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ReporteGerencialIn } from '../../../../abstract/DTO/in/reportesGerencial/reporteGerencialIn';
import { RepGenTodosAdminService } from '../../../../core/services/gerencial/repGenTodosAdmin.service';
import { ListaMonedaService } from '../../../../core/services/listas/lista-monedas.service';
import { FormatoGerencial } from '../../../../abstract/DTO/formatogerencial';
import { ListaMonedasIn } from '../../../../abstract/DTO/in/listaMonedasIn';
import { UserTokenService } from '../../../../core/services/user-token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GraficoComponent } from './grafico/grafico.component';
import { GraficoFavComponent } from './grafico-fav/grafico-fav.component';
import { formatoTableG } from '../../../../abstract/class/formatoTableG';

@Component({
  selector: 'app-global-gerencial',
  templateUrl: './global-gerencial.component.html',
  styleUrls: ['./global-gerencial.component.css'],
})
export class GlobalGerencialComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart;
  @Input() formatogerencial: FormatoGerencial;
  selected = new FormControl(0);

  reptodosAdmin: ReporteGerencialIn;
  reporteGerencialIn = new ReporteGerencialIn();

  days: any = [];
  months: any = [];
  years: any = [];
  weeks: any = [];

  monedaCallback: Observable < any > ;
  gerencial: FormGroup;
  monedaC: String;

  loading: boolean = false;
  carga: boolean = false;



  constructor(
    private gerencialService: RepGenTodosAdminService,
    public monedaService: ListaMonedaService,
    public userToken: UserTokenService,
    private modalService: NgbModal, 
  ) {}


  open() {
    const modalRef = this.modalService.open(GraficoComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.days = this.days;
    modalRef.componentInstance.months = this.months;
    modalRef.componentInstance.years = this.years;
    modalRef.componentInstance.weeks = this.weeks;
  }
  

  openfav() {
    this.modalService.open(GraficoFavComponent, {
    size: 'lg'
  });
  }


  ngOnInit() {
    //this.loadGrid();
    let lmon: ListaMonedasIn = new ListaMonedasIn();
    this.monedaCallback = this.monedaService.listaMonedas(lmon);
    this.gerencial = new FormGroup({
      moneda: new FormControl('')
    })
  }


  /**
   * Calcula el total de cada columna (Costos,Depósitos,Pagos,Ordenes de Compra)
   * @param object 
   * @param col 
   */
  sum(object, col: string): number {
    let tmpSum: number = 0
    for (let i = 0; i < object.length; i++) {
      tmpSum += object[i][col];
    }
    return tmpSum
  }



  /**
   * Actualiza los arrays que carga el reporte al cambiar la moneda en el combo
   * @param codigo 
   */
  doUpdate(codigo: String) {
    this.reporteGerencialIn.Moneda = codigo
    this.loading = true;
    this.carga = false;
    switch(this.formatogerencial.type){
      case 'venta':{
        this.reporteGerencialIn.Tipo = 1;
        this.gerencialService.repTodosAdmin(this.reporteGerencialIn).subscribe(res => {
          let body = res;
          this.days =this.transforWeek( body.ReumenGerencialResult.ResumenGerencial.Dias.Dias);;
          this.weeks = body.ReumenGerencialResult.ResumenGerencial.Semana.Semana;
          this.months = this.transforMonth( body.ReumenGerencialResult.ResumenGerencial.Meses.Meses);;
          this.years = body.ReumenGerencialResult.ResumenGerencial.Ahhos.Ahhos;
          this.loading = false;
          this.carga = true;

        })
      }break;
      case 'compra':{

        this.reporteGerencialIn.Tipo = 2;
        this.gerencialService.repTodosAdmin(this.reporteGerencialIn).subscribe(res => {
          let body = res;
          this.days =this.transforWeek( body.ReumenGerencialResult.ResumenGerencial.Dias.Dias);
          this.weeks = body.ReumenGerencialResult.ResumenGerencial.Semana.Semana
          this.months = this.transforMonth( body.ReumenGerencialResult.ResumenGerencial.Meses.Meses);
          this.years = body.ReumenGerencialResult.ResumenGerencial.Ahhos.Ahhos
          this.loading = false;
          this.carga = true;

        })
      }break;
      case 'tesoreria':{
        this.reporteGerencialIn.Tipo = 3;

        this.gerencialService.repTodosAdmin(this.reporteGerencialIn).subscribe(res => {
          let body = res;
          this.days =this.transforWeek( body.ReumenGerencialResult.ResumenGerencial.Dias.Dias);
          this.weeks = body.ReumenGerencialResult.ResumenGerencial.Semana.Semana;
          this.months = this.transforMonth( body.ReumenGerencialResult.ResumenGerencial.Meses.Meses);
          this.years = body.ReumenGerencialResult.ResumenGerencial.Ahhos.Ahhos;
          this.loading = false;
          this.carga = true;

        })
      }break;
    }
  }

  transforMonth(detalleReport: any):any{
    let arrayMonth = [];
  
    detalleReport.forEach(a => {
      let aMonth : formatoTableG = new formatoTableG();
      aMonth.Columna1 = a.Columna1;
      aMonth.Columna2 = a.Columna2;
      aMonth.Columna3 = a.Columna3;
      aMonth.Columna4 = a.Columna4;
    
      let month;

      month = a.Dia.split(' - ');
      let y = month[1];
      let m = month[0];
      if(m == 'January')
        aMonth.Dia = 'Enero - ' + y;
      if(m == 'February')
        aMonth.Dia = 'Febrero - '+ y;
      if(m == 'March')
        aMonth.Dia = 'Marzo - '+ y;
      if(m == 'April')
        aMonth.Dia = 'Abril - '+ y;
      if(m == 'May')
        aMonth.Dia = 'Mayo - '+ y;
      if(m == 'June')
        aMonth.Dia = 'Junio - '+y;
      if(m == 'July')
        aMonth.Dia = 'Julio - '+y;
      if(m == 'August')
        aMonth.Dia = 'Agosto - '+y;
      if(m == 'September')
        aMonth.Dia = 'Septiembre - '+y;
      if(m == 'October')
        aMonth.Dia = 'Octubre - '+y;
      if(m == 'November')
        aMonth.Dia = 'Noviembre - '+y;
      if(m == 'December')
        aMonth.Dia = 'Diciembre - '+y;

        arrayMonth.push(aMonth)
    });
    return arrayMonth;
  }

  transforWeek(detalleReport: any):any{
    let arrayWeek = [];

    detalleReport.forEach(a => {
      let aMonth : formatoTableG = new formatoTableG();
      aMonth.Columna1 = a.Columna1;
      aMonth.Columna2 = a.Columna2;
      aMonth.Columna3 = a.Columna3;
      aMonth.Columna4 = a.Columna4;
    

      if(a.Dia == 'Monday')
        aMonth.Dia = 'Lunes';
      if(a.Dia == 'Tuesday')
        aMonth.Dia = 'Martes';
      if(a.Dia == 'Wednesday')
        aMonth.Dia = 'Miércoles';
      if(a.Dia == 'Thursday')
        aMonth.Dia = 'Jueves';
      if(a.Dia == 'Friday')
        aMonth.Dia = 'Viernes';
      if(a.Dia == 'Saturday')
        aMonth.Dia = 'Sábado';
      if(a.Dia == 'Sunday')
        aMonth.Dia = 'Domingo';
      if(a.Dia == 'Hoy')
        aMonth.Dia = 'Hoy';

        arrayWeek.push(aMonth)
    });
    return arrayWeek;
  }

  array():any{
    let a = []
    switch (this.selected.value){
      case 0:{
        a = this.days;
      }break;
      case 1:{
        a = this.weeks;
      }break;
      case 2:{
        a = this.months;
      }break;
      case 3:{
        a = this.years;
      }break;
      
    }
    return a;
  }

  
}
