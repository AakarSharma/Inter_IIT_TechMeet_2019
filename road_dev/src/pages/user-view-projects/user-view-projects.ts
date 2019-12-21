import { Component ,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the UserViewProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-view-projects',
  templateUrl: 'user-view-projects.html',
})
export class UserViewProjectsPage {

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
              public loadingCtrl: LoadingController
              ) {
                
                // this.loading = this.loadingCtrl.create({
                //   content: 'Fetching Data......',
                //   spinner:'bubbles'
                //   });
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
    await database.ref('tender/').once('value', function(snapshot) {
        temp_tenders = snapshot.val();
    })
    .then(()=>{
      if(temp_tenders!=undefined && temp_tenders!=null){
        temp_tenders.forEach(element => {
          if(element["status"]==0){
            this.futureP.push(element);
          } else if(element["status"]==1){
            this.presentP.push(element);
          } else {
            this.pastP.push(element);
          }
        });
      }
    }).then(()=>{
      if(this.loading)
        this.loading.dismiss();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserViewProjectsPage');
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

