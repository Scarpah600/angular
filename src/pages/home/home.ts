import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credencias.dto';
import { AuthService } from '../../app/services/domain/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public loadcontrol: LoadingController ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
    
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});    
  }

  login() {
    let loader = this.presentLoading();
    this.auth.authenticate(this.creds)
      .subscribe(response => {
       
        loader.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {
        loader.dismiss();
      });    
  }
  signup(){
    
    this.navCtrl.push('SignupPage');
  }
  presentLoading(){
    let carregando = this.loadcontrol.create({
      content: "Carregando Página...",
      duration: 7000
    });
    carregando.present();
    return carregando;
  }
}