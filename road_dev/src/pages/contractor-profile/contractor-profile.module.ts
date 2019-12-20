import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorProfilePage } from './contractor-profile';

@NgModule({
  declarations: [
    ContractorProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ContractorProfilePage),
  ],
})
export class ContractorProfilePageModule {}
