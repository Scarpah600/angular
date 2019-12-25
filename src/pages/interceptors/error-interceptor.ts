import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; 
import { StorageService } from '../../app/services/storage.service';
import { AlertController } from 'ionic-angular';




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                this.handler403();
                break;
                case 401:
                this.handler401();
                break;
                default:
                this.handleDefaultError(errorObj);


            }

            return Observable.throw(errorObj);
        }) as any;
    }
    handler403(){
        this.storage.setLocalUser(null);
    }
    handleDefaultError(errorObj){
        let alert = this.alertController.create({
            title: 'Erro ' + errorObj.status + ' : ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]
        });
        alert.present();
    }
    handler401(){
        let alert = this.alertController.create({
        title: 'Error 401 : Falha de Autenticação',
        message: 'Email ou senha incorreto',
        enableBackdropDismiss: false,
        buttons: [
            {text: 'Ok'}
        ]
    });
    alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};