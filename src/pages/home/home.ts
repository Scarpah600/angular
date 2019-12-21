import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciasDTO } from '../../models/credencias.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'//referencia para arquivo html
})
export class HomePage {

  creds : CredenciasDTO = {
     email: "",
     senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');//vai impilhar uma na outra !
    //navegação
  }

  ionViewWillEnter(){
      this.menu.swipeEnable(false);
  }
  ionViewDidLeave(){
      this.menu.swipeEnable(true);
  }
  

}
