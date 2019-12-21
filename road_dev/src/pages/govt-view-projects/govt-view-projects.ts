import { Component ,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';
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

  async ionViewWillEnter(){
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
      temp_tenders.forEach(element => {
        if( element["govt"]== govt && element["status"]==0){
          this.futureP.push(element);
        } else if(element["govt"]== govt && element["status"]==1){
          this.presentP.push(element);
        } else {
          this.pastP.push(element);
        }
      });
    }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
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

  showProgress(){

  }

}
