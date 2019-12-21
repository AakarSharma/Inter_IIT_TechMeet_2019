import { MaintenanceReqPage } from './../maintenance-req/maintenance-req';
import { UserViewProjectsPage } from './../user-view-projects/user-view-projects';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserHomePage } from '../user-home/user-home';
import { UserProfilePage } from '../user-profile/user-profile'

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
  tab2Root = UserProfilePage;
  tab3Root = UserViewProjectsPage;
  tab4Root = MaintenanceReqPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
  }

}
