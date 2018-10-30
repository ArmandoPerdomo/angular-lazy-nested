import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ReporteAuditoriaGenIn } from '../../../../../abstract/DTO/in/reportesGerencial/reporteAuditoriaGenIn';
import { UserTokenService } from '../../../../../core/services/user-token.service';
import { RepGenAuditoriaGenService } from '../../../../../core/services/gerencial/repGenAuditoriaGen.service';
import { RepGenAuditoriaIndividualService } from '../../../../../core/services/gerencial/repGenAuditoriaIndividual.service';
import { reporteAuditoriaGenOut } from '../../../../../abstract/DTO/out/reportesGerencial/reporteAuditoriaGen/reporteAuditoriaGenOut';
import { ListaUsuarioGerencialService } from '../../../../../core/services/listas/lista-usuario-gerencial.service';
import { listaUsuariosOut } from '../../../../../abstract/DTO/out/listaUsuarios/listaUsuariosOut';
import { ListaTipo1Out } from '../../../../../abstract/DTO/out/listaTipo1/listaTipo1Out';
import { Lista } from '../../../../../abstract/DTO/out/listaTipo1/lista';
import { User } from '../../../../../abstract/class/user';
import { reporteAuditoriaIndividualOut } from '../../../../../abstract/DTO/out/reportesGerencial/reporteAuditoriaIndividual/reporteAuditoriaIndividualOut';
import { ReporteAuditoriaIndividualIn } from '../../../../../abstract/DTO/in/reportesGerencial/reporteAuditoriaIndividualIn';
import { Globals } from '../../../../../core/services/globals.service';
import { pdfAuditoriaGeneralService } from '../../../../../core/services/exportables/gerencial/pdf-auditoria-general.service';
import { pdfAuditoriaIndividualService } from '../../../../../core/services/exportables/gerencial/pdf-auditoria-individual.service';
import { GraphicComponent } from './graphic/graphic.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboContrutodoComponent } from '../../../../compartidos/utils/combo-contrutodo/combo-contrutodo.component';

@Component({
  selector: 'app-reporte-auditoria',
  templateUrl: './reporte-auditoria.component.html',
  styleUrls: ['./reporte-auditoria.component.css']
})
export class ReporteAuditoriaComponent implements OnInit {
  @ViewChild(ComboContrutodoComponent) select: ComboContrutodoComponent;

  constructor(
    public userToken: UserTokenService,
    public repGen: RepGenAuditoriaGenService,
    public repInd: RepGenAuditoriaIndividualService,
    public listUsers:ListaUsuarioGerencialService,
    public pdfGen: pdfAuditoriaGeneralService,
    public pdfInd: pdfAuditoriaIndividualService,
    public global: Globals,
    private modalService: NgbModal, 
  ) { }

  title: String
  selected = new FormControl(0);
  formPdf: FormGroup;
  send: String ='PDF';
  type: Number // Para maneja que pdf va a mostrar 1:General 2:Individual

  days: any = []; // arreglo para los dias 
  month: any = [];
  year: any = [];



  //General
    repGout:reporteAuditoriaGenOut;
    repGin:ReporteAuditoriaGenIn
    selectedTableg = new FormControl(0);
    loadingG: Boolean = true;
    cargaG: Boolean = false;


  //Individual
    repIout:reporteAuditoriaIndividualOut;
    repIin:ReporteAuditoriaIndividualIn;
    msjCarga: String = "Seleccione un trabajador";
    cargaI: Boolean = false;
    cargaI2r: Boolean = false;
    cargaI2g: Boolean = false;
    listUout:listaUsuariosOut;
    selectedTablei = new FormControl(0);
    isDisabled:  Boolean = true;
    loadingI:  Boolean;
    itemHistorialUser: any = [];

    //?Individual Form 
    individualForm: FormGroup;
    emp: String;
    employeeCallback: Observable  < any > ;

