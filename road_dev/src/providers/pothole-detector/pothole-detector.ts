import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Platform } from 'ionic-angular';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Observable, zip } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class PotholeDetectorProvider {
  lat: any;
  lng: any;
  loc: boolean;

  constructor(private fireauth: AngularFireAuth, private firedata: AngularFireDatabase, public geo: Geolocation, private nativeGeocoder: NativeGeocoder, private gyroscope: Gyroscope, private deviceMotion: DeviceMotion, private platform: Platform) {
  }

  async getLocation() {
    let location = await this.geo.getCurrentPosition();
    this.lat = location.coords.latitude;
    this.lng = location.coords.longitude;
    this.loc = true;
  }

  toRadian(p) {
    return p * Math.PI / 180;
  }

  calculateDistance(latC, lngC) {
    var R = 6371000;
    var p1 = this.toRadian(this.lat);
    var p2 = this.toRadian(latC);
    var q1 = this.toRadian(latC - this.lat);
    var q2 = this.toRadian(lngC - this.lng);

    var a = Math.sin(q1 / 2) * Math.sin(q1 / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(q2 / 2) * Math.sin(q2 / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async savePothole() {
    const database = this.firedata.database;
    let allpotholes;
    await database.ref('affected_areas/247667/').once('value', function (snapshot) {
      allpotholes = snapshot.val();
    });

    let closePotholes = [];

    let tlat, tlan, tconfidence;
    for (let key in allpotholes) {
      tlat = allpotholes[key]["lan"];
      tlan = allpotholes[key]["lon"];
      if (this.calculateDistance(tlan, tlat) < 10) {
        closePotholes.push({ key: allpotholes[key] });
      }
    }

    let flat = this.lat, flan = this.lng, fconfidence = 1, fseverity = 0;
    for (let key in closePotholes) {
      await database.ref('affected_areas/247667/').child(key).remove();
      flat += closePotholes[key]["lan"];
      flan += closePotholes[key]["lon"];
      fconfidence += closePotholes[key]["confidence"];
      fseverity = Math.max(closePotholes[key]["severity"], fseverity);
    }

    await database.ref('affected_areas/').child("247667").child(Math.floor(Math.random() * 100000).toString()).push({
      "lan": flat,
      "lon": flan,
      "has_photo": false,
      "confidence": Math.max(fconfidence, 100),
      "photo": "as",
      "roadname": "unknown",
      "user": "demo",
      "severity": fseverity
    });
  }

  detect() {
    this.platform.ready().then(() => {
      let options = {
        frequency: 100
      }
      Observable.create()
      let sensors = zip(
        this.deviceMotion.watchAcceleration(options),
        this.gyroscope.watch(options)
      )

      let sensorsDataPack = [];

      sensors.subscribe(async (sensorsData) => {
        if (sensorsDataPack.length < 20) {
          if (sensorsData[0] && sensorsData[1]) {
            sensorsDataPack.push({ acceleration: sensorsData[0], gyroscope: sensorsData[1] });
          }
        } else if (sensorsDataPack.length == 20) {
          sensorsDataPack.shift();
          sensorsDataPack.push({ acceleration: sensorsData[0], gyroscope: sensorsData[1] });
          if (this.checkIsPotHole(sensorsDataPack)) {
            console.log("PotHole");
            this.getLocation().then((val) => {
              console.log(this.lat);
              this.savePothole().then((v)=>{
                sensorsDataPack = sensorsDataPack.slice(3);
              });
            }, (error)=>{
              console.log(error);
            });
          }
        }
      });
    }).catch((error) => {
      console.log("Use on Phone");
    });
  }

  diff(a) {
    return Math.max(...a) - Math.min(...a)
  }

  checkIsPotHole(sensorsDataPack) {
    let accelerationDataPack = sensorsDataPack.map(data => {
      return data.acceleration;
    });
    let gyroscopeDataPack = sensorsDataPack.map(data => {
      return data.gyroscope;
    });

    let ax = accelerationDataPack.map(data => {
      return data.x;
    });
    let ay = accelerationDataPack.map(data => {
      return data.y;
    });
    let az = accelerationDataPack.map(data => {
      return data.z;
    });

    let gx = gyroscopeDataPack.map(data => {
      return data.x;
    });
    let gy = gyroscopeDataPack.map(data => {
      return data.y;
    });
    let gz = gyroscopeDataPack.map(data => {
      return data.z;
    });

    return this.diff(ax) > 1 && this.diff(ay) > 1 && this.diff(az) > 1 && (this.diff(gx) > 0.1 || this.diff(gy) > 0.1 || this.diff(gz) > 0.1);
  }
}