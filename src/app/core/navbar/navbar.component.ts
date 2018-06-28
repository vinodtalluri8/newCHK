
import { Component, Input, OnInit } from '@angular/core';
import { Navitems } from 'diva-shared-apps/components/interfaces/navitems';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navItems: Navitems[] = [{
    displayName: 'My Assigned Checklists',
    children: [
      {
        displayName: 'View My Assigned Checklists',
        route: 'assigned'

      }]
  },
  {
    displayName: 'Search Online Checklists',
    children: [
      {
        displayName: 'Search Online Checklist',
        route: 'searchonlinechecklist'

      }]
  },
  {
    displayName: 'Manage Checklists',
    children: [
      {
        displayName: 'View Manage Checklist',
        route: 'systemvalues'

      }]
  },
  {
    displayName: 'Checklists',
    children: [
      {
        displayName: 'Add Checklist',
        route: 'addchecklist'

      }, {
        displayName: 'Search Checklist',
        route: 'checklist/searchchecklist'

      }, {
        displayName: 'Search Control',
        route: 'control/searchcontrol'

      }, {
        displayName: 'Reports',
        route: 'checklist/reports'

      }]
  }/*,
  {
    displayName: ' Checklist Admin',
    children: [
      {
        displayName: 'Add/Delete Checklist Managers',
        route: 'checklist/managechecklistmanagers'

      }]
  }*/
  ];
  ngOnInit() {
  }

}
