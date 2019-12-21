import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Platform } from 'ionic-angular';

/*
  Generated class for the PotholeDetectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PotholeDetectorProvider {

  constructor(public deviceMotion: DeviceMotion, public platform: Platform) {
  }

  getAcceleration() {
    this.platform.ready().then(() => {
      let options = {
        frequency: 10
      }
      var subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration.x, acceleration.y, acceleration.z);
      });
    });
  }
}