import { Component ,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';
import { ContractorProgressPage } from '../contractor-progress/contractor-progress';
/**
 * Generated class for the GovtViewProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govt-view-projects',
  templateUrl: 'govt-view-projects.html',
})
export class GovtViewProjectsPage {
  loading = this.loadingCtrl.create({
    content: 'Fetching Data......',
    spinner:'bubbles'
  	});
  selected: string = "present";
  contents: any = "Present";
  projects: any = [];
  pastP: any = [];
  presentP: any = [];
  futureP: any = [];
  tenders: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // public http: HttpClient, 
    private fireauth: AngularFireAuth,
    private firedata: AngularFireDatabase ,
    public zone:NgZone,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovtViewProjectsPage');
  }

  async init(){
    this.selected = "present";
    this.contents = "Present";
    this.projects = [];
    this.pastP = [];
    this.presentP = [];
    this.futureP = [];
    this.tenders = [];
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
		let govt = temp_email.split("@")[0];
    await database.ref('tender/').once('value', function(snapshot) {
        temp_tenders = snapshot.val();
    })
    .then(()=>{
      console.log(temp_tenders);
      if(temp_tenders!=undefined && temp_tenders!=null){
      Object.keys(temp_tenders).forEach(key => {
        console.log(key)
        var tender_id = key;
        if(temp_tenders[key]["govt"] == govt && temp_tenders[key]["status"]==2){
          temp_tenders[tender_id]["id"]=tender_id;
          this.pastP.push(temp_tenders[key]);
        } else if(temp_tenders[key]["govt"] == govt && temp_tenders[key]["status"]==1){
          temp_tenders[tender_id]["id"]=tender_id;
          this.presentP.push(temp_tenders[key]);
        } else if(temp_tenders[key]["govt"] == govt && temp_tenders[key]["status"]==0){
          temp_tenders[tender_id]["id"]=tender_id;
          this.futureP.push(temp_tenders[key]);
        }
      });
    }
    }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
  }
  async ionViewWillEnter(){
    await this.init();
    // await dats
  }
  
  pastProjects(){
    this.zone.run(()=>{
      this.projects = this.pastP;
    });
  }

  presentProjects(){
    this.zone.run(()=>{
      this.projects = this.presentP;
    });
  }

  upcomingProjects(){
    this.zone.run(()=>{
      this.projects = this.futureP;
    });
  }

  showProgress(id){
    this.navCtrl.push(ContractorProgressPage,{"id":id});
  }

  async endTask(govt,id){
    const database = this.firedata.database;
    await database.ref('tender/').child(id).child('status').set(2);
    await database.ref('tender/').child(id).child('enddate').set(new Date().toDateString());
    this.init();
  }

}
