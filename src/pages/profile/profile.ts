  
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../app/services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../app/services/cliente.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

   cliente:ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //FAZER UM CAST SE TIRAR A TIPAGEM ELE VAI TRAZER OBJETO COMPLETO DO CLIENTE
          this.cliente = response as ClienteDTO;
         },
         error =>{
           if(error.status = 403){
             this.navCtrl.setRoot('HomePage');
           }
         });
        }
        else{
          this.navCtrl.setRoot('HomePage');
        }
    }
}