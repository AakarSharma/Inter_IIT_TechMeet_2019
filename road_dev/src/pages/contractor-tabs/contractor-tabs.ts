import { ContractorHomePage } from './../contractor-home/contractor-home';
import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'contractor-tabs.html'
})
export class ContractorTabsPage {

  tab1Root = HomePage;
  tab2Root = ContractorHomePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
