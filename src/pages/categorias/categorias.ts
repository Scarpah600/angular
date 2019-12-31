import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../app/services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

   items: CategoriaDTO[];

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response);
        this.items = response;
      },
      error => {});
  }
  showProdutos(categoria_id: string) {
    this.navCtrl.push('ProdutosPage',{categoria_id: categoria_id});    
  }
}
