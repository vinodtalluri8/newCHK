import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { routerConstants } from '../../../core/constants/routerConstants';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { ChecklistScheduleService } from '../services/checklist-schedule.service';


@Component({
  selector: 'app-search-schedule',
  templateUrl: './search-schedule.component.html',
  styleUrls: ['./search-schedule.component.css']
})
export class SearchScheduleComponent implements OnInit {

  titleContains: string;
  group: SelectItem[];
  department: SelectItem[];
  frequency: SelectItem[];
  selectedGroup: string;
  selectedDepartment: string;
  selectedFrequency: string;
  isRefresh: boolean;
  defaultgroup: string;
  dataJson: any;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  flag: boolean;
  scheduleChecklistResults: any;

  constructor(private router: Router, private checklistCommonService: ChecklistCommonService,
    private messageService: MessageService, private checklistScheduleService: ChecklistScheduleService) {
    this.home = { icon: 'fa fa-home' };
    /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Schedule Checklist' }];
  }

  /** method to call data on page on load **/
  ngOnInit() {
    this.flag = true;
    this.preloadData();
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }
  /** This method will load the data on page load**/
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
    this.checklistScheduleService.getFrequency().subscribe(
      (data) => {
        this.frequency = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });

    /** to get  department dropdown */
    this.checklistCommonService.getDepartment(this.selectedGroup, 'add').subscribe(
      (data) => {
        this.department = data;
      }, error => {
        console.log(error, 'errortest');
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: error });
      });
  }
  /** This method will assign the changed group value
  * @param event
    * **/
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.checklistCommonService.getDepartment(event, 'add').subscribe(data => {
      this.department = data;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
  }

  /** This method will reset all values in accordion to default **/
  resetAll() {
    this.titleContains = '';
    this.selectedGroup = this.defaultgroup;
    this.selectedFrequency = '';
    this.selectedDepartment = '';
  }

  resetToDefault() {
    this.resetAll();
    this.scheduleChecklist();
  }

  /** This method will save all the data in search control screen  **/
  scheduleChecklist() {
    console.log('schedule checklist');
    this.flag = false;
    this.dataJson = {
      'checklistName': this.titleContains,
      'checklistFrequency': this.selectedFrequency,
      'checklistGroup': this.selectedGroup,
      'checklistDepartment': this.selectedDepartment
    };
    this.checklistScheduleService.setResultScheduleCriteria(this.dataJson);
    this.checklistScheduleService.scheduleChecklist().subscribe(data => {
      this.scheduleChecklistResults = data;
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });

  }

}
