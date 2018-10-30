import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReporteGerencialIn } from '../../../../../abstract/DTO/in/reportesGerencial/reporteGerencialIn';
import { UserTokenService } from '../../../../../core/services/user-token.service';
import { UIComponentsService } from '../../../../../core/services/ui-components.service';
import { BaseChartDirective } from 'ng2-charts';
import { RepGerencialFavService } from '../../../../../core/services/gerencial/repGerencialFav.service';
import { graficoGerencialIn } from '../../../../../abstract/DTO/in/reportesGerencial/reporteAdministrativoTesoreriaIn';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart;

  chartForm: FormGroup;
  loading: boolean = true;
  optionsForm: FormGroup;

  reporteGerencialIn = new ReporteGerencialIn();

  @Input() days: any = [];
  @Input() months: any = [];
  @Input() years: any = [];
  @Input() weeks: any = [];


  array: any = 1; //Valor numérico que indica el tipo de array para el periodo escogido en el reporte
  isChartRendered: boolean = false; //Valor booleano que indica si el gráfico se ha renderizado
  empty: boolean = true; //Indica si hay datos para mostrar
  nom: string = ""; //indica el nombre del favorito

  /**
   * Declaraciones de las variables del Gráfico
   */
  chartLabels: string[] = [];
  chartType: string = 'bar';
  chartLegend: boolean = true;
  chartData: any[] = [{
      data: [],
      label: 'Cobros',
      hidden: false
    },
    {
      data: [],
      label: 'Depósitos',
      hidden: false
    },
    {
      data: [],
      label: 'Pagos',
      hidden: false
    },
    {
      data: [],
      label: 'Ordenes de Pago',
      hidden: false
    }
  ];
  chartColors: any[] = [
    {
      backgroundColor: "rgba(0,71,119,0.5)",
      borderColor: "#BDBDBD",
      hoverBorderColor: "#424242"
    },
    {
      backgroundColor: "rgba(163,0,0,0.5)",
      borderColor: "#BDBDBD",
      hoverBorderColor: "#424242"
    },
    {
      backgroundColor: "rgba(255,119,0,0.5)",
      borderColor: "#BDBDBD",
      hoverBorderColor: "#424242"
    },
    {
      backgroundColor: "rgba(78,52,34,0.5)",
      borderColor: "#BDBDBD",
      hoverBorderColor: "#424242"
    }
  ];
  chartOptions: any = {};
  generalChartOptions: any = {
    responsive: true,
    animation: {
      duration: 50,
      onComplete: function () {
        this.isChartRendered = true
      }
    },
    legend: {
      onClick: (e) => e.stopPropagation()
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label;
          var datasetLabel = Intl.NumberFormat('es-es', {
            minimumFractionDigits: 2
          }).format(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
          return label + ': ' + datasetLabel;
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value.toLocaleString();
          }
        }
      }]
    },
    hover: {
      animationDuration: 0
    }
  }
  pieChartOptions: any = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue / total * 100).toFixed(2));
          return ' (' + percentage + '%)';
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    },
    legend: {
      onClick: (e) => e.stopPropagation()
    },
    animation: {
      duration: 50,
      onComplete: function () {
        this.isChartRendered = true
        var ctx = this.chart.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset) {
          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle) / 2;
            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle);
            ctx.fillStyle = '#444';
            let percent = parseFloat((dataset.data[i] / total * 100).toFixed(2)) + "%";
            if (!dataset._meta[Object.keys(dataset._meta)[0]].data[i].hidden) {
              ctx.fillText(percent, model.x + x, model.y + y + 15);
            }
          }
        });
      }
    },
    hover: {
      animationDuration: 0
    }
  }


  constructor(    
    private toast: UIComponentsService,
    public activeModal: NgbActiveModal,
    private servFav: RepGerencialFavService,
    public userToken: UserTokenService) {}


  ngOnInit() {
    this.loadOptionsForm();
    this.loadChartForm();
    this.loadChart();
  }

  loadOptionsForm(){
    this.optionsForm = new FormGroup({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(45)
      ]))
    })
  }

  loadChartForm(){
    this.chartForm = new FormGroup({
      typeChart: new FormControl('bar'),
      period: new FormControl('1'),
      cobros: new FormControl(true),
      depositos: new FormControl(true),
      pagos: new FormControl(true),
      ordenes: new FormControl(true)
    })
  }


    /**
   * Método Genérico Auxiliar que obtiene los datos de un array en especifico
   * Es utilizado en la carga del gráfico
   * @param object 
   * @param col 
   */
  getDataforChart(object, col: string): any {
    let res: Array < any > [] = [];
    for (let i = 0; i < object.length; i++) {
      res.push(object[i][col]);
    }
    return res
  }



  /**
   * Método que carga el gráfico en valores por defecto
   */
  loadChart() {
    if (this.chartType === 'pie') {
      let arr = this.getArrayFromPeriod(this.array)
      this.chartData = [{
        data: [],
        label: 'Cobros',
        hidden: false
      }]
      this.chartLabels = []
      this.chartLabels = ['Cobros', 'Depósitos', 'Pagos', 'Ordenes de Compra']
      this.chartOptions = this.pieChartOptions
      this.chartColors = ["rgba(0,71,119,0.5)", "rgba(163,0,0,0.5)", "rgba(255,119,0,0.5)", "#949FB1"]
      this.chartData[0].data = [this.totalPorcPieChart(this.sum(arr, "Columna1"), this.getTotalGlobal(arr)),
        this.totalPorcPieChart(this.sum(arr, "Columna2"), this.getTotalGlobal(arr)),
        this.totalPorcPieChart(this.sum(arr, "Columna3"), this.getTotalGlobal(arr)),
        this.totalPorcPieChart(this.sum(arr, "Columna4"), this.getTotalGlobal(arr))
      ]
      this.chartData[0].backgroundColor = ["rgba(0,71,119,0.5)", "rgba(163,0,0,0.5)", "rgba(255,119,0,0.5)", "#949FB1"]
    } else {
      this.chartData = [{
          data: [],
          label: 'Cobros',
          hidden: false
        },
        {
          data: [],
          label: 'Depósitos',
          hidden: false
        },
        {
          data: [],
          label: 'Pagos',
          hidden: false
        },
        {
          data: [],
          label: 'Ordenes de Pago',
          hidden: false
        }
      ];
      this.chartOptions = this.generalChartOptions
      this.chartColors = [{
          backgroundColor: "rgba(0,71,119,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        },
        {
          backgroundColor: "rgba(163,0,0,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        },
        {
          backgroundColor: "rgba(255,119,0,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        },
        {
          backgroundColor: "rgba(78,52,34,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        }
      ];
      console.log(this.chartForm)
      this.changePeriod(this.chartForm.controls['period'].value)
    }
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
   * Cambia el tipo de gráfico y ejecuta la carga de data de acuerdo al tipo
   * @param type 
   */
  changeTypeChart(type) {
    this.loadDefaultCheckBox()
    this.chartType = type
    if (type === 'pie') {
      let arr = this.getArrayFromPeriod(this.chartForm.controls['period'].value)
      this.chartData.pop()
      this.chartData.pop()
      this.chartData.pop()
      this.chartData[0].data = []
      this.chartLabels = []
      this.chartLabels = ['Cobros', 'Depósitos', 'Pagos', 'Ordenes de Compra']
      this.chartOptions = this.pieChartOptions
      this.chartColors = ["rgba(0,71,119,0.5)", "rgba(163,0,0,0.5)", "rgba(255,119,0,0.5)", "#949FB1"]
      this.chartData[0].data = [this.totalPorcPieChart(this.sum(arr, "Columna1"), this.getTotalGlobal(arr)),
        this.totalPorcPieChart(this.sum(arr, "Columna2"), this.getTotalGlobal(arr)),
        this.totalPorcPieChart(this.sum(arr, "Columna3"), this.getTotalGlobal(arr)),
        this.totalPorcPieChart(this.sum(arr, "Columna4"), this.getTotalGlobal(arr))
      ]
      this.chartData[0].backgroundColor = ["rgba(0,71,119,0.5)", "rgba(163,0,0,0.5)", "rgba(255,119,0,0.5)", "#949FB1"]
    } else {
      this.chartData = [{
          data: [],
          label: 'Cobros',
          hidden: false
        },
        {
          data: [],
          label: 'Depósitos',
          hidden: false
        },
        {
          data: [],
          label: 'Pagos',
          hidden: false
        },
        {
          data: [],
          label: 'Ordenes de Pago',
          hidden: false
        }
      ];
      this.chartOptions = this.generalChartOptions
      this.chartColors = [{
          backgroundColor: "rgba(0,71,119,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        },
        {
          backgroundColor: "rgba(163,0,0,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        },
        {
          backgroundColor: "rgba(255,119,0,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        },
        {
          backgroundColor: "rgba(78,52,34,0.5)",
          borderColor: "#BDBDBD",
          hoverBorderColor: "#424242"
        }
      ];
      this.changePeriod(this.chartForm.controls['period'].value)
    }
  }

  /**
   * Obtiene el array a mostrar de acuerdo al periodo pasado por el combo 'period'
   * @param period 
   */
  getArrayFromPeriod(period): any {
    let array
    switch (Number(period)) {
      case 1:
        array = this.days
        break;
      case 2:
        array = this.weeks
        break;
      case 3:
        array = this.months
        break;
      case 4:
        array = this.years
        break;
    }
    return array
  }

  /**
   * Obtiene el total de las 4 columnas de la tabla reporte
   * @param object 
   */
  getTotalGlobal(object): number {
    let sum: number = 0
    for (let i = 1; i <= 4; i++) {
      sum += this.sum(object, "Columna" + i)
    }
    return sum
  }

  /**
   * Obtiene el porcentaje para el gráfico circular
   * Utiliza el método getTotalGlobal()
   * @param num 
   * @param total 
   */
  totalPorcPieChart(num, total): number {
    if (total != 0) {
      let res: number = 0
      res = (num * 100) / total
      return res
    }
  }

  /**
   * Cambia el periodo del reporte en el gráfico
   * Obtiene el valor del combo 'period'
   * @param period
   */
  changePeriod(period) {
    let periodo
    this.chartLabels = []
    switch (Number(period)) {
      case 1:
        periodo = this.days
        break;
      case 2:
        periodo = this.weeks
        break;
      case 3:
        periodo = this.months
        break;
      case 4:
        periodo = this.years
        break;
    }
    if (this.chartForm.controls['typeChart'].value === 'pie') {
      this.loadDefaultCheckBox()
      if (!this.checkArrayZeros(periodo)) {
        this.hideUnhideElements(1)
      } else {
        this.hideUnhideElements(0)
        let arr = this.getArrayFromPeriod(this.chartForm.controls['period'].value)
        this.chartData[0].data = [this.totalPorcPieChart(this.sum(arr, "Columna1"), this.getTotalGlobal(arr)),
          this.totalPorcPieChart(this.sum(arr, "Columna2"), this.getTotalGlobal(arr)),
          this.totalPorcPieChart(this.sum(arr, "Columna3"), this.getTotalGlobal(arr)),
          this.totalPorcPieChart(this.sum(arr, "Columna4"), this.getTotalGlobal(arr))
        ]
        this.chartLabels = ['Cobros', 'Depósitos', 'Pagos', 'Ordenes de Compra']
      }
      this.chartOptions = this.pieChartOptions
    } else {
      if (!this.checkArrayZeros(periodo)) {
        this.hideUnhideElements(1)
      } else {
        this.hideUnhideElements(0)
        let clone = JSON.parse(JSON.stringify(this.chartData));
        clone[0].data = this.getDataforChart(periodo, "Columna1")
        clone[1].data = this.getDataforChart(periodo, "Columna2")
        clone[2].data = this.getDataforChart(periodo, "Columna3")
        clone[3].data = this.getDataforChart(periodo, "Columna4")
        this.chartData = clone;
        this.chartLabels = this.getDataforChart(periodo, "Dia");
        this.forceChartRefresh()
      }
    }
  }

  /**
   * Cambia la información a mostrar en el gráfico, escondiendo o mostrando Cobros,Depositos,Pagos,Ordenes
   * Trabaja en conjunto con genericHideUnhide()
   * @param target 
   */
  hideOrUnhideData(target) {
    let obj = target
    let clone = JSON.parse(JSON.stringify(this.chartData));

    switch (obj.name) {
      case "cobros":
        this.genericHideUnhide(clone, 0, obj)
        break;
      case "depositos":
        this.genericHideUnhide(clone, 1, obj)
        break;
      case "pagos":
        this.genericHideUnhide(clone, 2, obj)
        break;
      case "ordenes":
        this.genericHideUnhide(clone, 3, obj)
        break;
    }
  }

  genericHideUnhide(data, pos, obj) {
    if (this.chartType === 'pie') {
      let dataset = this.chart.chart.config.data.datasets[0]
      if (obj.checked) {
        dataset._meta[Object.keys(dataset._meta)[0]].data[pos].hidden = false
        this.chart.chart.update()
      } else {
        dataset._meta[Object.keys(dataset._meta)[0]].data[pos].hidden = true
        this.chart.chart.update()
      }
    } else {
      if (obj.checked) {
        data[pos].hidden = false
        this.chartData = data;
        this.forceChartRefresh()
      } else {
        data[pos].hidden = true
        this.chartData = data;
        this.forceChartRefresh()
      }
    }
    this.verifyAllCheckBoxesUnchecked()
  }

  /**
   * Hace un reinicio del gráfico para actualizar los datos
   */
  forceChartRefresh() {
    setTimeout(() => {
      this.chart.refresh();
    }, 1);
  }



  /**
   * Descarga la imagen(png) del gráfico
   * @param event 
   */
  downloadCanvas(event) {
    let anchor = event.target;
    let nombre = this.optionsForm.controls['nombre'].value
    if (nombre == '') {
      this.toast.showSnackNotification('Debe ingresar un nombre para el gráfico')
    } else {
      anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
      switch (this.chartType) {
        case 'pie':
          anchor.download = "pieChart-" + nombre + "-" + new Date() + ".png";
          break;
        case 'bar':
          anchor.download = "barChart-" + nombre + "-" + new Date() + ".png";
          break;
        case 'line':
          anchor.download = "lineChart-" + nombre + "-" + new Date() + ".png";
          break;
      }
      this.toast.showSnackNotification('Imagen descargada exitosamente!')
    }
  }

  /**
   * Guarda el favorito en base de datos
   */
  saveToFavorites() {
    let nombre = this.optionsForm.controls['nombre'].value
    let imagen = document.getElementsByTagName('canvas')[0].toDataURL();
    let periodo: String
    switch (Number(this.chartForm.controls['period'].value)) {
      case 1:
        periodo = "Últimos Días (7)"
        break;
      case 2:
        periodo = "Últimas Semanas (5)"
        break;
      case 3:
        periodo = "Últimos Meses (12)"
        break;
      case 4:
        periodo = "Últimos Años (10)"
        break;
    }
    if (nombre == '') {
      this.toast.showSnackNotification('Debe ingresar un nombre para el gráfico')
    } else {
      this.servFav.addToFavorites(new graficoGerencialIn(nombre, imagen, this.userToken.getUserLogged().id, periodo)).subscribe(res => {
        if (res.status == 200) {
          this.toast.showSnackNotification('Guardado Exitosamente!')
        } else {
          this.toast.showSnackNotification('Ocurrió un error al guardar el favorito')
        }
      })
    }
  }

  /**
   * Chequea si el reporte en el periodo seleccionado está en vacío, es decir, tiene solo ceros (0)
   * @param obj 
   */
  checkArrayZeros(obj): boolean {
    let res: boolean = false
    let sum: number = 0
    for (let i = 0; i < obj.length; i++) {
      sum += obj[i].Columna1
      sum += obj[i].Columna2
      sum += obj[i].Columna3
      sum += obj[i].Columna4
    }
    if (sum != 0) {
      res = true
    }
    return res
  }

  /**
   * Esconde los elementos si no hay data que mostrar
   * @param opt 
   */
  hideUnhideElements(opt) {
    if (opt == 1) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  /**
   * Coloca los checkbox del modal del gráfico todos seleccionados, a su estado original
   */
  loadDefaultCheckBox() {
    this.chartData[0].hidden = false
    this.chartForm.controls['cobros'].setValue(true)
    this.chartForm.controls['depositos'].setValue(true)
    this.chartForm.controls['pagos'].setValue(true)
    this.chartForm.controls['ordenes'].setValue(true)
  }

  
  /**
   * Verifica si todos los checkboxes están desabilitados para desabilitar los botones de descarga
   * y de guardar en favoritos
   */
  verifyAllCheckBoxesUnchecked() {
    let cobros = this.chartForm.controls['cobros'].value
    let depositos = this.chartForm.controls['depositos'].value
    let pagos = this.chartForm.controls['pagos'].value
    let ordenes = this.chartForm.controls['ordenes'].value
    if (cobros == false && depositos == false && pagos == false && ordenes == false) {
      document.getElementById("download").style.visibility = "hidden";
    } else document.getElementById("download").style.visibility = "visible";
  }

  // events
  chartClicked(e: any): void {
  }

  chartHovered(e: any): void {
    this.isChartRendered = false;

  }
}