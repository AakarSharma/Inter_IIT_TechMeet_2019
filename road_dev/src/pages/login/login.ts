import { ContractorTabsPage } from './../contractor-tabs/contractor-tabs';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserHomePage } from '../user-home/user-home';
import { ContractorHomePage } from '../contractor-home/contractor-home';
import { GovtLoginPage } from '../govt-login/govt-login';
import { UserTabsPage } from '../user-tabs/user-tabs';
import { UserTabsPageModule } from '../user-tabs/user-tabs.module';
import { PotholeDetectionProvider } from '../../providers/pothole-detection/pothole-detection';
import { ContractorLoginPage } from '../contractor-login/contractor-login';
import { UserLoginPage } from '../user-login/user-login';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public pothole: PotholeDetectionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  user() {
    this.navCtrl.push(UserLoginPage);
  }

  contractor() {
    this.navCtrl.push(ContractorLoginPage);
  }

  government() {
    this.navCtrl.push(GovtLoginPage);
  }

}
