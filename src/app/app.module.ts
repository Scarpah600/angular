import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//apagar referencia do import se for deletado ou se for inserido inserir no menu
@NgModule({
  declarations: [
    MyApp //Pagina Principal

  ],
  imports: [ //lista de modulos que são importados por ionicModulo // um modulo
    //pode importar varios modulos
    BrowserModule,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
