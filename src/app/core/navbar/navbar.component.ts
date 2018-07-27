
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
        route: 'assigned/viewassigned'

      }]
  },
  {
    displayName: 'Search Online Checklists',
    children: [
      {
        displayName: 'Search Online Checklists',
        route: 'searchonlinechecklist'

      }]
  },
  {
    displayName: 'Manage Checklists',
    children: [
      {
        displayName: 'Add/Delete Checklist Managers',
        route: 'managed/checklistmanager'

      }, {
        displayName: 'Schedule Checklist',
        route: 'managed/schedulechecklist'

      }
    ]
  },
  {
    displayName: 'Checklists',
    children: [
      {
        displayName: 'Add Checklist',
        route: 'checklists/addchecklist'

      }, {
        displayName: 'Search Checklists',
        route: 'checklists/searchchecklist'

      }, {
        displayName: 'Search Controls',
        route: 'checklists/searchcontrol'

      }, {
        displayName: 'Reports',
        route: 'checklists/reports'

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
