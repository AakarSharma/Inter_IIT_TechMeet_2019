import { MaintenanceReqPage } from './../maintenance-req/maintenance-req';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { PotholeDetectorProvider } from '../../providers/pothole-detector/pothole-detector'
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
  lat: any;
  lng: any;
  loc: boolean;
  map: any;
  potholes: any;

  constructor(private potholeDetectorProvider: PotholeDetectorProvider, private fireauth: AngularFireAuth, private firedata: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public geo: Geolocation) {
    this.potholes = [];
    this.potholeDetectorProvider.detect();
  }

  async getLocation() {
    await this.geo.getCurrentPosition().then((location) => {
      this.lat = location.coords.latitude;
      this.lng = location.coords.longitude;
    }).then(() => {
      this.loc = true;
    });
  }

  async ionViewDidLoad() {
    if(!this.map){
      await this.getLocation().then(()=>{
        this.map = L.map('map').setView([this.lat, this.lng], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoidmlrYXNnb2xhMTIzMTMiLCJhIjoiY2s0ZjR2bWhrMGkwcTNkbnBja2loZ3B3dSJ9.gd49oQODGO07vZkGOOsmog', {
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          accessToken: 'pk.eyJ1IjoidmlrYXNnb2xhMTIzMTMiLCJhIjoiY2s0ZjRydnhyMGh5YzNqbnBuZTJvNjF4eiJ9.4p6cRrpJT8C6ypZAbZD8yA'
        }).addTo(this.map);
        L.marker([this.lat, this.lng]).addTo(this.map);
        this.printPotholes();
      });
    }
  }

  printPotholes() {
    const database = this.firedata.database;
    const auth = this.fireauth.auth;
    let lol;
    database.ref('affected_areas/').child("247667").once('value').then(function (snapshot) {
      lol = snapshot.val();
    }).then(() => {
      this.potholes = lol;
      this.potholes.forEach(pothole => {
        if (pothole != undefined) {
          var circle = L.circle([pothole["lan"], pothole["lon"]], {
            color: 'transparent',
            fillColor: '#f03',
            fillOpacity: 0.01 * pothole["confidence"],
            radius: 5
          }).addTo(this.map);
        }
      });
    });
  }

  navToMaintenanceReq() {
    this.navCtrl.push(MaintenanceReqPage);
  }

}