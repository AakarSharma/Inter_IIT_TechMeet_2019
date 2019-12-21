import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GovtViewProjectsPage } from './govt-view-projects';

@NgModule({
  declarations: [
    GovtViewProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(GovtViewProjectsPage),
  ],
})
export class GovtViewProjectsPageModule {}
