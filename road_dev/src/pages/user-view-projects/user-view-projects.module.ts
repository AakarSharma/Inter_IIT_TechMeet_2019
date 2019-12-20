import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewProjectsPage } from './user-view-projects';

@NgModule({
  declarations: [
    UserViewProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewProjectsPage),
  ],
})
export class UserViewProjectsPageModule {}
