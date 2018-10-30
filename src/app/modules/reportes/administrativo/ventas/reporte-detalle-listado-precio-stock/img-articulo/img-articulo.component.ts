import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RepAdminImagenServices } from '../../../../../../core/services/ventas/repAdminImagen.service';
import { RepAdminImagenIn } from '../../../../../../abstract/DTO/in/reportesAdmVentas/repAdminImagenIn';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-img-articulo',
  templateUrl: './img-articulo.component.html',
  styleUrls: ['./img-articulo.component.css']
})
export class ImgArticuloComponent implements OnInit {
  @Input() co_art: any;
  @Input() desc_art: any ;
  repDev: Subscription; 
  msjerror: String;
  imgIn: RepAdminImagenIn = new RepAdminImagenIn() ;
  imgArt: any
  carga: Boolean = false;
  loading: Boolean = true;

  constructor( 
    public activeModal: NgbActiveModal,
    private changeDetectorRef: ChangeDetectorRef,  
    public img:  RepAdminImagenServices) { }

  ngOnInit() {
    
    setTimeout( ()=>{
      this.load();
    },200);
   
  }


  load(){
    this.imgIn.CodigoArticulo = this.co_art
    this.loading = true
      
  
      this.repDev = this.img.repImg(this.imgIn).subscribe(res => {

      if(res.ImagenByte== null){

        this.loading = false
        if(res.MjsError == null){    
          this.msjerror = "No existe imagen asociada";
        }else{
           this.msjerror = res.MjsError;
        }
       
      }else{
        this.carga = true
        this.loading = false
        this.imgArt =[ "data:image/png;base64," + res.ImagenByte ];
      }    
    },
      error => {});

  }
  

}
