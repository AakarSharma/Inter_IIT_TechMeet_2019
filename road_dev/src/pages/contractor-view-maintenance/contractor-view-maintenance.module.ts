import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractorViewMaintenancePage } from './contractor-view-maintenance';

@NgModule({
  declarations: [
    ContractorViewMaintenancePage,
  ],
  imports: [
    IonicPageModule.forChild(ContractorViewMaintenancePage),
  ],
})
export class ContractorViewMaintenancePageModule {}
