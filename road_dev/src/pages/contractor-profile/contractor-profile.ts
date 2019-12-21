import { Component, ViewChild } from '@angular/core';
import { NavController, App,AlertController, ToastController , IonicPage, NavParams} from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ContractorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contractor-profile',
  templateUrl: 'contractor-profile.html',
})
export class ContractorProfilePage {

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractorProfilePage');
  }

  @ViewChild('save') saveIt;
	hide = true;
	isDisabled = true;
	public base64Image: string;
	private imageSrc: string;
	
	user = {
		name: '',
		phone: '',
		email: '',
		dob: '',
		address:'',
	};
	
	constructor( private alertCtrl: AlertController,private app:App, private fireauth: AngularFireAuth, private firedata: AngularFireDatabase, public navCtrl: NavController, public toastCtrl: ToastController) {
		const database = this.firedata.database;
		const auth = this.fireauth.auth;
		var temp = auth.currentUser;
		var temp_email = temp.email;
		// this.code = temp_email.substring(0,temp_email.indexOf('@'));
		// var lol;
		// if(this.code.length == 10){
		// 	database.ref('company/').child(this.code.substring(0,2)).child('employees').child(this.code.substring(5,10)).child('details').once('value').then(function(snapshot) {
		// 		lol = snapshot.val();
		// 	}).then(() => {
		// 		this.user = lol;
		// 	});
		// 	database.ref('company/').child(this.code.substring(0,2)).child('details').once('value').then(function(snapshot) {
		// 		lol = snapshot.val();
		// 	}).then(() => {
		// 		this.user['company'] = lol.name;
		// 	});
		// 	this.usersS.code = this.code.substring(0,5);
		// 	database.ref('company/').child(this.code.substring(0,2)).child('supervisors').child(this.code.substring(2,5)).child('details').child('name').once('value').then(function(snapshot) {
		// 		lol = snapshot.val();
		// 	}).then(() => {
		// 		this.usersS.name = lol;
		// 	});
		// }
		// else{
		// 	database.ref('company/').child(this.code.substring(0,2)).child('supervisors').child(this.code.substring(2,5)).child('details').once('value').then(function(snapshot) {
		// 		lol = snapshot.val();
		// 	}).then(() => {
		// 		this.user = lol;
		// 		console.log(this.user)
		// 		for(var i in this.user["aboveEmployees"]){
		// 			var code = this.code + this.user["aboveEmployees"][i];
		// 			this.populate_usersE(code)
		// 		}
		// 	});
		// 	database.ref('company/').child(this.code.substring(0,2)).child('details').once('value').then(function(snapshot) {
		// 		lol = snapshot.val();
		// 	}).then(() => {
		// 		this.user['company'] = lol.name;
		// 	});
	}		


	

	
	openEdit(){
		this.hide = false;
		this.isDisabled = false;
	}
	
	
	closeEdit(){
		var email = <HTMLInputElement>document.getElementById('email');
		var mobile = <HTMLInputElement>document.getElementById('mobile');
		var address = <HTMLInputElement>document.getElementById('address');
		
		this.user.email = email.value;
		this.user.phone = mobile.value;
		this.user.address = address.value;
		const database = this.firedata.database;
		// if(this.code.length == 10){
		// 	database.ref('company/').child(this.code.substring(0,2)).child('employees').child(this.code.substring(5,10)).child('details').set(this.user);
		// }
		// else{
		// 	database.ref('company/').child(this.code.substring(0,2)).child('supervisors').child(this.code.substring(2,5)).child('details').set(this.user);
		// }
		this.hide = true;
		this.isDisabled = true;
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
