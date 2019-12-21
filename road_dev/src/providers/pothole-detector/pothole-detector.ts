import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Platform } from 'ionic-angular';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Observable, merge } from 'rxjs';

/*
  Generated class for the PotholeDetectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PotholeDetectorProvider {

  constructor(private gyroscope: Gyroscope, private deviceMotion: DeviceMotion, private platform: Platform) {
  }

  detect() {
    this.platform.ready().then(() => {
      let options = {
        frequency: 100
      }

      let sensors = merge(
        this.deviceMotion.watchAcceleration(options),
        this.gyroscope.watch(options)
      )

      sensors.subscribe((sensorsData) => {
        for(let key in sensorsData){
          console.log(sensorsData[key]);
        }
      });
    });

  }
}