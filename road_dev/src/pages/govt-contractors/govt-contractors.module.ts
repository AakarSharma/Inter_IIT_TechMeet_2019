import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtContractorsPage } from './govt-contractors';

@NgModule({
  declarations: [
    GovtContractorsPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtContractorsPage),
  ],
})
export class GovtContractorsPageModule {}
