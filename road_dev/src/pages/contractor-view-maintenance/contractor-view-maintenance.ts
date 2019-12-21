import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ContractorViewMaintenancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contractor-view-maintenance',
  templateUrl: 'contractor-view-maintenance.html',
})
export class ContractorViewMaintenancePage {

  loading :any;
  maintenance:any = [];
  contractor:string = "demo";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase ,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorViewMaintenancePage');
  }

  async ionViewWillEnter(){
    this.loading = this.loadingCtrl.create({
      content: 'Fetching Data......',
      spinner:'bubbles'
      });
    const database = this.firedata.database;
    const auth = this.fireauth.auth;
		var temp = auth.currentUser;
    var temp_email = temp.email;
    var temp_tenders;
		this.contractor = temp_email.split("@")[0];
    await database.ref('maintenance/').child(this.contractor).once('value', function(snapshot) {
      temp_tenders = snapshot.val();
    })
    .then(()=>{
      var keysTenders = Object.keys(temp_tenders);
      for( let x of keysTenders){
        var x2 = Object.keys(temp_tenders[x]);
        for ( let ele of x2){
          var rt = temp_tenders[x][ele];
          rt["year"]=x;
          rt["day"]=ele;
          console.log(temp_tenders[x][ele]);
          this.maintenance.push(rt);
        }
      }
      }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
  }

  async markDone(year,day){
    const database = this.firedata.database;
    await database.ref('maintenance/').child(this.contractor).child(year).child(day).set(null);
    this.ionViewWillEnter();
  }
}
