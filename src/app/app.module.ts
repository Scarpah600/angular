import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from './services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../pages/interceptors/error-interceptor';
import { AuthService } from './services/domain/auth.service';
import { StorageService } from './services/storage.service';
import { ClienteService } from './services/cliente.service';
import { AuthInterceptorProvider } from '../pages/interceptors/auth-interceptor';
import { ProdutoService } from './services/produto.service';
import { CartService } from './services/cart.service';
import { PedidoService } from './services/pedido.service';


//apagar referencia do import se for deletado ou se for inserido inserir no menu
@NgModule({
  declarations: [
    MyApp //Pagina Principal

  ],
  imports: [ //lista de modulos que são importados por ionicModulo // um modulo
    //pode importar varios modulos
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  //Como a app vai iniciar
  bootstrap: [IonicApp],
  //Vai ser pagina tenque declarar tambem 
  entryComponents: [
    MyApp
  ],
  //providers vai declarar as classes objetos injetados para esse modulo mesma istancia
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService,
    CartService,
    PedidoService
  ]
})
export class AppModule {}
