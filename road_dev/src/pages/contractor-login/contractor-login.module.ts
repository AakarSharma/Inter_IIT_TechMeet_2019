import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorLoginPage } from './contractor-login';

@NgModule({
  declarations: [
    ContractorLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ContractorLoginPage),
  ],
})
export class ContractorLoginPageModule {}
