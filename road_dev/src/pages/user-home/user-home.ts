import { MaintenanceReqPage } from './../maintenance-req/maintenance-req';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

/**
 * Generated class for the UserHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var L;

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {
  @ViewChild('map') mapElement: ElementRef;
  lat:any;
  lng:any;
  loc:boolean;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geo:Geolocation) {
  }

  async getLocation(){
    await this.geo.getCurrentPosition().then((location) => {
      this.lat=location.coords.latitude;
      this.lng=location.coords.longitude;
    }).then(()=>{
      this.loc = true;
    });
  }
  ionViewDidLoad() {
    this.getLocation();
    var mymap = L.map('map').setView([this.lat, this.lng], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoidmlrYXNnb2xhMTIzMTMiLCJhIjoiY2s0ZjR2bWhrMGkwcTNkbnBja2loZ3B3dSJ9.gd49oQODGO07vZkGOOsmog', {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoidmlrYXNnb2xhMTIzMTMiLCJhIjoiY2s0ZjRydnhyMGh5YzNqbnBuZTJvNjF4eiJ9.4p6cRrpJT8C6ypZAbZD8yA'
    }).addTo(mymap);
  }

  navToMaintenanceReq() {
    this.navCtrl.push(MaintenanceReqPage);
  }

}
