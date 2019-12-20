import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, ItemSliding, App, AlertController  } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the GovtContractorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-contractors',
  templateUrl: 'govt-contractors.html',
})
export class GovtContractorsPage {

  activeItemSliding: ItemSliding = null;
  contractors = [];

  constructor(private alertCtrl: AlertController,
    private app:App, 
    public http: HttpClient, 
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtContractorsPage');
  }

  ionViewWillEnter(){
    // const database = this.firedata.database;
    // var temp_companies = [];
    // database.ref('company/').once('value', function(snapshot) {
    //   snapshot.forEach(function(child){
    //     temp_companies.push({"name":child.child('details').child('name').val(),"code":child.key})
    //   })
    // })
    // .then(()=>{
    //   this.companies = temp_companies;
    // });
  }
  
  
  createContractor(){
  //   const animationsOptions = {
  //     animation: 'md-transition',
  //     duration: 1000
  //   }
  //   this.navCtrl.push(CreateCompanyPage, {}, animationsOptions);
  }

  deleteContractor(index) {
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

  showContractor(index) {
  //   const animationsOptions = {
  //     animation: 'ios-transition',
  //     duration: 1000
  //   }
  //   this.navCtrl.push(EditCompanyPage,{"id":this.companies[index].code}, animationsOptions);
  }

  logout(){
    const auth = this.fireauth.auth;
    
    if(auth.currentUser != null){
      let alert = this.alertCtrl.create({
        title: 'Confirm Sign Out',
        message: 'Do you want to sign Out?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Sign Out',
            handler: () => {
              auth.signOut().then(() =>{
                this.app.getRootNav().setRoot(LoginPage);
                // Sign-out successful.
              }, function(error) {
                // An error happened.
              });
            }
          }
        ]
      });
      alert.present();
    };
    
  }

}
