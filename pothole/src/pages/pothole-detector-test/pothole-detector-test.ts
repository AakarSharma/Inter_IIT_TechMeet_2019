import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PotholeDetectorProvider } from '../../providers/pothole-detector/pothole-detector';

/**
 * Generated class for the PotholeDetectorTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pothole-detector-test',
  providers: [PotholeDetectorProvider],
  templateUrl: 'pothole-detector-test.html',
})
export class PotholeDetectorTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: PotholeDetectorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PotholeDetectorTestPage');
    this.provider.getAcceleration();

  }

}
