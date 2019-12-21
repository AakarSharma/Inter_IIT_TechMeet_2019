import { SubmitReportPage } from './../submit-report/submit-report';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-contractor-home',
  templateUrl: 'contractor-home.html',
})
export class ContractorHomePage {
  present: boolean = true;
  contracts: any;
  pastP: any=[];
  presentP: any=[];
  projects:any = [];
  selected: string = "present";
  tense: string = "present";
  tab1Page : any = SubmitReportPage;
  loading = this.loadingCtrl.create({
    content: 'Fetching Data......',
    spinner:'bubbles'
  	});
  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private fireauth: AngularFireAuth,
              private firedata: AngularFireDatabase
             ) {
  }

  async ionViewWillEnter(){
    this.contracts=["Hello","World"];
    this.selected = "present";
    this.projects = [];
    this.tense = "present";
    this.pastP = [];
    this.presentP = [];
    this.loading = this.loadingCtrl.create({
        content: 'Fetching Data......',
        spinner:'bubbles'
        });
    this.projects = this.presentP;
    this.loading.present();
    const database = this.firedata.database;
    var temp_tenders;
    const auth = this.fireauth.auth;  
		var temp = auth.currentUser;
		var temp_email = temp.email;
		let contractor = temp_email.split("@")[0];
    await database.ref('tender/').once('value', function(snapshot) {
        temp_tenders = snapshot.val();
    })
    .then(()=>{
      console.log(temp_tenders)
      Object.keys(temp_tenders).forEach(key => {
        console.log(key)
        var tender_id = key;
        if(temp_tenders[key]["contractor"] == contractor && temp_tenders[key]["status"]==2){
          temp_tenders[tender_id]["id"]=tender_id;
          this.pastP.push(temp_tenders[key]);
        } else if(temp_tenders[key]["contractor"] == contractor && temp_tenders[key]["status"]==1){
          temp_tenders[tender_id]["id"]=tender_id;
          this.presentP.push(temp_tenders[key]);
        }
      });
    }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorHomePage');
  }

  showPastContracts(){
    this.projects = this.pastP;
  }

  showPresentContracts(){
    this.projects = this.presentP;
  }

  navToSubmitReport(id){
    this.navCtrl.push(SubmitReportPage,{"id":id});
  }
}