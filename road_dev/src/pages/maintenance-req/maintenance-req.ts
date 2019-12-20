import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from 'ionic-angular';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";

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
  severity: number = 1;
  constructor(public storage:AngularFireStorage,
              public alertCtrl: AlertController, 
              private camera: Camera,
              public navCtrl: NavController,
              public navParams: NavParams,
              public geo:Geolocation) {
    
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

  async sendDataToFirebase(){
    this.getLocation().then(()=>{
      // 
      // 
      // 
      // 
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
