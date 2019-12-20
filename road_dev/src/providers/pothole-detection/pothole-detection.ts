import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

/*
  Generated class for the PotholeDetectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PotholeDetectionProvider {

  constructor(private deviceMotion: DeviceMotion) {
    console.log('Hello PotholeDetectionProvider Provider');
    // Watch device acceleration
    if (document.URL.startsWith("http")) {
      var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        if (acceleration.y > 5) {
          console.log("more than 5");
        }
      });
    }
  }

}