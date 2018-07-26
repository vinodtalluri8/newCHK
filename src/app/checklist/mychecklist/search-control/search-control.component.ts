import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { SearchControlService } from '../services/search-control.service';
import { routerConstants } from '../../../core/constants/routerConstants';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-controls',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.css']
})
export class ControlsComponent implements OnInit {
  dataJson: any;
  selectedFrequency: string;
  selectedPrimary: string;
  selectedRisk: string;
  selectedReviewLength: string;
  review: number;
  selectedGroup: string;
  selectedAnyAssigned: string;
  selectedBackup: string;
  selectedEvaluation: string;
  selectedDepartment: string;
  selectedReviewer: string;
  selectedStatus: string;
  selectedControlLength: string;
  selectedReview: any;
  selectedControl: any;
  control: number;
  titleContains: string;
  frequency: SelectItem[];
  primary: SelectItem[];
  risk: SelectItem[];
  reviewLength: SelectItem[];
  group: SelectItem[];
  anyAssigned: SelectItem[];
  backup: SelectItem[];
  evaluation: SelectItem[];
  department: SelectItem[];
  reviewer: SelectItem[];
  status: SelectItem[];
  controlLength: SelectItem[];
  savedRecord;
  defaultgroup: string;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

  constructor(private router: Router,
    private checklistCommonService: ChecklistCommonService,
    private searchControlService: SearchControlService, private messageService: MessageService) {
    this.home = { icon: 'fa fa-home' };
    /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Search Controls' }];

    /** Filling the dropdown of review length and control length */
    this.reviewLength = [
      { label: '=', value: '=' },
      { label: '>', value: '>' },
      { label: '>=', value: '>=' },
      { label: '<', value: '<' },
      { label: '<=', value: '<=' }
    ];
    /** to assign data to the variables on screen load */
    this.controlLength = this.reviewLength;
    this.selectedStatus = 'Active';
    this.selectedRisk = 'A';
    this.selectedEvaluation = 'A';
    this.selectedControlLength = '=';
    this.selectedReviewLength = '=';
    this.selectedDepartment = 'A';
    this.selectedBackup = 'A';
    this.selectedAnyAssigned = 'A';
    this.selectedPrimary = 'A';
    this.selectedReviewer = 'A';
    this.selectedFrequency = 'A';

  }
  /** to call methods on init */
  ngOnInit() {
    this.preloadData();
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }
  /** to get data for dropdowns from  common service*/
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

    /** to get  Frequency dropdown */
    this.checklistCommonService.getFrequency('display').subscribe(
      (data) => {
        this.frequency = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  primary dropdown */
    this.checklistCommonService.getPrimary('display').subscribe(
      (data) => {
        this.primary = data;
        this.reviewer = data;
        this.anyAssigned = data;
        this.backup = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  risk dropdown */
    this.checklistCommonService.getRisk('display').subscribe(
      (data) => {
        this.risk = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  assignee dropdown */
   /* this.checklistCommonService.getAssignee('display').subscribe(
      (data) => {
        this.anyAssigned = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });*/
    /** to get  backup dropdown */
    /*this.checklistCommonService.getBackup('display').subscribe(
      (data) => {
        this.backup = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });*/
    /** to get  evaluation dropdown */
    this.checklistCommonService.getEvaluation('display').subscribe(
      (data) => {
        this.evaluation = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
    /** to get  department dropdown */
    this.checklistCommonService.getDepartment(this.selectedGroup, 'display').subscribe(
      (data) => {
        this.department = data;
      }, error => {
        console.log(error, 'errortest');
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: error });
      });
    /** to get  reviewer dropdown */
    /*this.checklistCommonService.getReviewer('display').subscribe(
      (data) => {
        this.reviewer = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });*/
    /** to get  status dropdown */
    this.checklistCommonService.getStatus('display').subscribe(
      (data) => {
        this.status = data;
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
      this.department = data;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
  }
  /** This method will reset all values to default **/
  resetAll() {
    this.titleContains = '';
    this.selectedReviewLength = '=';
    this.selectedRisk = 'A';
    this.selectedPrimary = 'A';
    this.review = null;
    this.selectedGroup = this.defaultgroup;
    this.selectedAnyAssigned = 'A';
    this.selectedBackup = 'A';
    this.selectedEvaluation = 'A';
    this.selectedDepartment = 'A';
    this.selectedReviewer = 'A';
    this.selectedFrequency = 'A';
    this.selectedStatus = 'Active';
    this.selectedControlLength = '=';
    this.control = null;
  }

  /** This method will send the inputs
   * for displaying the search results for search control screen **/
  searchControl() {
    this.dataJson = {
      'title': this.titleContains,
      'risk': this.selectedRisk,
      'primary': this.selectedPrimary,
      'checklistFrequency': this.selectedFrequency,
      'reviewLength': this.review,
      'checklistGroup': this.selectedGroup,
      'anyAssigned': this.selectedAnyAssigned,
      'backup': this.selectedBackup,
      'evaluation': this.selectedEvaluation,
      'checklistDepartment': this.selectedDepartment,
      'reviewer': this.selectedReviewer,
      'status': this.selectedStatus,
      'controlLength': this.control,
      'taskOperation': this.selectedControlLength,
      'reviewOperation': this.selectedReviewLength
    };
    this.searchControlService.setSearchCriteria(this.dataJson);
    this.router.navigate([routerConstants.searchControlResults]);

  }


}
