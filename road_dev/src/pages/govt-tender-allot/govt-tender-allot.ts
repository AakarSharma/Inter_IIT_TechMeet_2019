import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the GovtTenderAllotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-tender-allot',
  templateUrl: 'govt-tender-allot.html',
})
export class GovtTenderAllotPage {

  contractor:any=[];
  selectedContractor:string="";
  tenders:any=[];
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fireauth: AngularFireAuth,
              private firedata: AngularFireDatabase ,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtTenderAllotPage');
  }

  async ionViewWillEnter(){
        await this.getContractors();
        this.loading = this.loadingCtrl.create({
          content: 'Fetching Data......',
          spinner:'bubbles'
          });
        this.loading.present();
        const database = this.firedata.database;
        var temp_tenders;
        const auth = this.fireauth.auth;
        var temp = auth.currentUser;
        var temp_email = temp.email;
        let govt = temp_email.split("@")[0];
        await database.ref('tender/').once('value', function(snapshot) {
            temp_tenders = snapshot.val();
        })
        .then(()=>{
          console.log(temp_tenders)
          Object.keys(temp_tenders).forEach(key => {
            console.log(key)
            var tender_id = key;
            if(temp_tenders[key]["govt"] == govt && temp_tenders[key]["status"]==0){
              temp_tenders[tender_id]["id"]=tender_id;
              this.tenders.push(temp_tenders[key]);
            }
          });
        }).then(()=>{
          if(this.loading)
            this.loading.dismiss();
        });
  }
  async getContractors(){
    const database = this.firedata.database;
    const auth = this.fireauth.auth;
		var temp_c;
    await database.ref('contractor/').once('value', function(snapshot) {
      temp_c = snapshot.val();
    })
    .then(()=>{
      this.contractor = Object.keys(temp_c);
      if(this.contractor.length!=0)
        this.selectedContractor = this.contractor[0];
      console.log(this.contractor);
    });
  }

  async allotTender(id){
    const database = this.firedata.database;
    await database.ref('tender/').child(id).child("status").set(1);
    await database.ref('tender/').child(id).child("contractor").set(this.selectedContractor);
    await database.ref('tender/').child(id).child("startdate").set(new Date().toDateString());
  }
}
