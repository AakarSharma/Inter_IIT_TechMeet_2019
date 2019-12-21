import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-maintenance-query',
  templateUrl: 'maintenance-query.html',
})
export class MaintenanceQueryPage {

  queries: any = [];
  address: any;;
  contractor: any = [];
  loading: any;
  selectedContractor: string = null;
  
  constructor(private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase ,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async getContractors(){
    const database = this.firedata.database;
    const auth = this.fireauth.auth;
		var temp = auth.currentUser;
		var temp_c;
    await database.ref('contractor/').once('value', function(snapshot) {
      temp_c = snapshot.val();
    })
    .then(()=>{
      this.contractor = Object.keys(temp_c);
      if(this.contractor.length()!=0)
        this.selectedContractor = this.contractor[0];
      console.log(this.contractor);
    });
  }
  async ionViewWillEnter(){
    this.loading = this.loadingCtrl.create({
        content: 'Fetching Data......',
        spinner:'bubbles'
        });
    this.loading.present();
    const database = this.firedata.database;
    var temp_tenders;
      
    var temp_c;
    await database.ref('contractor/').once('value', function(snapshot) {
      temp_c = snapshot.val();
    })
    .then(()=>{
      this.contractor = Object.keys(temp_c);
      console.log(this.contractor);
    });

    await database.ref('affected_areas/').once('value', function(snapshot) {
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
          this.queries.push(rt);
        }
      }
      }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceQueryPage');
  }

  async authenticate(user,year,day,q,date,lan,lon,photo,pincode,roadname,severity){
    const database = this.firedata.database; 
    let rating;
    var d = new Date().toDateString();
    await database.ref('user/').child(user).child('profile').child('rating').once('value',function(snap){
      rating = snap.val();
    }).then(async function(){
      if(q==1){
        // Increase rating of user

        //Assign task to contractor
        await database.ref('maintenance').child(this.selectedContractor).child(year).child(day).set({
          "assignDate":d,
          "date":date,
          "lan":lan,
          "lon":lon,
          "photo":photo,
          "pincode":pincode,
          "roadname":roadname,
          "severity": severity
        });
        await database.ref('user/').child(user).child('profile').child('rating').set(rating+1);
      } else {
        //Decrease Rating of User
        await database.ref('user/').child(user).child('profile').child('rating').set(rating-1);
      }
      await database.ref('affected_areas/').child(year).child(day).set(null);
      var i = 0;
      for(let xyz of this.queries){
        if(xyz[year]==year && xyz[day]==day)
        {
          this.queries.splice(i, 1);
        }
        i+=1;
      }
    });
  }

}
