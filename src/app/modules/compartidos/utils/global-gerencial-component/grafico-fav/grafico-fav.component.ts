import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserTokenService } from '../../../../../core/services/user-token.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RepGerencialFavService } from '../../../../../core/services/gerencial/repGerencialFav.service';


@Component({
  selector: 'app-grafico-fav',
  templateUrl: './grafico-fav.component.html',
  styleUrls: ['./grafico-fav.component.css']
})
export class GraficoFavComponent implements OnInit {

  //Modulo Favoritos
  imgFavorito: string = "" //campo de la imagen favoritos
  infoFav = "" //información del favorito
  favoritesForm: FormGroup;
  favorites: any = [];
  
  constructor(  
    public activeModal: NgbActiveModal,
    private servFav: RepGerencialFavService,
    public userToken: UserTokenService) { }

  ngOnInit() {
    this.loadFavorites();
    this.favoritesForm = new FormGroup({
      favoriteChart: new FormControl()
    })
  }

  
  loadFavorites() {
    this.servFav.loadFavorites(this.userToken.getUserLogged().id).subscribe(res => {
      this.favorites = res
    })
   
  }

  changeFavorite(id) {
    this.servFav.loadOneFavorite(id).subscribe(res => {
      this.imgFavorito = "data:image/png;base64," + res.imagen
      this.infoFav = res.periodo + " - " + res.fecha
    })
  }

}
