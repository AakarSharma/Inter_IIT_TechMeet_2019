import { SubmitReportPage } from './../submit-report/submit-report';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-contractor-home',
  templateUrl: 'contractor-home.html',
})
export class ContractorHomePage {

  present: boolean = true;
  contracts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.contracts=["Hello","World"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorHomePage');
  }

  showPastContracts(){
    this.present = false;
  }

  showPresentContracts(){
    this.present = true;
  }

  navToSubmitReport(){
    this.navCtrl.push(SubmitReportPage);
  }
}
