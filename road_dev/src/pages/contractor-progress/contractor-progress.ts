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
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('halfDoughnutCanvas') halfDoughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('radarCanvas') radarCanvas;
  @ViewChild('polarCanvas') polarCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  @ViewChild('bubbleCanvas') bubbleCanvas;
  @ViewChild('mixedCanvas') mixedCanvas;

  barChart: any;
  doughnutChart: any;
  halfDoughnutChart: any;
  lineChart: any;
  polarAreaChart: any;
  pieChart: any;
  bubbleChart: any;
  mixedChart: any;

  slides = [
    {
      title: 'SubGrade',
      private: false
    },
    {
      title: 'GSB',
      private: false
    },
    {
      title: 'WMM',
      private: true
    },
    {
      title: 'DBM',
      private: true
    },
    {
      title: 'AC / BC',
      private: true
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorProgressPage');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.pieChart = this.getPieChart();
    }, 350);
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

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType,
    });
  }

  getPieChart() {
    const data = {
      labels: ['Not Done', 'Not Verfied', 'Verified'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);

  }

}
