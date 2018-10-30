import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControlService } from '../../../../../core/services/form-control.service';
import { Globals } from '../../../../../core/services/globals.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ListaTrabajadoresService } from '../../../../../core/services/listas/lista-trabajadores.service';
import { ListaTrabajadoresIn } from '../../../../../abstract/DTO/in/listaTrabajadoresIn';
import { RepNomEdoCtaUtilidadesOut } from '../../../../../abstract/DTO/out/reportesNomina/repNomEdoCtaUtilidades/repNomEdoCtaUtilidadesOut';
import { RepNomEdoCtaUtilidadesIn } from '../../../../../abstract/DTO/in/reportesNomina/repNomEdoCtaUtilidadesIn';
import { RepNomEdoCtaUtilidadesService } from '../../../../../core/services/estados_de_cuenta/repNomEdoCtaUtilidades.service';
import { PdfEcUtilidadesService } from '../../../../../core/services/exportables/nomina/estado-cuenta/utilidades/pdf-ec-utilidades.service';
import { ListaContratoService } from '../../../../../core/services/listas/lista-contrato.service';
import { ListaContratoIn } from '../../../../../abstract/DTO/in/listaContratoIn';
import { ListaConceptoService } from '../../../../../core/services/listas/lista-concepto.service';
import { ListaConceptoIn } from '../../../../../abstract/DTO/in/listaConceptoIn';
import { ListaDepartamentoService } from '../../../../../core/services/listas/lista-departamento.service';
import { ListaDepartamentoIn } from '../../../../../abstract/DTO/in/listaDepartamentoIn';
import { ListaContGeneradoService } from '../../../../../core/services/listas/lista-cont-generado.service';
import { ListaDepartamentoGeneradoService } from '../../../../../core/services/listas/lista-departamento-gen.service';
import { ListaConGeneradoIn } from '../../../../../abstract/DTO/in/listaConGeneradoIn';
import { ListaDepartamentoGenIn } from '../../../../../abstract/DTO/in/listaDepartamentoGenIn';
import { ListaArticulosAlmacenIn } from '../../../../../abstract/DTO/in/listaArticulosAlmacenIn';

const now = new Date();
@Component({
  selector: 'app-edo-utilidades',
  templateUrl: './edo-utilidades.component.html',
  styleUrls: ['./edo-utilidades.component.css']
})
export class EdoUtilidadesComponent implements OnInit {

  constructor(
    public formService: FormControlService,
    public global: Globals,
    public pdf: PdfEcUtilidadesService,
    public router: Router,
    public rep: RepNomEdoCtaUtilidadesService,
    public lemp: ListaTrabajadoresService,
    public lcon: ListaContratoService,
    public lcto: ListaConceptoService,
    public ldpto: ListaDepartamentoService,
    public clgen: ListaContGeneradoService,
    public dlgen: ListaDepartamentoGeneradoService
  ) {}

  //?Title.
  title: string;

  //?Requests callbacks.
  employeeCallback: Observable < any > ;
  conceptCallback: Observable < any > ;
  dptoCallback: Observable < any > ;
  contractCallback: Observable < any > ;
  generatedCallback: Observable < any > ;
  cGeneratedCallback: Observable < any > ;

  //?Formgroup.
  listUtil: FormGroup;

  //?Models.
  send = '';
  empF: String;
  empU: String;
  cptF: String;
  cptU: String;
  depF: String;
  depU: String;
  conF: String;
  conU: String;
  genF: String;
  genU: String;
  cgeF: String;
  cgeU: String;
  //?Dates.
  datF: NgbDateStruct;
  datU: NgbDateStruct;
  maxDate: NgbDateStruct;

  ngOnInit() {
    //?Inicialización.
    this.title = 'Control de utilidades';
    this.clearFields();

    //?Creación del FormGroup.
    this.listUtil = new FormGroup({
      employeeF: new FormControl(''),
      employeeU: new FormControl(''),
      dateF: new FormControl('', [Validators.required]),
      dateU: new FormControl('', [Validators.required]),
      conceptF: new FormControl(''),
      conceptU: new FormControl(''),
      dptoF: new FormControl(''),
      dptoU: new FormControl(''),
      contractF: new FormControl(''),
      contractU: new FormControl(''),
      generatedF: new FormControl(''),
      generatedU: new FormControl(''),
      cGeneratedF: new FormControl(''),
      cGeneratedU: new FormControl(''),
      sendTo: new FormControl('', [Validators.required]),
    });

    //?Providers requests.
    let lemp: ListaTrabajadoresIn = new ListaTrabajadoresIn();
    this.employeeCallback = this.lemp.listaTrabajadores(lemp);

    let lcpt: ListaConceptoIn = new ListaConceptoIn();
    this.conceptCallback = this.lcto.listaConcepto(lcpt);

    let ldpt: ListaDepartamentoIn = new ListaDepartamentoIn();
    this.dptoCallback = this.ldpto.listaDep(ldpt);

    let lcon: ListaContratoIn = new ListaContratoIn();
    this.contractCallback = this.lcon.listaContrato(lcon);

    let ldgen: ListaDepartamentoGenIn = new ListaArticulosAlmacenIn();
    this.generatedCallback = this.dlgen.listaDepGen(ldgen);

    let lcge: ListaConGeneradoIn = new ListaConGeneradoIn();
    this.cGeneratedCallback = this.clgen.listaCon(lcge);
  }

