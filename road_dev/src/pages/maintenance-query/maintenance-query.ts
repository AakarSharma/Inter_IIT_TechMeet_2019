import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-maintenance-query',
  templateUrl: 'maintenance-query.html',
})
export class MaintenanceQueryPage {

  queries: any = [];
  address: any;
  contractor: any = [];
  loading: any;
  constructor(private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase ,
    public loadingCtrl: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async ionViewWillEnter(){
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
    
    await database.ref('affected_areas/').once('value', function(snapshot) {
        temp_tenders = snapshot.val();
    })
    .then(()=>{
      temp_tenders.forEach(element => {
        if( element["govt"]== govt && element["status"]==0){
          // this.futureP.push(element);
        } else if(element["govt"]== govt && element["status"]==1){
          // this.presentP.push(element);
        } else {
          // this.pastP.push(element);
        }
      });
    }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceQueryPage');
  }

  async getAddress(lt,ln){
    let place="";
    let postalCodel="";
    this.nativeGeocoder.reverseGeocode(lt, ln).then((result1: NativeGeocoderReverseResult[]) => {
      place="";
      console.log(result1[0]);
      if(result1[0].postalCode!=undefined)
      {
        place+=result1[0].postalCode;
        postalCodel = result1[0].postalCode;
      }
    })
    .catch((error: any) => console.log(error));
  }

  authenticate(q){
      if(q==1){
        // Increase rating of user
        //Assign task to contractor
      } else {
        //Decrease Rating of User
      }
  }

  getContractors(){
    //Sort contractors(1st contractor of road), others could be random.
  }

}
