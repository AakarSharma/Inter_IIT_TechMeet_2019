import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GovtPendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-pending',
  templateUrl: 'govt-pending.html',
})
export class GovtPendingPage {

  cards = [
    {
      tender_name: 'abc',
      contractor_name: 'Madison Map',
      date: '18 min',
    },
    {
      tender_name: 'abc',
      contractor_name: 'Super Mario Map',
      date: '3 hr',
    },
    {
      tender_name: 'abc',
      contractor_name: 'Paris Map',
      date: '26 min',
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtPendingPage');
  }

  getDirections(card) {
    
  }

}
