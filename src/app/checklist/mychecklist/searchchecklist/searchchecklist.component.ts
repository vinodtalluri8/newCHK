import { SearchChecklistService } from './../services/search-checklist.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { MessageService } from '../../services/message.service';
import { routerConstants } from '../../../core/constants/routerConstants';


@Component({
  selector: 'app-searchchecklist',
  templateUrl: './searchchecklist.component.html',
  styleUrls: ['./searchchecklist.component.css']
})
export class SearchchecklistComponent implements OnInit {
  dataJson: any;
  searchChecklistResults;
  defaultgroup;
  itemsPath: MenuItem[];
  nameContains: string;
  selectedGroup: string;
  group: SelectItem[];
  departments: SelectItem[];
  selectedDepartments: string;
  frequency: SelectItem[];
  selectedFrequency: string;
  online: SelectItem[];
  selectedOnline: string;
  status: SelectItem[];
  selectedStatus: string;
  name: string;
  home: MenuItem;
  msgs: Message[] = [];
  constructor(private router: Router, private searchChecklistService: SearchChecklistService,
    private checklistCommonService: ChecklistCommonService, private messageService: MessageService) {
    this.home = { icon: 'fa fa-home' };
    /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklists', routerLink: [routerConstants.defaultRoute]},
      { label: 'Search Checklist' }];

    this.selectedOnline = 'A';
    this.selectedFrequency = 'A';
    this.selectedDepartments = 'A';
    this.selectedStatus = 'Active';
  }

  /** This method will call the onit data load
   **/
  ngOnInit() {
    this.preloadData();
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }

  /** This method will load the data on page load
   **/
  preloadData() {
    /** to get default group */
    this.checklistCommonService.getDefaultGroup().subscribe(
      (data) => {
        this.defaultgroup = data[0]['departmentName'];
        this.onChangeGroup(this.defaultgroup);
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });

    /** to get  group dropdown */
    this.checklistCommonService.getGroup().subscribe(
      (data) => {
        this.group = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  frequency dropdown */
    this.checklistCommonService.getFrequency('display').subscribe(
      (data) => {
        this.frequency = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  status dropdown */
    this.checklistCommonService.getStatus('display').subscribe(
      (data) => {
        this.status = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  online dropdown */
    this.checklistCommonService.getOnline('display').subscribe(
      (data) => {
        this.online = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
  }


  /** This method will assign the changed group value
  * @param event
  * **/
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.checklistCommonService.getDepartment(event, 'display').subscribe(data => {
      this.departments = data;
    });
  }
  /** This method will reset all values to default **/
  resetAll() {
    this.nameContains = '';
    this.selectedOnline = 'A';
    this.selectedGroup = this.defaultgroup;
    this.selectedFrequency = 'A';
    this.selectedDepartments = 'A';
    this.selectedStatus = 'Active';
  }

  /** This method will send the inputs
   * for displaying the search results for checklist **/
  searchChecklist() {
    this.dataJson = {
      'checklistName': this.nameContains,
      'checklistGroup': this.selectedGroup,
      'checklistDepartment': this.selectedDepartments,
      'checklistFrequency': this.selectedFrequency,
      'checklistOnline': this.selectedOnline,
      'taskStatus': this.selectedStatus
    };
    /** to call the searchChecklistService and the sets the data to setResultsSearch */
    this.searchChecklistService.getSearchChecklistData(this.dataJson).subscribe(data => {
      this.router.navigate([routerConstants.searchChecklistResults]);
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
  }
}
