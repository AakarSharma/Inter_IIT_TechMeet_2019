import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { ContractorTabsPage } from '../contractor-tabs/contractor-tabs';

/**
 * Generated class for the ContractorLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contractor-login',
  templateUrl: 'contractor-login.html',
})
export class ContractorLoginPage {

  //requiring the form elements
  @ViewChild('username') username;
  @ViewChild('password') password;
  public backgroundImage = 'assets/imgs/background-4.jpg';
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorLoginPage');
  }

  // login control goes hare
  login() {
    this.fire.auth.signInWithEmailAndPassword(this.username.value + "@contractor.com", this.password.value)
      .then(data => {
        this.navCtrl.setRoot(ContractorTabsPage);
      })
      .catch(error => {
        console.log('got an error .', error);
      }) 
  }
}
