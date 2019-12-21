import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  ranks: number[][]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ranks = []
    this.numbers = Array(100).fill(0).map((x,i)=>i);
    for(let i = 0; i < 100; i++) {
      this.ranks[i] = [];
      for(let j=0; j < 5; j++) {
        this.ranks[i][j] = 0;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorProgressPage');
    for(let i = 0; i < 100; i++) {
      for(let j=0; j < 5; j++) {
        let block = <HTMLElement>document.querySelector('#block-'+i+'-'+j);
        if(this.ranks[i][j] == 0){
          block.style.backgroundColor = "red";
        }
        else{
          if(this.ranks[i][j] == 1){
            block.style.backgroundColor = "yellow";
          }
          else{
            block.style.backgroundColor = "green";
          }
        }
      }
    }
  }

}
