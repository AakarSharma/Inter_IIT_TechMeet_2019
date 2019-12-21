import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the ContractorProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contractor-progress',
  templateUrl: 'contractor-progress.html',
})
export class ContractorProgressPage {

  numbers = [];
  ranks: number[][];

  @ViewChild('slider') slider: Slides;

  slides = [
    {
      title: 'Dream\'s Adventure',
      imageUrl: 'assets/imgs/wishlist-1.jpg',
      songs: 2,
      private: false
    },
    {
      title: 'For the Weekend',
      imageUrl: 'assets/imgs/wishlist-2.jpg',
      songs: 4,
      private: false
    },
    {
      title: 'Family Time',
      imageUrl: 'assets/imgs/wishlist-3.jpg',
      songs: 5,
      private: true
    },
    {
      title: 'My Trip',
      imageUrl: 'assets/imgs/wishlist-4.jpg',
      songs: 12,
      private: true
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorProgressPage');
  }

  currentIndex = 0;

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.currentIndex);
  }

}
