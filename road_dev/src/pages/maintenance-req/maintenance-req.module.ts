import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenanceReqPage } from './maintenance-req';

@NgModule({
  declarations: [
    MaintenanceReqPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenanceReqPage),
  ],
})
export class MaintenanceReqPageModule {}
