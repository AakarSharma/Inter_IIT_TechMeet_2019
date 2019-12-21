import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTenderPage } from './create-tender';

@NgModule({
  declarations: [
    CreateTenderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTenderPage),
  ],
})
export class CreateTenderPageModule {}
