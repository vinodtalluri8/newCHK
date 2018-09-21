import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { routerConstants } from '../../../core/constants/routerConstants';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchOnlineChecklistResultService } from '../services/search-online-checklist-result.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { MessageService } from '../../services/message.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-search-online-checklist-result',
  templateUrl: './search-online-checklist-result.component.html',
  styleUrls: ['./search-online-checklist-result.component.css']
})
export class SearchOnlineChecklistResultComponent implements OnInit {
  public routePath:  any =  'searchOnlineResults';
  public fromGrid: any;
  itemsPath: MenuItem[];
  home: MenuItem;
  colHeaderSchedule: any[];
  colHeaderInProgress: any[];
  loading: boolean;
  SOCR: any = [];
  SOCRInProgress: any = [];
  colHeaderFollowUp: any = [];
  SOCRFollowUp: any = [];
  colHeaderManagerReview: any = [];
  SOCRManagerReview: any = [];
  colHeaderCloseCompleted: any = [];
  SOCRClosedCompleted: any = [];
  mode: string;
  inputJson: any;
  msgs: Message[] = [];

  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  selectedRows: number;
  displayRows: SelectItem[];
  statusVal: string;
  onlineDataJson: any;
  onlineCommentsJson: any;
  isView: boolean;
  isUpdate: boolean;


