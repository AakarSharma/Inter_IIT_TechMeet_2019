import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateContractorPage } from './create-contractor';

@NgModule({
  declarations: [
    CreateContractorPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateContractorPage),
  ],
})
export class CreateContractorPageModule {}