  /*
   *Reiniciar los campos.
   */
  cleanEmployee(code: String){
    this.empF = code
    this.empU = code
  }
  cleanConcept(code: String){
    this.cptF = code
    this.cptU = code
  }
  cleanDpto(code: String){
    this.depF = code
    this.depU = code
  }
  cleanContract(code: String){
    this.conF = code
    this.conU = code
  }
  cleanGenerated(code: String){
    this.genF = code
    this.genU = code
  }
  cleanCGenerated(code: String){
    this.cgeF = code
    this.cgeU = code
  }
  clearFields() {
    this.cleanEmployee(null);
    this.cleanConcept(null);
    this.cleanDpto(null);
    this.cleanContract(null);
    this.cleanGenerated(null);
    this.cleanCGenerated(null);
    this.datU = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.datF = {
      year: now.getFullYear(),
      month: 1,
      day: 1
    };
  }

  /*
   *Regresar a la pantalla anterior.
   */
  goBack(): void {
    this.router.navigate([`app/reportes/dashboard`]);
  }

  /*
   *Se validan los campos del formulario y se envían los datos de filtrado a la siguiente vista, o al servicio de PDF.
   */
  accept() {
    let a = this.listUtil.value;
    let dF = a.dateF.year.toString() + '-' + a.dateF.month.toString() + '-' + a.dateF.day.toString();
    let dU = a.dateU.year.toString() + '-' + a.dateU.month.toString() + '-' + a.dateU.day.toString();

    this.formService.markFormGroupTouched(this.listUtil);

    if (this.listUtil.valid) {
      if (a.sendTo == 'Listado') {
        this.listUtil.controls.dateF.setValue(dF);
        this.listUtil.controls.dateU.setValue(dU);
        this.router.navigate([`${this.router.url}/detalle`], {
          queryParams: this.listUtil.value
        });
      } else if (a.sendTo == 'PDF') {

        let out: RepNomEdoCtaUtilidadesOut;
        let det: RepNomEdoCtaUtilidadesIn;
        det = new RepNomEdoCtaUtilidadesIn();
        det.Tabajador_D = a.employeeF;
        det.Tabajador_H = a.employeeU;
        det.Concepto_D = a.conceptF;
        det.Concepto_H = a.conceptU;
        det.Fecha_D = dF;
        det.Fecha_H = dU;
        det.Departamento_D = a.dptoF;
        det.Departamento_H = a.dptoU;
        det.Contrato_D = a.contractF;
        det.Contrato_H = a.contractU;
        det.DepGenerado_D = a.generatedF;
        det.DepGenerado_H = a.generatedU;
        det.ContGenerado_D = a.cGeneratedF;
        det.ContGenerado_H = a.cGeneratedU;
        this.global.showLoading();
        let msjerror: String;
        this.rep.repUtilidades(det).subscribe(res => {
            out = res;
            if (res.RepEdoCtaUtilidadesResult.Error.toString() == "") {
              msjerror = "No hay información para mostrar"
            } else {
              msjerror = res.RepEdoCtaUtilidadesResult.Error.toString();
            }
            this.global.hideLoading();
            if (res.RepEdoCtaUtilidadesResult.Error || res.RepEdoCtaUtilidadesResult.ResumenUtilidades == null || res.RepEdoCtaUtilidadesResult.ResumenUtilidades == []) {

              swal(  
                res.RepEdoCtaUtilidadesResult.Error ? "ERROR": "INFO", 
                msjerror.toString(),
                res.RepEdoCtaUtilidadesResult.Error ?  "error": "info"
                )
                .then((value) => {
                  this.global.hideLoading();
                 
                });
            } else {
              this.global.showLoading();
              this.pdf.pdfEdoCuentaUtilidades(out, det);
              this.global.hideLoading();
            }
          },
          error => {});
      } else {
        swal("", "Debe seleccionar una opción válida.", "info")
          .then((value) => {
            if (value || value == null) {}
          });
      }
    }
  }

  /*
   *Registra los cambios en los combos.
   */
  changeEmployee(code: String) {
    this.empU = code;
  }
  changeConcept(code: String) {
    this.cptU = code;
  }
  changeDpto(code: String) {
    this.depU = code;
  }
  changeContract(code: String) {
    this.conU = code;
  }
  changeGenerated(code: String) {
    this.genU = code;
  }
  changeCGenerated(code: String) {
    this.cgeU = code;
  }
}

