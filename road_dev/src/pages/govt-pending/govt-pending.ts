import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GovtVerifyPage } from '../govt-verify/govt-verify'
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

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

  cards = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtPendingPage');
  }

  ionViewWillEnter() {
    const database = this.firedata.database;
    var temp = [];
    database.ref('tender/').once('value', function (snapshot) {
      snapshot.forEach(function (child) {
        if (child.child("progress/verification_pending").val() == false) {
          console.log("Reached here")
          temp.push({ "tender_name": child.key, "contractor_name": child.child("contractor").val() })
        }
      })
    })
      .then(() => {
        this.cards = temp;
        console.log(this.cards)
      });
  }

  getTender(card) {
    this.navCtrl.push(GovtVerifyPage);
  }

}
