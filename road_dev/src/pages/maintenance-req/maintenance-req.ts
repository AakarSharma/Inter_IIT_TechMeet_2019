import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-maintenance-req',
  templateUrl: 'maintenance-req.html',
})
export class MaintenanceReqPage {

  lat:any;
  filePath: string; 
  captureDataUrl: string;
  lng:any;
  loc:boolean=false;
  task: AngularFireUploadTask;
  progress: any;
  image:string;
  road:string = "";
  area: string = "";
  date: string = "";
  severity: number = 1;
  postalCode: string = "";
  constructor(public storage:AngularFireStorage,
              public alertCtrl: AlertController, 
              private camera: Camera,
              public navCtrl: NavController,
              private nativeGeocoder: NativeGeocoder,
              public navParams: NavParams,
              public geo:Geolocation,
              private fireauth: AngularFireAuth,
              private firedata: AngularFireDatabase ,
              public loadingCtrl: LoadingController) {
    
  }

  ionViewWillEnter(){
   this.getLocation();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceReqPage');
  }

  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
   return  await this.camera.getPicture(options);




  }
 async createUploadTask(file: string){

    this.filePath =`attendance-pic${ new Date().getTime() }.jpg`;

    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(this.filePath).putString(this.image, 'data_url');

    this.progress = this.task.percentageChanges();
    this.showSuccesfulUploadAlert();
  }

  async uploadHandlerCamera() {
    const base64 = await this.captureImage();
    await  this.createUploadTask(base64);
   }

  async uploadHandlerGallery() {
    await this.getPicture(0);
    await  this.upload();
   }

   async getAddress(lt,ln){
    let place="";
    // let postalCodel="";
    this.postalCode = "247667";
    if(!document.URL.startsWith('http'))
    {
      
      await this.nativeGeocoder.reverseGeocode(lt, ln).then((result1: NativeGeocoderReverseResult[]) => {
      place="";
      console.log(result1[0]);
      if(result1[0].postalCode!=undefined)
      {
        place+=result1[0].postalCode;
        this.postalCode = result1[0].postalCode;
      }
      })
      .catch((error: any) => console.log(error));
    }
    return place;
  }

  async sendDataToFirebase(){
    const database = this.firedata.database;
    const auth =  this.fireauth.auth;
    var temp1 = auth.currentUser;
    var temp_email = temp1.email;
    var user = temp_email.split("@")[0];
        
    var temp;
    await database.ref("affected_areas/").child("247667").once("value",function(snapshot){
      temp = snapshot.val();
    }).then(()=>{
      var tt = 1;
      if(temp!=undefined && temp!=null)
      {
        temp= Object.keys(temp);
        tt = temp[temp.length-1]+1;
      }
        
        var dd = (new Date()).toDateString();
        
        
        var uploadTemp ={
          "date":dd,
          "has_photo":false,
          "lan":this.lat,
          "lon":this.lng,
          "photo":"", 
          "pincode":"247667",
          "roadname":this.road,
          "severity":this.severity,
          "user": user,
          "confidence":0
        };
        database.ref("affected_areas/").child("247667").child(tt.toString()).set(uploadTemp);

      });
    
    
  }

  async uploadHandler() {
    const confirm = this.alertCtrl.create({
      title: 'camera or gallery',
      message: 'select the appropriate action',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.uploadHandlerCamera();
            this.sendDataToFirebase();
           }
        }
      ]
    });
    confirm.present();
    
  }

  async getLocation(){
    await this.geo.getCurrentPosition().then((location) => {
      this.lat=location.coords.latitude;
      this.lng=location.coords.longitude;
    }).then(()=>{
      this.loc = true;
      console.log(this.lat);
      console.log(this.lng);
    }).then(()=>{
      this.getAddress(this.lat,this.lng);
    });
  }

  async getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    await this.camera.getPicture(cameraOptions)
      .then((captureDataUrl) => {
        this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
       }, (err) => {
        console.log(err);
      });
  }

  async upload() {
    this.filePath = `attendance-pic${ new Date().getTime() }.jpg`;

     this.task = this.storage.ref(this.filePath).putString(this.captureDataUrl, 'data_url');

    this.progress = this.task.percentageChanges();
    this.showSuccesfulUploadAlert();
  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }
}
