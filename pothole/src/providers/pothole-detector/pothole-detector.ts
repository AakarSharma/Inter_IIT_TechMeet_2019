import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

/*
  Generated class for the PotholeDetectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PotholeDetectorProvider {
  
  constructor() {
  }

  getAcceleration(){
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
    });    
  }

}
