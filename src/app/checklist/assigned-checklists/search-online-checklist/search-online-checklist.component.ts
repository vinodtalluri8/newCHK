import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SearchOnlineChecklistResultService } from '../services/search-online-checklist-result.service';
import { StatusSearchOnlineChecklistService } from '../services/status-search-online-checklist.service';
const initialValue = 'A';
@Component({
  selector: 'app-search-online-checklist',
  templateUrl: './search-online-checklist.component.html',
  styleUrls: ['./search-online-checklist.component.css']
})
export class SearchOnlineChecklistComponent implements OnInit {
  // private onlineChecklistStatusserverURL = environment.serverUrl + '/DIVA-CommonService/searchOnlineChecklist/getStatusList';
  checklistNameContains: string;
  scheduleNameContains: string;
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
  displayDialog: boolean;
  msgs: Message[] = [];
  public statusVal: any;

  /**  giving default values for the page*/
  constructor(private httpClient: HttpClient, private router: Router, private checklistCommonService: ChecklistCommonService,
    private assignedChecklist: AssignedChecklistService, private searchOnlineChecklistResultService: SearchOnlineChecklistResultService,
    private statusSearchOnlineChecklistService: StatusSearchOnlineChecklistService) {
    this.preLoadValue();
    this.home = { icon: 'fa fa-home' };
    /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklists', routerLink: [''] },
      { label: 'Search Online Checklists' }];
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
  /** To load the data on dropdown when the page loads */
  preloadData() {
    this.checklistCommonService.getGroup('display').subscribe(data => {
      this.group = data;
    }
    );

    this.checklistCommonService.getDepartment('GIST', 'display').subscribe(data => {
      this.department = data;
    }
    );

    this.assignedChecklist.getFrequency('display').subscribe(data => {
      this.frequency = data;
    }
    );

    this.statusSearchOnlineChecklistService.getstatus().subscribe(data => {
      this.status = data;
    });

    this.assignedChecklist.getUserList('display').subscribe(data => {
      this.employee = data;
    }
    );

  }
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.checklistCommonService.getDepartment(event, 'display').subscribe(data => {
      this.department = data;
    });
  }

  preLoadValue() {
    this.selectedFrequency = initialValue;
    this.selectedStatus = initialValue;
    this.selectedEmployee = initialValue;
    this.selectedManager = initialValue;
    this.selectedDepartment = initialValue;
    this.selectedbackupManager = initialValue;
    this.selectedGroup = initialValue;
    this.selectedStatus = initialValue;
    this.selectedManagerReviewRequired = initialValue;
    this.selectedManagerReviewComplete = initialValue;
  }

  /** on clicking search button setting Json and navigation will happen */
  selectChecklist() {
    this.dataJson = {
      'employeeLoginId': 'divatest_sa1',
      'scheduleChecklistName': this.scheduleNameContains ? this.scheduleNameContains : '',
      'status': this.selectedStatus,
      'startDate': this.fromDate,
      'endDate': this.toDate,
      'employee': this.selectedEmployee,
      'manager': this.selectedManager,
      'backupManager': this.selectedbackupManager,
      'checklistName': this.checklistNameContains ? this.checklistNameContains : '',
      'group': this.selectedGroup,
      'department': this.selectedDepartment,
      'frequency': this.selectedFrequency,
      'managerReviewRequired': this.selectedManagerReviewRequired,
      'managerReviewComplete': this.selectedManagerReviewComplete
    };
    console.log(this.dataJson);
    this.statusVal = this.selectedStatus;
    this.searchOnlineChecklistResultService.setSearchCriteria(this.dataJson);
    this.router.navigate([routerConstants.searchonlinechecklistResult, this.statusVal]);
  }

  /*
  *Refresh dialog
  */
  refresh(event) {
    this.displayDialog = event;
  }

}
