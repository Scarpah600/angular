import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder) {

                this.formGroup = this.formBuilder.group({
                  nome: ['magdiel',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
                  email:['magdil@ti.com.br',[Validators.required,Validators.email]],
                  tipo:['1',[Validators.required]],
                  cpfOucpnj:['06134596280',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
                  senha:['123',[Validators.required]],
                  logradouro:['Rua TI',[Validators.required]],
                  numero:['12',[Validators.required]],
                  complemento:['Apto 3',[]],
                  bairro:['Copacabana',[]],
                  cep:['1082833',[Validators.required]],
                  telefone1:['9917243521',[Validators.required]],
                  telefone2:['',[]],
                  telefone3:['',[]],
                  estadoID:[null,[Validators.required]],
                  cidadeID:[null,[Validators.required]]
                });
  }
  
  signupUser(){
    console.log("Passou");
  }
}
