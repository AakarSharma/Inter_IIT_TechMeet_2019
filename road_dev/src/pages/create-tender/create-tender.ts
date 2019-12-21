import { Component, ViewChild, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the CreateTenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-create-tender',
  templateUrl: 'create-tender.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2500ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1500ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2500ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2500ms ease-in')
      ])
    ])
  ],
})
export class CreateTenderPage {

  @ViewChild('roadname') roadname;
  @ViewChild('roadlength') roadlength;
  @ViewChild('startdate') startdate;
  @ViewChild('enddate') enddate;

  govtname

  constructor(public navCtrl: NavController, public navParams: NavParams, private fireauth: AngularFireAuth, private firedata: AngularFireDatabase) {
    const auth = this.fireauth.auth;
    var temp = auth.currentUser;
    var temp_email = temp.email;
    this.govtname = temp_email.split("@")[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTenderPage');
  }

  createTender() {
    const database = this.firedata.database;
    var temp = {}
    temp['roadname'] = this.roadname.value;
    temp['length_road'] = this.roadlength.value;
    temp['issuedate'] = this.startdate.value;
    temp['expectedenddate'] = this.enddate.value;
    temp['status'] = 0
    temp['govt'] = this.govtname
    var lol;
    database.ref('tender/').limitToLast(1).once('value').then(function (snapshot) {
      lol = snapshot.val();
      lol = Object.keys(lol)[0]
    }).then(() => {
      lol = parseInt(lol) + 1;
      var key = lol.toString()
      database.ref('tender/').child(key).set(temp);
    });
    this.navCtrl.pop();
  }
}
