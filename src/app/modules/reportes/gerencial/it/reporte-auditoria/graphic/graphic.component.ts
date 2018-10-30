import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ListaGraficaService } from '../../../../../../core/services/listas/section-mock/lista-graficas.service';
import { UIComponentsService } from '../../../../../../core/services/ui-components.service';
import { ComboContrutodoComponent } from '../../../../../compartidos/utils/combo-contrutodo/combo-contrutodo.component';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart;

  constructor(   
    public activeModal: NgbActiveModal,
    private toast: UIComponentsService,
    public list: ListaGraficaService) { }
   

    //? Combo
    periodoCallback: Observable < any > ;
    typeChartCallback: Observable < any > ;
    per:String;
    tch: String;
    acc:String;
    timeC: String;
    rep:String;
    ges: String;



    chartForm: FormGroup;
    loading: boolean = true;
    optionsForm: FormGroup;
  
    @Input() days: any = [];
    @Input() month: any = [];
    @Input() year: any = [];
    @Input() type: any = [];

      
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
      label: 'Accesos',
      hidden: false
    },
    {
      data: [],
      label: 'Tiempo de conexión',
      hidden: false
    },
    {
      data: [],
      label: 'Reportes',
      hidden: false
    },
    {
      data: [],
      label: 'Gestión',
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
  ngOnInit() {
    this.loadChartForm();
    this.periodoCallback = this.list.listPeriodoA();
    this.typeChartCallback = this.list.listTypeChart();
    this.loadChart();
   
  }
  

  loadChartForm(){
    this.chartForm = new FormGroup({
      typeChart: new FormControl('bar'),
      period: new FormControl('1'),
      accesos: new FormControl(true),
      timeConection: new FormControl(true),
      report: new FormControl(true),
      gestion: new FormControl(true)
    })
    
  }


  
  /**
   * Método que carga el gráfico en valores por defecto
   */
  loadChart() {
   
    if (this.chartType === 'pie') {
     
     /* let arr = this.getArrayFromPeriod(this.array)
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
      */
    } else {
      if(this.type == 1){
        this.chartData = [{
          data: [],
          label: 'Accesos',
          hidden: false
        },
        {
          data: [],
          label: 'Tiempo de conexión',
          hidden: false
        },
        {
          data: [],
          label: 'Reportes',
          hidden: false
        },
        {
          data: [],
          label: 'Gestión',
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
      }else  if(this.type == 2){
        this.chartData = [
        {
          data: [],
          label: 'Reportes',
          hidden: false
        },
        {
          data: [],
          label: 'Gestión',
          hidden: false
        }
      ];
      
        this.chartOptions = this.generalChartOptions
        this.chartColors = [
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
      
      }
      this.changePeriod(this.chartForm.controls['period'].value)
    }
  }

  hideOrUnhideData(event) {
    let obj = event
    let clone = JSON.parse(JSON.stringify(this.chartData));
   
    
    switch (obj.source.name) {
      case "acc":{
        console.log('Accesos')
        this.genericHideUnhide(clone, 0, obj)
      } break;
      case "timeC":{
        console.log('Tiempo de conexión') 
        this.genericHideUnhide(clone, 1, obj)
      } break;
      case "rep":{
        console.log('Reportes')  
        this.genericHideUnhide(clone, 2, obj)
      } break;
      case "ges":{
        this.genericHideUnhide(clone, 3, obj)
        console.log('Gestión')  
      } break;
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

  changeTypeChart(type){
    this.loadDefaultCheckBox()
    this.chartType = type;
       
    if (this.chartType === 'pie') {
     
      /* let arr = this.getArrayFromPeriod(this.array)
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
       */
     } else {
       if(this.type == 1){
         this.chartData = [{
           data: [],
           label: 'Accesos',
           hidden: false
         },
         {
           data: [],
           label: 'Tiempo de conexión',
           hidden: false
         },
         {
           data: [],
           label: 'Reportes',
           hidden: false
         },
         {
           data: [],
           label: 'Gestión',
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
       }else  if(this.type == 2){
         this.chartData = [
         {
           data: [],
           label: 'Reportes',
           hidden: false
         },
         {
           data: [],
           label: 'Gestión',
           hidden: false
         }
       ];
       
         this.chartOptions = this.generalChartOptions
         this.chartColors = [
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
       
       }
       this.changePeriod(this.chartForm.controls['period'].value)
     }  
    
  }

  changePeriod(type){
  
    let periodo
    this.chartLabels = []
    switch (Number(type)) {
      case 1:{
        this.chartLabels = []
        periodo = this.days;
        this.chartLabels = ['Últimos días (7)'];
      } break;
      case 2:{
        this.chartLabels = []
        this.chartLabels = ['Último mes (1) '];        
        periodo = this.month;
      } break;
      case 3:{
        this.chartLabels = []
        this.chartLabels = ['Último año  (1) '];       
        periodo = this.year;
      } break;
    }
    if (this.chartForm.controls['typeChart'].value == "pie") {
      this.loadDefaultCheckBox()
    
      /*
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
      */
    } else {
      if (!this.checkArrayZeros(periodo)) {
        this.hideUnhideElements(1)

      } else {
        this.hideUnhideElements(0)
        let arraysr = [];
        let arraysg = [];

        let clone = JSON.parse(JSON.stringify(this.chartData));
    
        arraysr.push(this.getAcumData(periodo,'r'))
        arraysg.push(this.getAcumData(periodo,'g'))
        clone[0].data = arraysr
        clone[1].data = arraysg
        this.chartData = clone;

        this.forceChartRefresh()
      }
    }
  }

  
  /**
   * Coloca los checkbox del modal del gráfico todos seleccionados, a su estado original
   */
  loadDefaultCheckBox() {
    this.chartData[0].hidden = false
    this.chartForm.controls['accesos'].setValue(true)
    this.chartForm.controls['timeConection'].setValue(true)
    this.chartForm.controls['report'].setValue(true)
    this.chartForm.controls['gestion'].setValue(true)
  }

   /**
   * Verifica si todos los checkboxes están desabilitados para desabilitar los botones de descarga
   * y de guardar en favoritos
   */
  verifyAllCheckBoxesUnchecked() {
    let accesos = this.chartForm.controls['accesos'].value
    let timeConection = this.chartForm.controls['timeConection'].value
    let report = this.chartForm.controls['report'].value
    let gestion = this.chartForm.controls['gestion'].value
    if (accesos == false && timeConection == false && report == false && gestion == false) {
     console.log('hidden')
    // document.getElementById("download").style.visibility = "hidden";
    } else {
     console.log('visible')
   //  document.getElementById("download").style.visibility = "visible";
    }
  }


  hideUnhideElements(opt) {
    if (opt == 1) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }

  getAcumData(object, t: string):Number{
    let acum = 0;
    object.forEach(x => {
     
      if (x.flag == t){
        acum = +acum + +x.iteracion;
      }
    });
  
    return acum
  }
  
    /**
   * Método Genérico Auxiliar que obtiene los datos de un array en especifico
   * Es utilizado en la carga del gráfico
   * @param object 
   * @param col 
   */
  getDataforChart(obj, object): any {
    let arrayAcum = [];
    let acum = 0;
    let acumg = 0;
    obj.forEach(a => {
      
      object.forEach(x => {
        console.log(object)
        if (x.flag == 'r'){
          acum = +acum + +x.interacion;
        }else if (x.flag == 'g'){
          acumg = +acumg + +x.interacion;
        }
      });
      arrayAcum.push(acum);
    });
    
   
    return arrayAcum
  }

    // events
    chartClicked(e: any): void {
    }
  
    chartHovered(e: any): void {
      this.isChartRendered = false;
  
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



  chartData1 = [
    { data: [1, 3], label: "Reportes",hidden: true },
    { data: [1, 3], label: "dsd" }
  ];

  chartLabels1 = ['1','2'];

  onChartClick(event) {
    console.log(event);
  }
}
