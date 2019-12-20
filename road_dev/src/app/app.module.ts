import { UserViewProjectsPage } from './../pages/user-view-projects/user-view-projects';
import { ContractorTabsPage } from './../pages/contractor-tabs/contractor-tabs';
import { SubmitReportPage } from './../pages/submit-report/submit-report';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginPage } from '../pages/login/login';
import { UserTabsPage } from '../pages/user-tabs/user-tabs';
import { UserHomePage } from '../pages/user-home/user-home';
import { ContractorHomePage } from '../pages/contractor-home/contractor-home';
import { PotholeDetectionProvider } from '../providers/pothole-detection/pothole-detection';
import { HttpClientModule } from '@angular/common/http';

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
    AboutPage,
    ContactPage,
    ContractorHomePage,
    SubmitReportPage,
    ContractorTabsPage,
    UserViewProjectsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),  // app initilise with the firebase key
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserTabsPage,
    UserHomePage,
    ContractorHomePage,
    AboutPage,
    ContactPage,
    ContractorHomePage,
    SubmitReportPage,
    ContractorTabsPage,
    UserViewProjectsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: PotholeDetectionProvider, useClass: HttpClientModule },
    // PotholeDetectionProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    
  ]
})
export class AppModule { }
