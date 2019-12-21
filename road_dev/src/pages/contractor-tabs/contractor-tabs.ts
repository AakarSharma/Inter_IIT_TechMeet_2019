import { ContractorHomePage } from './../contractor-home/contractor-home';
import { Component } from '@angular/core';
import { ContractorProfilePage } from './../contractor-profile/contractor-profile';
import { ContractorProgressPage } from './../contractor-progress/contractor-progress';

import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'contractor-tabs.html'
})
export class ContractorTabsPage {

  tab1Root = ContractorProgressPage;
  tab2Root = ContractorHomePage;
  tab3Root = ContractorProfilePage;

  constructor() {

  }
}
