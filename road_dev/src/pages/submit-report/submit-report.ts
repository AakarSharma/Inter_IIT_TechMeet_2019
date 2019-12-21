import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { ContractorProgressPage } from './../contractor-progress/contractor-progress';


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

  today = new Date();

  username;
  tenderId: any;
  roadLength;

  job1: any = { lower: 0, upper: 5 };
  job2: any = { lower: 0, upper: 5 };
  job3: any = { lower: 0, upper: 5 };
  job4: any = { lower: 0, upper: 5 };
  job5: any = { lower: 0, upper: 5 };

  constructor(public navCtrl: NavController, public navParams: NavParams, private fireauth: AngularFireAuth, private firedata: AngularFireDatabase) {
    const database = this.firedata.database;
    const auth = this.fireauth.auth;
    var temp = auth.currentUser;
    var temp_email = temp.email;
    this.username = temp_email.split("@")[0];
    this.tenderId = navParams.get("id");
    var lol;
    database.ref('tender/').child(this.tenderId).child('length_road').once('value').then(function (snapshot) {
      lol = snapshot.val();
    }).then(() => {
      this.roadLength = lol;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitReportPage');
    console.log("Id of tender is " + this.tenderId);
  }

  formatDate() {
    var d = new Date(this.today),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  submit() {
    const database = this.firedata.database;
    var lol;
    var build;
    database.ref('tender/').child("1").child('progress').once('value').then((snapshot) => {
      lol = snapshot.val();
    })
      .then(() => {
        build = lol["build"]
        console.log(JSON.parse(build["job1"]))
        var new_build = {
          "job1": JSON.parse(build["job1"]),
          "job2": JSON.parse(build["job2"]),
          "job3": JSON.parse(build["job3"]),
          "job4": JSON.parse(build["job4"]),
          "job5": JSON.parse(build["job5"])
        }
        var temp = [this.job1.lower, this.job1.upper]
        new_build['job1'].push(temp)
        var temp = [this.job2.lower, this.job2.upper]
        new_build['job2'].push(temp)
        var temp = [this.job3.lower, this.job3.upper]
        new_build['job3'].push(temp)
        var temp = [this.job4.lower, this.job4.upper]
        new_build['job4'].push(temp)
        var temp = [this.job5.lower, this.job5.upper]
        new_build['job5'].push(temp)
        console.log(new_build)
        
        var element =  {
          "job1": JSON.stringify(new_build["job1"]),
          "job2": JSON.stringify(new_build["job2"]),
          "job3": JSON.stringify(new_build["job3"]),
          "job4": JSON.stringify(new_build["job4"]),
          "job5": JSON.stringify(new_build["job5"])
        }
        database.ref('tender/').child(this.tenderId).child('progress').child('build').set(element);
        // database.ref('tender/').child(this.tenderId).child('progress').update(lol);
        // database.ref('tender/').child(this.tenderId).child('progress').child(tkey).set(temp);
        // database.ref('tender/').child(this.tenderId).child('progress').update({ "left1": this.left.job1 - temp["job1"] });
        // database.ref('tender/').child(this.tenderId).child('progress').update({ "left2": this.left.job2 - temp["job2"] });
        // database.ref('tender/').child(this.tenderId).child('progress').update({ "left3": this.left.job3 - temp["job3"] });
        // database.ref('tender/').child(this.tenderId).child('progress').update({ "left4": this.left.job4 - temp["job4"] });
        // database.ref('tender/').child(this.tenderId).child('progress').update({ "left5": this.left.job5 - temp["job5"] });
        database.ref('tender/').child(this.tenderId).child('progress').update({ "verification_pending": false });
        this.navCtrl.pop();
      })
  }

  showProgress() {
    this.navCtrl.push(ContractorProgressPage, { "id": this.tenderId });
  }

}
