import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, ItemSliding, App, AlertController  } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GovtTendersDetailsPage } from '../govt-tenders-details/govt-tenders-details';

/**
 * Generated class for the GovtTendersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-tenders',
  templateUrl: 'govt-tenders.html',
})
export class GovtTendersPage {

  activeItemSliding: ItemSliding = null;
  tenders = [];

  constructor(private alertCtrl: AlertController,
              private app:App, 
              public http: HttpClient, 
              private fireauth: AngularFireAuth,
              private firedata: AngularFireDatabase, 
              public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtTendersPage');
  }
  
  ionViewWillEnter(){
    const database = this.firedata.database;
    var temp_tenders = [];
    database.ref('tender/').once('value', function(snapshot) {
      snapshot.forEach(function(child){
        temp_tenders.push({"name":child.child('roadname').val(),"code":child.key})
      })
    })
    .then(()=>{
      this.tenders = temp_tenders;
    });
  }
  
  
  createTender(){
    // Pass date also
    var d = new Date().toDateString();


  //   const animationsOptions = {
  //     animation: 'md-transition',
  //     duration: 1000
  //   }
  //   this.navCtrl.push(CreateCompanyPage, {}, animationsOptions);
  }

  deleteTender(index) {
  //   var id = this.companies[index].code;
  //   const database = this.firedata.database;
  //   database.ref('company/').child(id.substring(0,2)).once('value').then(snapshot => {
  //     database.ref('trash/').child(id.substring(0,2)+'('+Date.now()+')').update(snapshot.val()).then(data => {
  //       database.ref('company/').child(id.substring(0,2)).remove();
  //     })
  //   });
  //   this.companies.splice(index,1);
  //   var data = {
  //     "email": id + "@demo.com"
  //   };
  //   this.deleteUser(data);
  }

  openOption(itemSlide: ItemSliding, item: Item, event) {
    console.log('opening item slide..');
    event.stopPropagation(); // here if you want item to be tappable
    if (this.activeItemSliding) { // use this so that only one active sliding item allowed
      this.closeOption();
    }

    this.activeItemSliding = itemSlide;
    const swipeAmount = 50; // set your required swipe amount

    console.log('swipe amount ', swipeAmount);
    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass('active-slide', true);
    itemSlide.setElementClass('active-options-right', true);
    item.setElementStyle('transition', null);
    item.setElementStyle('transform', 'translate3d(-' + swipeAmount + 'px, 0px, 0px)');
  }

  closeOption() {
    console.log('closing item slide..');

    if (this.activeItemSliding) {
      this.activeItemSliding.close();
      this.activeItemSliding = null;
    }
  }

  showTender(index) {
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }
    this.navCtrl.push(GovtTendersDetailsPage,{"id":this.tenders[index].code}, animationsOptions);
  }

}
