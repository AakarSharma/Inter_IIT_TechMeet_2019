import { UserViewProjectsPage } from './../user-view-projects/user-view-projects';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { UserHomePage } from '../user-home/user-home';

/**
 * Generated class for the UserTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-tabs',
  templateUrl: 'user-tabs.html',
})
export class UserTabsPage {

  tab1Root = UserHomePage;
  tab2Root = AboutPage;
  tab3Root = UserViewProjectsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
  }

}
