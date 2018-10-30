import { Component, OnInit, Input, forwardRef, Output,EventEmitter, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap, map } from 'rxjs/operators'
import {OnChanges, ViewEncapsulation } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';




export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() =>  ComboContrutodoComponent),
    multi: true
};

@Component({
  selector: 'app-combo-contrutodo',
  templateUrl: './combo-contrutodo.component.html',
  styleUrls: ['./combo-contrutodo.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class ComboContrutodoComponent implements  OnInit, ControlValueAccessor, OnChanges{
  @ViewChild(NgSelectComponent) select: NgSelectComponent;

  comboLoading: boolean = false;
  bufferSize = 20;
  input$ = new Subject<string>();
  comboBuffer = [];
  listaComboOut: any = { Lista : [], ConsultarTablasResult: { Resultado : []} };

  firstClick: Boolean = false;
  firstLoad: Boolean = false;
  placeHolder: String = "SELECCIONAR";

  //? Nuevos Datos de entrada
  @Input() servicio: Observable<any>;
  @Input() tipoLista: Number;
  @Input() hideCode: boolean = false;
  @Output() codigo = new EventEmitter<String>();
  @Output() name = new String;


  private _selectedItemIds: String;

  @Input()
  set selectedItemIds(name: String) {
    this._selectedItemIds = name;
    if (name == null){
      this.mepost()
    }
  }
  
  get selectedItemIds(): String {
    return this._selectedItemIds;
  }
  
  constructor() {
  }

  
  ngOnInit() {
    
    this.firstLoad = true;
  }

  Click(){
    if(!this.firstClick){
      this.mepost();
      this.onSearch();
      this.firstClick=true;
    }
  }

  ngOnChanges() {
   
    if(this.firstLoad){
    this.selectedItemIds==null? this.bufferSize= 20 : this.bufferSize = 99999;
    this.mepost();
    this.onSearch();
    } 
  }



  onChange(e:Event, value:any){
    this.name = this.select.selectedItems[0].label
    this.propagateChange(value);
    this.codigo.emit(value);
 }

  propagateChange = (_: any) => { }


  writeValue(value: any): void {

  }

 registerOnChange(fn: (value: any) => void) {
  this.propagateChange = fn;
  }

  registerOnTouched() {}


  fetchMore(term)  {
    const len = this.comboBuffer.length;
    let more;
    if(this.tipoLista==1){
    if (term != null){
      more = this.listaComboOut.Lista.filter(x => x.bLabel.includes(term) || x.bValue.includes(term)).slice(len, this.bufferSize + len);
    }else{
      more = this.listaComboOut.Lista.slice(len, this.bufferSize + len);
    }
  }else{

    if (term != null){
      more = this.listaComboOut.ConsultarTablasResult.Resultado.filter(x => x.bLabel.includes(term) || x.bValue.includes(term)).slice(len, this.bufferSize + len);
      }else{
      more = this.listaComboOut.ConsultarTablasResult.Resultado.slice(len, this.bufferSize + len);

  }
}
    this.comboLoading = true;

    setTimeout(() => {
        this.comboLoading = false;
        this.comboBuffer = this.comboBuffer.concat(more);
    }, 500)
}
 

 mepost(): void {
    this.comboLoading=true;{}
    if(this.servicio){
      this.servicio.subscribe(cli => {
        this.listaComboOut = cli;
        this.comboLoading=false;
          if(this.tipoLista==1){
            this.comboBuffer = this.listaComboOut.Lista.slice(0, this.bufferSize);
          }
          else{
            this.comboBuffer = this.listaComboOut.ConsultarTablasResult.Resultado.slice(0, this.bufferSize);
          }
        },
        error => {
      });
    }

 }


  onSearch() {
    this.input$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap(term => this.fakeService(term))
    )
      .subscribe((data :any) => {
        this.comboBuffer = data.slice(0, this.bufferSize);
      })
  }

  private fakeService(term) {
    if(this.tipoLista==1){
      return this.servicio.pipe(map(data => data.Lista.filter((x) => x.sCodigo.includes(term) || x.sDescripcion.includes(term))));
    }else{
      return this.servicio.pipe(map(data => data.ConsultarTablasResult.Resultado.filter((x) => x.Campo1.includes(term) || x.Campo2.includes(term))));
    }
  }


}

