import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../app/services/produto.service';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoservice: ProdutoService,
              public loadcontrol: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }
  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoservice.findByCategoria(categoria_id)
    .subscribe(response =>{
      this.items = response['content'];
      loader.dismiss();
    },error=>{
      loader.dismiss()
    });
  }

  showDetail(produtos_id : string){
    this.navCtrl.push('ProdutoDetailPage',{produtos_id: produtos_id});
  }
  presentLoading(){
    let carregando = this.loadcontrol.create({
      content: "Carregando Página...",
    });
    carregando.present();
    return carregando;
  }
  doRefresh(refresher){
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}