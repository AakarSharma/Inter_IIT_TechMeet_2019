import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtContractorsDetailsPage } from './govt-contractors-details';

@NgModule({
  declarations: [
    GovtContractorsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtContractorsDetailsPage),
  ],
})
export class GovtContractorsDetailsPageModule {}
