import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtTendersPage } from './govt-tenders';

@NgModule({
  declarations: [
    GovtTendersPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtTendersPage),
  ],
})
export class GovtTendersPageModule {}
