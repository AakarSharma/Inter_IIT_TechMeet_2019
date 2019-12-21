import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenanceQueryPage } from './maintenance-query';

@NgModule({
  declarations: [
    MaintenanceQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenanceQueryPage),
  ],
})
export class MaintenanceQueryPageModule {}
