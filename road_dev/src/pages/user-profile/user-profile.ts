import { Component, ViewChild } from '@angular/core';
import { NavController, App, AlertController, ToastController, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
// import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-user-profile',
	templateUrl: 'user-profile.html',
})
export class UserProfilePage {

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserProfilePage');
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
		address: '',
		aadhaar: '',
		rating: 0
	};

	username = ""

	constructor(private alertCtrl: AlertController, private app: App, private fireauth: AngularFireAuth, private firedata: AngularFireDatabase, public navCtrl: NavController, public toastCtrl: ToastController) {
		const database = this.firedata.database;
		const auth = this.fireauth.auth;
		var temp = auth.currentUser;
		var temp_email = temp.email;
		this.username = temp_email.split("@")[0];
		var lol;
		database.ref('user/').child(this.username).child('profile').once('value').then(function (snapshot) {
			lol = snapshot.val();
		}).then(() => {
			this.user['name'] = lol['name'];
			this.user['phone'] = lol['phone'];
			this.user['email'] = lol['email'];
			this.user['address'] = lol['address'];
			this.user['aadhaar'] = lol['aadhaar'];
			this.user['rating'] = lol['rating'];
		});
	}

	openEdit() {
		this.hide = false;
		this.isDisabled = false;
	}


	closeEdit() {
		var email = <HTMLInputElement>document.getElementById('email');
		var mobile = <HTMLInputElement>document.getElementById('mobile');
		var address = <HTMLInputElement>document.getElementById('address');

		this.user.email = email.value;
		this.user.phone = mobile.value;
		this.user.address = address.value;
		const database = this.firedata.database;
		database.ref('user/').child(this.username).child('profiles').update(this.user);

		// if(this.code.length == 10){
		// 	database.ref('company/').child(this.code.substring(0,2)).child('employees').child(this.code.substring(5,10)).child('details').set(this.user);
		// }
		// else{
		// 	database.ref('company/').child(this.code.substring(0,2)).child('supervisors').child(this.code.substring(2,5)).child('details').set(this.user);
		// }
		this.hide = true;
		this.isDisabled = true;
	}

	logout() {
		const auth = this.fireauth.auth;

		if (auth.currentUser != null) {
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
							auth.signOut().then(() => {
								this.app.getRootNav().setRoot(LoginPage);
								// Sign-out successful.
							}, function (error) {
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
