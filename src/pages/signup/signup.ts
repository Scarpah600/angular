import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { CidadeService } from '../../app/services/domain/cidade.service';
import { EstadoService } from '../../app/services/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';



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
              public estadoservice: EstadoService) {

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
  

  ionViewDidLoad(){
    this.estadoservice.findAll()
    .subscribe(response =>{
       this.estados = response;
       this.formGroup.controls.estadoID.setValue(this.estados[0].id);
       this.updateCidades();
    },error =>{})
  }

  signupUser(){
    console.log("Passou");
  }
  updateCidades(){
    let estado_id = this.formGroup.value.estadoID;
    this.cidadeservice.findAll(estado_id)
    .subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeID.setValue(null);
    }, error =>{})
  }
}
