import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtContractsPage } from './govt-contracts';

@NgModule({
  declarations: [
    GovtContractsPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtContractsPage),
  ],
})
export class GovtContractsPageModule {}
