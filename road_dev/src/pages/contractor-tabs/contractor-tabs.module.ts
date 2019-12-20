import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorTabsPage } from './contractor-tabs';

@NgModule({
  declarations: [
    ContractorTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContractorTabsPage),
  ],
})
export class ContractorTabsPageModule {}
