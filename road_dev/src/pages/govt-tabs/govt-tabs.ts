import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GovtTendersPage } from '../govt-tenders/govt-tenders';
import { GovtContractorsPage } from '../govt-contractors/govt-contractors';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the GovtTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-tabs',
  templateUrl: 'govt-tabs.html',
})
export class GovtTabsPage {
  tab1Root = GovtTendersPage;
  tab2Root = GovtContractorsPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtTabsPage');
  }

}
