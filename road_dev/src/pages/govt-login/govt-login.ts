import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { GovtTabsPage } from '../govt-tabs/govt-tabs';

/**
 * Generated class for the GovtLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-login',
  templateUrl: 'govt-login.html',
})
export class GovtLoginPage {
	//requiring the form elements
  @ViewChild('username') username;
  @ViewChild('password') password;
  
  user:FormGroup;

	public backgroundImage = 'assets/imgs/background-4.jpg';
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtLoginPage');
  }

  // login control goes hare
  login() {
    this.fire.auth.signInWithEmailAndPassword(this.username.value + "@govt.com", this.password.value)
      .then(data => {
        this.navCtrl.setRoot(GovtTabsPage);
      })
      .catch(error => {
        console.log('got an error .', error);
      }) 
  }

}
