import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

/**
 * Generated class for the MaintenanceQueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-query',
  templateUrl: 'maintenance-query.html',
})
export class MaintenanceQueryPage {

  queries: any = [];
  address: any;
  contractor: any = [];
  constructor(private nativeGeocoder: NativeGeocoder,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceQueryPage');
  }

  async getAddress(lt,ln){
    let place="";
    let postalCodel="";
    this.nativeGeocoder.reverseGeocode(lt, ln).then((result1: NativeGeocoderResult[]) => {
      place="";
      if(result1[0].postalCode!=undefined)
      {
        place+=result1[0].postalCode;
        postalCodel = result1[0].postalCode;
      }
      place+=".";
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
