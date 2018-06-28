import { Component, OnInit } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {ListboxModule} from 'primeng/listbox';

@Component({
  selector: 'app-manage-checklist-managers',
  templateUrl: './manage-checklist-managers.component.html',
  styleUrls: ['./manage-checklist-managers.component.css']
})
export class ManageChecklistManagersComponent implements OnInit {

  managers: SelectItem[];

  // selectedCar: string;
  selectedManager: 'BMW';

  addChecklistManagers: any;
  selectedAddChecklistManagers;
  itemsPath: MenuItem[];
  home: MenuItem;

  constructor() {

    this.home = {icon: 'fa fa-home'};

    this.itemsPath = [
      { label: 'Checklist', routerLink: ['/mychecklist'] },
      { label: 'Manage Checklist Managers' }];

      this.managers = [
        {label: 'Daily Scan of Instances', value: 'Daily Scan of Instances'},
        {label: 'Term and transfer report', value: 'Term and transfer report'},
        {label: 'Issuer Bankruptcy Procedures', value: 'Issuer Bankruptcy Procedures'},
        {label: 'New Security Setup', value: 'New Security Setup'},
        {label: 'Scheduling and Ordering Breakfast for Roadshows', value: 'Scheduling and Ordering Breakfast for Roadshows'},
        {label: 'Top Ten Holdings', value: 'Top Ten Holdings'},
        {label: 'Send FI Analytic and Support Manager the Default list', value: 'Send FI Analytic and Support Manager the Default list'},
        {label: 'Board Reports', value: 'Board Reports'},
        {label: 'Index Reporting for HY', value: 'Index Reporting for HY'},
        {label: 'Stop Accruals', value: 'Stop Accruals'}
    ];


   }

  ngOnInit() {
  }
  add() {
console.log('add');
  }

  delete() {
    console.log('delete');
  }
}
