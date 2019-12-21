import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GovtVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-verify',
  templateUrl: 'govt-verify.html',
})
export class GovtVerifyPage {

  job = {
		job1: '',
		job2: '',
		job3: '',
		job4: '',
		job5: ''
  };
  
  left = {
    job1: '',
		job2: '',
		job3: '',
		job4: '',
		job5: ''
  };

  tenderId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tenderId = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtVerifyPage');
  }

  verify() {
    
  }

}
