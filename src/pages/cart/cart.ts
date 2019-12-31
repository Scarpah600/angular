import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../app/services/cart.service';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartservice: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartservice.getCart();
    this.items = cart.items;
  }

  

}
