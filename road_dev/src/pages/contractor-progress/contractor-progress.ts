import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams } from 'ionic-angular';
import * as p5 from 'p5';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserReportPage } from '../user-report/user-report'

// import { Chart } from 'chart.js';

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

  build: any;
  validate: any;

  constructor(private fireauth: AngularFireAuth, private firedata: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    const database = this.firedata.database;
    const auth = this.fireauth.auth;
    var lol;
    let road_length = 1;

    database.ref('tender/').child("1").child('progress').once('value').then((snapshot) => {
      lol = snapshot.val();
    }).then(() => {
      if (lol.hasOwnProperty('build')) {
        this.build = lol["build"];
      }else{
        this.build = "[]";
      }

      if (lol.hasOwnProperty('validate')) {
        this.validate = lol["validate"];
      }else{
        this.validate = "[]";
      }

      database.ref('tender/').child("1").child('length_road').once('value').then((snapshot) => {
        road_length = snapshot.val();

        let temp = p => {
          p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(240);
            p.strokeWeight(12);

            p.stroke(255, 0, 0);
            p.line(20, 50, window.innerWidth - 20, 50);
            // bulid
            if (this.build.hasOwnProperty('job1')) {
              let bjob1 = JSON.parse(this.build["job1"]);
              for (let i in bjob1) {
                p.stroke(255, 255, 0);
                p.line(20 + bjob1[i][0] * (window.innerWidth - 20 * 2) / road_length, 50, 20 + bjob1[i][1] * (window.innerWidth - 20 * 2) / road_length, 50);
              }
            }
            // validate
            if (this.validate.hasOwnProperty('job1')) {
              let vjob1 = JSON.parse(this.validate["job1"]);
              for (let i in vjob1) {
                p.stroke(0, 255, 0);
                p.line(20 + vjob1[i][0] * (window.innerWidth - 20 * 2) / road_length, 50, 20 + vjob1[i][1] * (window.innerWidth - 20 * 2) / road_length, 50);
              }
            }


            p.stroke(255, 0, 0);
            p.line(20, 100, window.innerWidth - 20, 100);
            // bulid
            if (this.build.hasOwnProperty('job2')) {
              let bjob2 = JSON.parse(this.build["job2"]);
              for (let i in bjob2) {
                p.stroke(255, 255, 0);
                p.line(20 + bjob2[i][0] * (window.innerWidth - 20 * 2) / road_length, 100, 20 + bjob2[i][1] * (window.innerWidth - 20 * 2) / road_length, 100);
              }
            }
            // validate
            if (this.validate.hasOwnProperty('job2')) {
              let vjob2 = JSON.parse(this.validate["job2"]);
              for (let i in vjob2) {
                p.stroke(0, 255, 0);
                p.line(20 + vjob2[i][0] * (window.innerWidth - 20 * 2) / road_length, 100, 20 + vjob2[i][1] * (window.innerWidth - 20 * 2) / road_length, 100);
              }
            }

            p.stroke(255, 0, 0);
            p.line(20, 150, window.innerWidth - 20, 150);
            // bulid
            if (this.build.hasOwnProperty('job3')) {
              let bjob3 = JSON.parse(this.build["job3"]);
              for (let i in bjob3) {
                p.stroke(255, 255, 0);
                p.line(20 + bjob3[i][0] * (window.innerWidth - 20 * 2) / road_length, 150, 20 + bjob3[i][1] * (window.innerWidth - 20 * 2) / road_length, 150);
              }
            }
            // validate
            if (this.validate.hasOwnProperty('job3')) {
              let vjob3 = JSON.parse(this.validate["job3"]);
              for (let i in vjob3) {
                p.stroke(0, 255, 0);
                p.line(20 + vjob3[i][0] * (window.innerWidth - 20 * 2) / road_length, 150, 20 + vjob3[i][1] * (window.innerWidth - 20 * 2) / road_length, 150);
              }
            }

            p.stroke(255, 0, 0);
            p.line(20, 200, window.innerWidth - 20, 200);
            // bulid
            if (this.build.hasOwnProperty('job4')) {
              let bjob4 = JSON.parse(this.build["job4"]);
              for (let i in bjob4) {
                p.stroke(255, 255, 0);
                p.line(20 + bjob4[i][0] * (window.innerWidth - 20 * 2) / road_length, 200, 20 + bjob4[i][1] * (window.innerWidth - 20 * 2) / road_length, 200);
              }
            }
            // validate
            if (this.validate.hasOwnProperty('job4')) {
              let vjob4 = JSON.parse(this.validate["job4"]);
              for (let i in vjob4) {
                p.stroke(0, 255, 0);
                p.line(20 + vjob4[i][0] * (window.innerWidth - 20 * 2) / road_length, 200, 20 + vjob4[i][1] * (window.innerWidth - 20 * 2) / road_length, 200);
              }
            }

            p.stroke(255, 0, 0);
            p.line(20, 250, window.innerWidth - 20, 250);
            // bulid
            if (this.build.hasOwnProperty('job5')) {
              let bjob5 = JSON.parse(this.build["job5"]);
              for (let i in bjob5) {
                p.stroke(255, 255, 0);
                p.line(20 + bjob5[i][0] * (window.innerWidth - 20 * 2) / road_length, 250, 20 + bjob5[i][1] * (window.innerWidth - 20 * 2) / road_length, 250);
              }
            }
            // validate
            if (this.validate.hasOwnProperty('job5')) {
              let vjob5 = JSON.parse(this.validate["job5"]);
              for (let i in vjob5) {
                p.stroke(0, 255, 0);
                p.line(20 + vjob5[i][0] * (window.innerWidth - 20 * 2) / road_length, 250, 20 + vjob5[i][1] * (window.innerWidth - 20 * 2) / road_length, 250);
              }
            }

            p.textSize(16);
            p.noStroke();
            p.fill(0, 102, 153);
            p.textAlign(p.CENTER);
            p.text('SUBGRADE', window.innerWidth / 2, 40);
            p.text('GSB', window.innerWidth / 2, 90);
            p.text('WMM', window.innerWidth / 2, 140);
            p.text('BDM', window.innerWidth / 2, 190);
            p.text('AC/BC', window.innerWidth / 2, 240);

            p.rectMode(p.CENTER);
            p.textAlign(p.LEFT);
            p.textSize(18);
            p.fill(255, 0, 0);
            p.rect(20, 400, 10, 10);
            p.fill(100);
            p.text('Not Done', 30, 405);

            p.fill(255, 255, 0);
            p.rect(20, 435, 10, 10);
            p.fill(100);
            p.text('Not Verified', 30, 440);

            p.fill(0, 255, 0);
            p.rect(20, 470, 10, 10);
            p.fill(100);
            p.text('Done', 30, 475);

          };

          p.draw = () => {
            p.noLoop();
          };
        };
        new p5(temp, document.getElementById("progressline"));
      });
    });
  }

  report(){
    this.navCtrl.push(UserReportPage);
  }


}
