import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtPendingPage } from './govt-pending';

@NgModule({
  declarations: [
    GovtPendingPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtPendingPage),
  ],
})
export class GovtPendingPageModule {}
