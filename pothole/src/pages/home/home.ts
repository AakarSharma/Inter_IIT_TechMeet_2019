import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PotholeDetectorTestPage } from '../pothole-detector-test/pothole-detector-test';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    navCtrl.push(PotholeDetectorTestPage);
  }

}
