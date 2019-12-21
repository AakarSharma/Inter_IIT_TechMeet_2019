import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Platform } from 'ionic-angular';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Observable, zip } from 'rxjs';

@Injectable()
export class PotholeDetectorProvider {

  constructor(private gyroscope: Gyroscope, private deviceMotion: DeviceMotion, private platform: Platform) {
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

      sensors.subscribe((sensorsData) => {
        if (sensorsDataPack.length < 20) {
          if (sensorsData[0] && sensorsData[1]) {
            sensorsDataPack.push({ acceleration: sensorsData[0], gyroscope: sensorsData[1] });
          }
        } else if (sensorsDataPack.length == 20) {
          sensorsDataPack.shift();
          sensorsDataPack.push({ acceleration: sensorsData[0], gyroscope: sensorsData[1] });
          if (this.checkIsPotHole(sensorsDataPack)) {
            console.log("PotHole");
          }
        }
      });
    });
  }

  diff(a){
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