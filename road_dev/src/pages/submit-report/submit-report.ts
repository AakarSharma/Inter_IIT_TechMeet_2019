import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SubmitReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submit-report',
  templateUrl: 'submit-report.html',
})
export class SubmitReportPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitReportPage');
  }

  submit(){

  }

  showProgress(){

  }

}
