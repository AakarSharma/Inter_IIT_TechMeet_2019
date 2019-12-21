import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtTabsPage } from './govt-tabs';

@NgModule({
  declarations: [
    GovtTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtTabsPage),
  ],
})
export class GovtTabsPageModule {}
