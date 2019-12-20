import { ContractorTabsPage } from './../contractor-tabs/contractor-tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserHomePage } from '../user-home/user-home';
import { ContractorHomePage } from '../contractor-home/contractor-home';
import { UserTabsPage } from '../user-tabs/user-tabs';
import { UserTabsPageModule } from '../user-tabs/user-tabs.module';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  user() {
    this.navCtrl.setRoot(UserTabsPage);
  }

  contractor() {
    this.navCtrl.setRoot(ContractorTabsPage);
  }

}