  constructor(private httpClient: HttpClient, private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router,
    private searchOnlineChecklistResultService: SearchOnlineChecklistResultService,
    private location: Location, private route: ActivatedRoute) {
    this.home = { icon: 'fa fa-home' };
    /** Initilase the breadcrumbs navigation data */
    this.itemsPath = [{ label: 'Checklists', routerLink: [''] },
    { label: 'Search Online Checklists', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
    { label: 'Search Results' }
    ];

    /** setting column header for schedule grid */
    this.colHeaderSchedule = [
      { field: 'checklistName', header: 'Checklist', width: '30%' },
      { field: 'subTitle', header: 'Schedule', width: '27%' },
      { field: 'frequency', header: 'Frequency', width: '8%' },
      { field: 'managerReview', header: 'Review', width: '6%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '8%' },
      { field: 'checklistAssignments', header: 'Assignments', width: '9%' },
      { field: 'checklistProcess', header: 'Process', width: '12%' }
    ];
    /** setting column header for In Progress grid */
    this.colHeaderInProgress = [
      { field: 'checklistName', header: 'Checklist', width: '29%' },
      { field: 'subTitle', header: 'Schedule', width: '23%' },
      { field: 'frequency', header: 'Frequency', width: '8%' },
      { field: 'startDate', header: 'Start Date', width: '8%' },
      { field: 'managerReview', header: 'Review', width: '6%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '7%' },
      { field: 'checklistAssignments', header: 'Assignments', width: '9%' },
      { field: 'checklistView', header: 'View', width: '10%' }
    ];

    /** setting column header for Follow-Up grid */
    this.colHeaderFollowUp = [
      { field: 'checklistName', header: 'Checklist', width: '22%' },
      { field: 'subTitle', header: 'Schedule', width: '22%' },
      { field: 'frequency', header: 'Frequency', width: '8%' },
      { field: 'intendedCompletionDate', header: 'Intended Comp', width: '10%' },
      { field: 'status', header: 'Status', width: '6%' },
      { field: 'endDate', header: 'End Date', width: '8%' },
      { field: 'reviewComment', header: 'Rev Cmnt', width: '8%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '8%' },
      { field: 'checklistProcess', header: 'Process', width: '8%' }
    ];

    /** setting column header for Manager Review grid */
    this.colHeaderManagerReview = [
      { field: 'checklistName', header: 'Checklist', width: '22%' },
      { field: 'subTitle', header: 'Schedule', width: '25%' },
      { field: 'frequency', header: 'Frequency', width: '8%' },
      { field: 'modifyManagerReviewDate', header: 'Last Rev', width: '7%' },
      { field: 'endDate', header: 'End Date', width: '7%' },
      { field: 'comment', header: 'Empl Comment', width: '10%' },
      { field: 'reviewComment', header: 'Rev Cmnt', width: '9%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '7%' },
      { field: 'checklistReview', header: 'Review', width: '5%' }
    ];

    /** setting column header for Closed/Completed grid */
    this.colHeaderCloseCompleted = [
      { field: 'checklistName', header: 'Checklist', width: '17%' },
      { field: 'subTitle', header: 'Schedule', width: '14%' },
      { field: 'frequency', header: 'Frequency', width: '8%' },
      { field: 'startDate', header: 'Start Date', width: '8%' },
      { field: 'endDate', header: 'End Date', width: '7%' },
      { field: 'status', header: 'Status', width: '6%' },
      { field: 'checklistAssignments', header: 'Assignments', width: '9%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '7%' },
      { field: 'modifyUser', header: 'Last To Modify', width: '10%' },
      { field: 'checklistComments', header: 'Comments', width: '8%' },
      { field: 'checklistView', header: 'View', width: '5%' }
    ];
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.statusVal = params['statusVal'];
    });
    this.fromGrid = 'grid';
    this.loadData();
    // this.searchOnlineChecklistResultService.getSearchOnlineChecklistResult().subscribe(data => {
    //   this.SOCR = data['pending'];
    //   this.SOCRInProgress = data['inProgress'];
    //   this.SOCRFollowUp = data['employeeFollowUp'];
    //   this.SOCRManagerReview = data['managerReview'];
    //   if (data['closed'].length > 0) {
    //     this.SOCRClosedCompleted = data['closed'];
    //   } else {
    //     this.SOCRClosedCompleted = data['complete'];
    //         }

    //   // this.SOCRClosedCompleted = data['closed'];
    // }, error => {
    //   this.msgs = [{ severity: 'error', summary: 'Error While loading data', detail: error }];
    // });
    this.loading = false;
  }

  loadData() {
    this.searchOnlineChecklistResultService.getSearchOnlineChecklistResult().subscribe(data => {
      if (data['pending'].length > 0) {
        this.SOCR = data['pending'];
      } else {
        this.SOCR = data['scheduled'];
            }
      // this.SOCR = data['pending'];
      this.SOCRInProgress = data['inProgress'];
      this.SOCRFollowUp = data['employeeFollowUp'];
      this.SOCRManagerReview = data['managerReview'];
      if (data['closed'].length > 0) {
        this.SOCRClosedCompleted = data['closed'];
      } else {
        this.SOCRClosedCompleted = data['complete'];
            }

      // this.SOCRClosedCompleted = data['closed'];
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error While loading data', detail: error }];
    });
  }
  /** setting Json for Assignment button when its in Edit mode */
  editAssignment(rowData) {
    this.onlineChecklistService.setRowData(rowData);
    this.router.navigate([routerConstants.onlineChecklistAssignment, this.fromGrid]);

  }
  /** setting Json for Assignment button when it in view mode */
  viewAssignment(rowData) {
    console.log('Inside viewAssignment');
    this.onlineChecklistService.setRowData(rowData);
    this.router.navigate([routerConstants.onlineChecklistAssignment, this.fromGrid]);

  }
  /**Method to add additional comments*/
  addAdditionalComments(recordChecklistId, recordFrequency, recordChecklistName, recordStartDate, recordComments) {
    this.routePath = 'searchonline';
    this.onlineCommentsJson = {
      'checklistInstanceID': recordChecklistId,
      'frequency': recordFrequency,
      'checklistName': recordChecklistName,
      'startDate': recordStartDate,
      'additionalComments': recordComments
    };
    this.onlineChecklistService.setCommentsJson(this.onlineCommentsJson);
    this.router.navigate([routerConstants.comments, this.routePath]);
  }

  /**Method to view checklist controls*/
  onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle
    , recordStartDate, recordFrequency, recordEndDate) {
    this.routePath = 'searchonline';
    this.isView = true;
    this.isUpdate = false;
    this.onlineDataJson = {
      'checklistInstanceID': recordChecklistID,
      'reviewComments': recordComment,
      'checklistName': recordChecklistName,
      'scheduleTitle': recordSubtitle,
      'startDate': recordStartDate,
      'frequency': recordFrequency,
      'closedDate': recordEndDate,
      'isView': this.isView,
      'isUpdate': this.isUpdate
    };
    this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
  }
  editSchedule(rowData) {
    console.log('route path', this.routePath);
    console.log('sche id', rowData['checklistScheduleID']);
    this.router.navigate([routerConstants.editChecklistSchedule, this.routePath, rowData['checklistScheduleID']]);
  }
  backScreen() {
    this.location.back();
    }

    isPastDue(intendedDate) {
      return (Date.parse(intendedDate) < Date.now()) && new Date(intendedDate).toLocaleDateString() !== new Date().toLocaleDateString();
    }
}

