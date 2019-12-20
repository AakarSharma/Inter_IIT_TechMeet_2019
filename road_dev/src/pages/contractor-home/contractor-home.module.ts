import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorHomePage } from './contractor-home';

@NgModule({
  declarations: [
    ContractorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ContractorHomePage),
  ],
})
export class ContractorHomePageModule {}
