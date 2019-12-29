import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { CidadeService } from '../../app/services/domain/cidade.service';
import { EstadoService } from '../../app/services/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../app/services/cliente.service';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public cidadeservice: CidadeService,
              public estadoservice: EstadoService,
              public clienteservice: ClienteService,
              public alertcontrol: AlertController) {

                  /*
    NO CAMPO FORMGROUP COMO VOCE COLOCOU NO CLASSES DO JAVA DTO
    VOCE PRECISA COLOCAR O NOME IGUAL ESTÁ NO CLASSE SE FOR DIFERENTE
    PODE DAR ERRO DE INSERT OU UPDATE OU DELETE DE ACORDO COM
    FORM GROUP
                  */  
                this.formGroup = this.formBuilder.group({
                  nome: ['Felipe Scarpin',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
                  email:['Felipe.scarpin@ti.com.br',[Validators.required,Validators.email]],
                  tipo:['1',[Validators.required]],
                  cpfOuCnpj : ['74560528080', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
                  senha:['123',[Validators.required]],
                  logradouro:['Rua TI',[Validators.required]],
                  numero:['12',[Validators.required]],
                  complemento:['Apto 3',[]],
                  bairro:['Copacabana',[]],
                  cep:['1082833',[Validators.required]],
                  telefone1:['9917243521',[Validators.required]],
                  telefone2:['',[]],
                  telefone3:['',[]],
                  estadoId:[null,[Validators.required]],
                  cidadeId:[null,[Validators.required]]
                });
  }
  

  ionViewDidLoad(){
    this.estadoservice.findAll()
    .subscribe(response =>{
       this.estados = response;
       this.formGroup.controls.estadoId.setValue(this.estados[0].id);
       this.updateCidades();
    },error =>{})
  }
  showInsertOk() {
    let alert = this.alertcontrol.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  signupUser(){
    this.clienteservice.insert(this.formGroup.value)
    .subscribe(response =>{
      this.showInsertOk();
    },
    error =>{});
    
  }
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeservice.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }
}
