import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtTendersDetailsPage } from './govt-tenders-details';

@NgModule({
  declarations: [
    GovtTendersDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtTendersDetailsPage),
  ],
})
export class GovtTendersDetailsPageModule {}
