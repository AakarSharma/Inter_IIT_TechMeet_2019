import { ContractorViewMaintenancePage } from './../contractor-view-maintenance/contractor-view-maintenance';
import { ContractorHomePage } from './../contractor-home/contractor-home';
import { Component } from '@angular/core';
import { ContractorProfilePage } from './../contractor-profile/contractor-profile';
import { ContractorProgressPage } from './../contractor-progress/contractor-progress';

@Component({
  templateUrl: 'contractor-tabs.html'
})
export class ContractorTabsPage {

  // tab1Root = ContractorProgressPage;
  tab1Root = ContractorHomePage;
  tab2Root = ContractorProfilePage;
  tab3Root = ContractorViewMaintenancePage;

  constructor() {

  }
}