  ngOnInit() {
   
    this.title = "Reporte de auditoría"

    this.formPdf = new FormGroup({
      sendTo: new FormControl('PDF')
    });

    this.individualForm = new FormGroup({
      employee: new FormControl('')
    });

    this.loadGeneralTable();
    this.getUsers();
  }

  
  open() {
    const modalRef = this.modalService.open(GraphicComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.days = this.days;
    modalRef.componentInstance.month = this.month;
    modalRef.componentInstance.year = this.year;
  }

  getUsers(){
    if(this.userToken.isLogged()){
      const userLogged : User = this.userToken.getUserLogged();
      if(userLogged.empresa){
        this.listUsers.getUsers(userLogged.empresa.id).subscribe(res =>{
      
          this.loadingG = false;
          this.cargaG = true;
          this.listUout = res.body;
          this.employeeCallback = this.listaUsers(this.listUout);
        },
        error => {         
        })
      }
    }
  }


  getMockListaUsers(rout: any) {
    let lista: ListaTipo1Out = new ListaTipo1Out();
    rout.forEach(el => {
      lista.Lista.push(new Lista(el.id.toString(), el.fullname.toString()));
    });
    lista.sMensajeError = null;
    return lista;
  }

  listaUsers(rout: any): Observable < ListaTipo1Out > {
    let items = this.getMockListaUsers(rout);
    return of(items);
  
  }

  clean(){
    if(this.selected.value==1){
      this.type = 2;
      this.emp = null;
      this.cargaI2r = false;
      this.cargaI2g = false;
      this.isDisabled = true;
      this.cargaI = false;
      this.msjCarga = "Seleccione un trabajador";
      this.itemHistorialUser = [];
    }else if(this.selected.value==0){
      this.type = 1;
    }
  }

  loadGeneralTable(){
    
    this.repGin = new ReporteAuditoriaGenIn();
    if(this.selectedTableg.value == 0){
      this.repGin.tiempo = 's';
    }
    if(this.selectedTableg.value == 1){
      this.repGin.tiempo = 'm';    
    }
    if(this.selectedTableg.value == 2){
      this.repGin.tiempo = 'x';    
    }
    
    this.repGen.repGenAuditoriaGen(this.repGin).subscribe(res =>{
      this.type = 1
      this.loadingG = false;
      this.cargaG = true;
      this.repGout = res.body;
    },
    error => {
              
    })
  }

  loadIndividualTable(codigo: Number){
    this.loadingI = true;

    this.repIin = new ReporteAuditoriaIndividualIn();
    this.repIin.idusuario = codigo;
   

    if(this.selectedTablei.value == 0){
      this.repIin.tiempo = 's';
    }
    if(this.selectedTablei.value == 1){
      this.repIin.tiempo = 'm'; 
    }
    if(this.selectedTablei.value == 2){
      this.repIin.tiempo = 'x';  
    }
    
    this.repInd.repGenIn(this.repIin).subscribe(res =>{
      this.cargaI2r = false;
      this.cargaI2g = false;
      this.cargaI = true;
      this.isDisabled = false;
      this.loadingI = false;
      this.repIout = res.body;
    
      if(res.body.historial.length==0){
        this.msjCarga = "No hay información para mostrar"
      }else{

        if(this.selectedTablei.value == 0){
          this.days = res.body.historial;
        }
        if(this.selectedTablei.value == 1){
          this.month = res.body.historial;          
        }
        if(this.selectedTablei.value == 2){
          this.year = res.body.historial;           
        }

        this.itemHistorialUser = res.body.historial;

        this.itemHistorialUser.forEach(x => {
            if(x.flag=='r')
              this.cargaI2r = true;
            if(x.flag=='g')
              this.cargaI2g = true;              
        });

      }
      
    },
    error => {
              
    })
  }


  tranformDate(date):any{
    var d = new Date(date);
    if (date == null){
      return 'Sin ingresar';
    }else{
      return d.toLocaleDateString('es-VE', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }); 
    } 
  }

  changeEmployee(codigo) {
    this.emp = codigo;
  
    this.loadIndividualTable(codigo);
  }

  createPdf(){
    this.global.showLoading();
    if(this.type==1){

      this.pdfGen.pdfAuditoriaG(this.repGout,this.repGin);
      this.global.hideLoading();

    }else{

      if(this.emp=='' || this.emp ==null){
        swal("","Debe seleccionar una opción","info")
        .then((value) => {
          if (value || value==null) {
               this.global.hideLoading();
          }
        });

      }else{

        this.pdfInd.pdfAuditoriaI(this.repIout,this.repIin,this.select.name);
        this.global.hideLoading();
      }
    }
  }

}
