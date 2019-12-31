import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../app/services/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../app/services/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {
  
  item: ProdutoDTO;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public produtoservice: ProdutoService,
             public cartservice: CartService) {
  }

  ionViewDidLoad() {
      let produtos_id = this.navParams.get('produtos_id');
      this.produtoservice.findById(produtos_id)
      .subscribe(response =>{
        this.item = response;
      },error => {});
  }

  addToCart(produto: ProdutoDTO){
      this.cartservice.addProduto(produto);
      this.navCtrl.setRoot('CartPage');
  }

}
