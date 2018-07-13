import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-online-checklist',
  templateUrl: './search-online-checklist.component.html',
  styleUrls: ['./search-online-checklist.component.css']
})
export class SearchOnlineChecklistComponent implements OnInit {
  selectedGroup: string;
  selectedDepartment: string;
  selectedEmployee: string;
  selectedManager: string;
  selectedbackupManager: string;
  selectedFrequency: string;
  selectedStatus: string;
  selectedManagerReviewRequired: string;
  selectedManagerReviewComplete: string;
  group: SelectItem[];
  department: SelectItem[];
  employee: SelectItem[];
  manager: SelectItem[];
  backupManager: SelectItem[];
  frequency: SelectItem[];
  status: SelectItem[];
  managerReviewRequired: SelectItem[];
  managerReviewComplete: SelectItem[];
  dataJson: any;
  home: MenuItem;
  itemsPath: MenuItem[];
  toDate: Date;
  fromDate: Date;

  msgs: Message[] = [];

/**  giving default values for the page*/
  constructor(private router: Router, private checklistCommonService: ChecklistCommonService,
    private assignedChecklist: AssignedChecklistService) {
    this.selectedFrequency = 'A';
    this.selectedStatus = 'A';
    this.selectedEmployee = 'A';
    this.selectedManager = 'A';
    this.selectedDepartment = 'A';
    this.selectedbackupManager = 'A';
    this.selectedGroup = 'A';
    this.selectedStatus = 'A';
    this.selectedManagerReviewRequired = 'A';
    this.selectedManagerReviewComplete = 'A';
    this.home = { icon: 'fa fa-home' };
    /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklists', routerLink: [''] },
      { label: 'Search Online Checklist' }];
  }

  /** To Initialize the field with Yes or No on start  */
  ngOnInit() {
    this.preloadData();
    this.managerReviewComplete = [
      { label: 'All', value: 'A' },
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' }
    ];

    this.managerReviewRequired = [
      { label: 'All', value: 'A' },
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' }
    ];
  }

  preloadData() {
    this.checklistCommonService.getGroup('display').subscribe(data => {
      this.group = data;
    }
    );

    this.checklistCommonService.getDepartment('GIST', 'display').subscribe(data => {
      this.department = data;
    }
    );

    this.checklistCommonService.getFrequency('display').subscribe(data => {
      this.frequency = data;
    }
    );

    this.checklistCommonService.getStatus('display').subscribe(data => {
      this.status = data;
    }
    );

    this.assignedChecklist.getUserList('display').subscribe(data => {
      this.employee = data;
    }
    );

  }
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.checklistCommonService.getDepartment(event, 'add').subscribe(data => {
      this.department = data;
    });
  }
  selectChecklist() {

    this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Search functionality yet to be Implemented'});
    // this.dataJson = {
    //   'groupName': this.selectedGroup,
    //   'departmentName': this.selectedDepartment,
    //   'frequencyName': this.selectedFrequency,
    //   'status': this.selectedStatus,
    // };
    // this.searchControlService.setSearchCriteria(this.dataJson);
    // this.router.navigate([routerConstants.searchonlinechecklistResult]);
    //  this.router.navigate(['/searchonlinechecklist/results']);
  }
}
