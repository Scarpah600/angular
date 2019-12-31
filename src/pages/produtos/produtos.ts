import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              public produtoservice: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoservice.findByCategoria(categoria_id)
    .subscribe(response =>{
      this.items = response['content'];
    },error=>{});
  }
  showDetail(produtos_id : string){
    this.navCtrl.push('ProdutoDetailPage',{produtos_id: produtos_id});
  }
}