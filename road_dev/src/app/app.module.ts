import { AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera/ngx';
import { MaintenanceReqPage } from './../pages/maintenance-req/maintenance-req';
import { MaintenanceQueryPage } from './../pages/maintenance-query/maintenance-query';
import { UserViewProjectsPage } from './../pages/user-view-projects/user-view-projects';
import { ContractorTabsPage } from './../pages/contractor-tabs/contractor-tabs';
import { SubmitReportPage } from './../pages/submit-report/submit-report';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginPage } from '../pages/login/login';
import { UserTabsPage } from '../pages/user-tabs/user-tabs';
import { UserHomePage } from '../pages/user-home/user-home';
import { ContractorHomePage } from '../pages/contractor-home/contractor-home';
import { PotholeDetectionProvider } from '../providers/pothole-detection/pothole-detection';
import { HttpClientModule } from '@angular/common/http';
import { GovtLoginPage } from '../pages/govt-login/govt-login';
import { ContractorLoginPage } from '../pages/contractor-login/contractor-login';
import { UserLoginPage } from '../pages/user-login/user-login';
import { GovtTabsPage } from '../pages/govt-tabs/govt-tabs';
import { GovtContractorsPage } from '../pages/govt-contractors/govt-contractors';
import { GovtTendersPage } from '../pages/govt-tenders/govt-tenders';
import { ContractorProfilePage } from '../pages/contractor-profile/contractor-profile';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { GovtContractorsDetailsPage } from '../pages/govt-contractors-details/govt-contractors-details';
import { GovtTendersDetailsPage } from '../pages/govt-tenders-details/govt-tenders-details';
import { ContractorProgressPage } from '../pages/contractor-progress/contractor-progress';


export const firebaseConfig = {
  apiKey: "AIzaSyACWvceKT1lF9iD6i2ZDFHax34cHkco2ic",
  authDomain: "hackathon-25199.firebaseapp.com",
  databaseURL: "https://hackathon-25199.firebaseio.com",
  projectId: "hackathon-25199",
  storageBucket: "hackathon-25199.appspot.com",
  messagingSenderId: "428018245124",
  appId: "1:428018245124:web:e2494a7484d1a2a3cb1f51"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserTabsPage,
    UserHomePage,
    ContractorHomePage,
    ContractorHomePage,
    SubmitReportPage,
    ContractorTabsPage,
    UserViewProjectsPage,
    MaintenanceReqPage,
    MaintenanceQueryPage,
    GovtLoginPage,
    ContractorLoginPage,
    UserLoginPage,
    GovtTabsPage,
    GovtContractorsPage,
    GovtTendersPage,
    ContractorProfilePage,
    UserProfilePage,
    GovtContractorsDetailsPage,
    GovtTendersDetailsPage,
    ContractorProgressPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),  // app initilise with the firebase key
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserTabsPage,
    UserHomePage,
    ContractorHomePage,
    ContractorHomePage,
    SubmitReportPage,
    ContractorTabsPage,
    UserViewProjectsPage,
    MaintenanceQueryPage,
    MaintenanceReqPage,
    GovtLoginPage,
    ContractorLoginPage,
    UserLoginPage,
    GovtTabsPage,
    GovtContractorsPage,
    GovtTendersPage,
    ContractorProfilePage,
    UserProfilePage,
    GovtContractorsDetailsPage,
    GovtTendersDetailsPage,
    ContractorProgressPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: PotholeDetectionProvider, useClass: HttpClientModule },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    Camera,
    AlertController,
    NativeGeocoder
  ]
})
export class AppModule { }
