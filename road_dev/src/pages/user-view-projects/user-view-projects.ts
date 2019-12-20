import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  contents: any = "Present";
  projects: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserViewProjectsPage');
  }

  pastProjects(){
    this.contents = "Past";
  }

  presentProjects(){
    this.contents = "Present";
  }

  upcomingProjects(){
    this.contents = "Upcoming";
  }
}

