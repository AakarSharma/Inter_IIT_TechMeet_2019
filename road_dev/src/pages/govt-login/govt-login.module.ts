import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtLoginPage } from './govt-login';

@NgModule({
  declarations: [
    GovtLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtLoginPage),
  ],
})
export class GovtLoginPageModule {}
