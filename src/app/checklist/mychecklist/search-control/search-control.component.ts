import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem , Message } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { SearchControlService } from '../services/search-control.service';

@Component({
  selector: 'app-controls',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.css']
})
export class ControlsComponent implements OnInit {

  // dataJson: { 'title': any; 'risk': any; 'primary': any; 'frequency': any; 'reviewLength': SelectItem[];
  // 'review': any; 'group': any; 'anyAssigned': any; 'backup': any; 'evaluation': any;
  //  'department': any; 'reviewer': any; 'status': any; 'controlLength': SelectItem[]; 'control': any; };

  dataJson: any;
  selectedFrequency: any;
  selectedPrimary: any;
  selectedRisk: any;
  selectedReviewLength: any;
  review: any;
  selectedGroup: any;
  selectedAnyAssigned: any;
  selectedBackup: any;
  selectedEvaluation: any;
  selectedDepartment: any;
  selectedReviewer: any;
  selectedStatus: any;
  selectedControlLength: any;
  selectedReview: any;
  selectedControl: any;
  control: any;
  titleContains: any;
  frequency;
  primary;
  risk;
  reviewLength;
  group;
  anyAssigned;
  backup;
  evaluation;
  department;
  reviewer;
  status;
  controlLength;
  savedRecord;
  defaultgroup;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

  constructor(private router: Router,
    private checklistCommonService: ChecklistCommonService ,
    private searchControlService: SearchControlService) {
      this.home = {icon: 'fa fa-home'};

      this.itemsPath = [
      { label: 'Checklists', routerLink: ['/mychecklist'] },
    { label: 'Search Controls' }];

// Filling the dropdown of review length and control length
    this.reviewLength = [
      {label: '=', value: '=' },
      {label: '>', value: '>' },
      {label: '>=', value: '>=' },
      {label: '<', value: '<' },
      {label: '<=', value: '<=' }
  ];

    this.controlLength = this.reviewLength;
    this.selectedStatus = 'Active';
    this.selectedRisk = 'A';
    this.selectedEvaluation = 'A' ;
    this.selectedControlLength = '=';
    this.selectedReviewLength = '=';
    this.selectedDepartment = 'A';
    this.selectedBackup = 'A';
    this.selectedAnyAssigned = 'A';
    this.selectedPrimary = 'A';
    this.selectedReviewer = 'A';
    this.selectedFrequency = 'A';

    }

  ngOnInit() {
  this.preloadData();
  }

  preloadData() {
    this.checklistCommonService.getDefaultGroup().subscribe(
      (data) => {
        this.defaultgroup = data[0]['departmentName'];
        this.onChangeGroup(this.defaultgroup);
      }
    );

    this.checklistCommonService.getGroup().subscribe(
      (data) => {
        this.group = data;
      }
    );
    this.checklistCommonService.getFrequency().subscribe(
      (data) => {
        this.frequency = data;
      }
    );
    this.checklistCommonService.getPrimary().subscribe(
      (data) => {
        this.primary = data;
      }
    );
    this.checklistCommonService.getRisk().subscribe(
      (data) => {
        this.risk = data;
     }
    );
    this.checklistCommonService.getAssignee().subscribe(
      (data) => {
        this.anyAssigned = data;
      }
    );
    this.checklistCommonService.getBackup().subscribe(
      (data) => {
        this.backup = data;
      }
    );
    this.checklistCommonService.getEvaluation().subscribe(
      (data) => {
        this.evaluation = data;
      }
    );
    this.checklistCommonService.getDepartment(this.selectedGroup).subscribe(
      (data) => {
        this.department = data;
      }
    );
    this.checklistCommonService.getReviewer().subscribe(
      (data) => {
        this.reviewer = data;
      }
    );
    this.checklistCommonService.getStatus().subscribe(
      (data) => {
        this.status = data;
      }
    );
  }
  /** This method will enable or disable the Save button based on the mandatory fields selected **/
  disable() {
    if (!this.titleContains || !this.selectedFrequency || !this.selectedPrimary ||
       !this.selectedRisk || !this.selectedReviewLength || !this.review || !this.selectedGroup ||
       !this.selectedAnyAssigned || !this.selectedBackup || !this.selectedEvaluation ||
       !this.selectedDepartment || !this.selectedReviewer || !this.selectedStatus ||
       !this.selectedControlLength || !this.control
    ) {
      return true;
    } else {
      return false;
    }
  }

    /** This method will assign the changed group value
    * @param event
    * **/
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.checklistCommonService.getDepartment(event).subscribe(data => {
    this.department = data;
    });
  }
  /** This method will reset all values to default **/
  resetAll() {
    this.titleContains = '';
    this.selectedReviewLength = '=';
    this.selectedRisk = 'A';
    this.selectedPrimary = 'A';
    this.review = '';
    this.selectedGroup = this.defaultgroup;
    this.selectedAnyAssigned = 'A';
    this.selectedBackup = 'A';
    this.selectedEvaluation = 'A';
    this.selectedDepartment = 'A';
    this.selectedReviewer = 'A';
    this.selectedStatus = 'Active';
    this.selectedControlLength = '=';
    this.control = '';
  }

    /** This method will save all the data in search control screen  **/
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
        'reviewOperation' : this.selectedReviewLength
      };
      console.log(this.dataJson, 'dataJson');
        this.searchControlService.fetchSearchControlList(this.dataJson).subscribe(data => {
          this.searchControlService.setControlResultSearch(data);
          this.router.navigate(['/control/searchcontrolresults']);
        },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
  }


}
