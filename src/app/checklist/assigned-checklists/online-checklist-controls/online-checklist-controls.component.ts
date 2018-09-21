import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { appConstants } from '../../../core/constants/appConstants';

@Component({
  selector: 'app-online-checklist-controls',
  templateUrl: './online-checklist-controls.component.html',
  styleUrls: ['./online-checklist-controls.component.css']
})
export class OnlineChecklistControlsComponent implements OnInit {

  scheduleTitle: string;
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  colHeaders: any[];
  selectedRows: number;
  displayRows: SelectItem[];
  onlineChecklistsControlsResults: any = [];
  selectedStatus: string;
  displayStatus: SelectItem[];
  loading: boolean;
  managerReviewComments: string;
  procedurePath: string;
  dataJson: any;
  doc: any;
  fetchonlineData: any;
  displayComments: boolean;
  onlineControlJson: any;
  isView: boolean;
  isUpdate: boolean;

  startDate: string;
  checklistName: string;
  checklistInstanceId: number;
  frequency: string;
  updateStatusJson: any;
  updateStatusDialog: boolean;
  dialogHeader: string;
  screenName: string;
  comments: string;
  savedRecord;
  isReview: string;
  statusForUpdate: string;
  reviewStatusJson: any;
  reviewStatusDialog: boolean;
  reviewCheck: string;
  routePath: string;
  disabled: boolean;
  page: string;
  isClosed: boolean;
  closedDate: string;

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private router: Router, private route: ActivatedRoute) {
    this.home = { icon: 'fa fa-home' };
    this.route.params.subscribe(params => {
      this.routePath = params['routePath'];
    });
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'ViewChecklistsControls';
    this.selectedRows = 15;

    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];

    this.displayStatus = [{ label: 'All', value: 'A' },
    { label: 'In Progress', value: 'In Progress' }, { label: 'Complete', value: 'Complete' }];


  }

  ngOnInit() {
    /*Fetch Online Data*/
    this.fetchonlineData = this.onlineChecklistService.getChecklistJson();
    if (this.fetchonlineData != null) {
      this.checklistInstanceId = this.fetchonlineData['checklistInstanceID'];
      this.managerReviewComments = this.fetchonlineData['reviewComments'];
      this.checklistName = this.fetchonlineData['checklistName'];
      this.scheduleTitle = this.fetchonlineData['scheduleTitle'];
      this.startDate = this.fetchonlineData['startDate'];
      this.frequency = this.fetchonlineData['frequency'];
      this.screenName = this.fetchonlineData['screenName'];
      this.comments = this.fetchonlineData['comment'];
      this.isUpdate = this.fetchonlineData['isUpdate'];
      this.isView = this.fetchonlineData['isView'];
      this.page = this.fetchonlineData['page'];
      this.isReview = this.fetchonlineData['mode'];
      this.statusForUpdate = this.fetchonlineData['status'];
      this.isClosed = this.fetchonlineData['isClosed'];
      this.closedDate = this.fetchonlineData['closedDate'];
    }
    this.fetchHeaders();

    this.colHeaders['Escalation'] = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];

    if (this.isView === true || this.page === 'followup' || this.isReview === 'review') {
      this.selectedStatus = 'A';
    } else {
      this.selectedStatus = 'In Progress';
    }
    if (this.checklistInstanceId != null) {
      this.loading = true;
      this.fetchOnlineChecklistControls();
      this.loading = false;
    }
    this.breadcrumbs();

    if (this.managerReviewComments.trim().length > 0 && !this.isClosed) {
      this.displayComments = true;
      this.disabled = true;
    }
  }

  fetchHeaders() {
    if (this.isUpdate) {
      this.colHeaders = [
        { field: 'displayOrder', header: '#', width: '4%' },
        { field: 'title', header: 'Title', width: '8%' },
        { field: 'description', header: 'Description', width: '20%' },
        { field: 'docTitle', header: 'Procedure', width: '10%' },
        { field: 'status', header: 'Status', width: '8%' },
        { field: 'gridItem', header: 'ICM', width: '5%' },
        { field: 'flagFollowUp', header: 'Issue', width: '6%' },
        { field: 'flagEscalate', header: 'Escalation', width: '8%' },
        { field: 'attachments', header: 'Docs', width: '7%' },
        { field: 'modifyUser', header: 'Last to Modify', width: '10%' },
        { field: 'comment', header: 'Comment', width: '8%' },
        { field: 'complete', header: 'Complete', width: '9%' },
        { field: 'process', header: 'Process', width: '8%' }
      ];
    } else {
      this.colHeaders = [
        { field: 'displayOrder', header: '#', width: '4%' },
        { field: 'title', header: 'Title', width: '8%' },
        { field: 'description', header: 'Description', width: '24%' },
        { field: 'docTitle', header: 'Procedure', width: '10%' },
        { field: 'status', header: 'Status', width: '8%' },
        { field: 'gridItem', header: 'ICM', width: '5%' },
        { field: 'flagFollowUp', header: 'Issue', width: '6%' },
        { field: 'flagEscalate', header: 'Escalation', width: '10%' },
        { field: 'attachments', header: 'Docs', width: '7%' },
        { field: 'modifyUser', header: 'Last to Modify', width: '12%' },
        { field: 'comment', header: 'Comment', width: '10%' },
        { field: 'process', header: 'Process', width: '6%' }
      ];
    }
  }

  /*
   *fetch the values for the grid.
   */
  fetchOnlineChecklistControls() {
    this.dataJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'status': this.selectedStatus,
      'mode': this.isReview
    };
    this.onlineChecklistService.fetchUpdateViewOnlineCheckLists(this.dataJson).subscribe(data => {
      this.onlineChecklistsControlsResults = data;
      this.loading = false;
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot fetch Controls Data', detail: error }];
      });
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }
  /** This method will navigate back to search online results **/
  back() {
    this.location.back();
  }

  /*method for breadcrumbs*/
  breadcrumbs() {
    if (this.routePath === 'searchonline' || this.isView || !this.isUpdate) {
      this.itemsPath = [{ label: 'Checklists' },
      { label: 'Search Online Checklists', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
      { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
      { label: 'Checklist Controls' }
      ];
    }
    if (this.routePath === 'myonline' || this.isUpdate) {
      this.itemsPath = [
        { label: 'My Assigned Checklists', routerLink: ['/' + routerConstants.defaultRoute] },
        { label: 'Checklist Controls' }
      ];
    }
  }

  /*
  *To enable or diable pagination
  */
  checkAndEnablePage(value: number) {
    if (this.onlineChecklistsControlsResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
  }

  /*
  *To view online controls
  */
  onlineViewControl(recordTaskid, recordDisplayOrder, recordTitle, recordLink, recordDocTitle) {
    this.onlineControlJson = {
      'checklistInstanceID': this.checklistInstanceId,
      'scheduleTitle': this.scheduleTitle,
      'checklistName': this.checklistName,
      'taskId': recordTaskid,
      'displayOrder': recordDisplayOrder,
      'controlTitle': recordTitle,
      'link': recordLink,
      'docTitle': recordDocTitle,
      'isUpdate': this.isUpdate,
      'isView': this.isView

    };
    this.onlineChecklistService.setControlJson(this.onlineControlJson);
    this.router.navigate([routerConstants.viewUpdateOnlineControls, this.routePath]);
  }

  /*
   * Fetch data for dropdown change
   */
  fetchData(record) {
    this.loading = true;
    this.selectedStatus = record;
    this.fetchOnlineChecklistControls();
    this.loading = false;
  }

  /* method for updating checklsit status
  */
  updateStatus() {
    if (this.isReview === 'review') {
      this.reviewCheck = 'reviewCheck';
      this.reviewStatusJson = {
        'checklistInstanceId': this.checklistInstanceId,
        'mode': this.isReview
      };
      console.log('in checkcontrols method for setting json 1:', this.reviewStatusJson);
      this.onlineChecklistService.setReviewStatusJson(this.reviewStatusJson);
      this.reviewStatusDialog = true;
      this.dialogHeader = 'Review Checklist';
    } else {
      this.updateStatusJson = {
        'checklistInstanceId': this.checklistInstanceId,
        'employeeLoginId': appConstants.loginId,
        'status': this.statusForUpdate,
        'comment': this.comments,
        'page': this.page
      };
      console.log('in checkcontrols method for setting json 1:', this.updateStatusJson);
      this.onlineChecklistService.setUpdateStatusJson(this.updateStatusJson);
      this.updateStatusDialog = true;
      this.dialogHeader = 'Update Checklist Status';
    }
  }

  /*Refresh dialog
   */
  refresh(event) {
    this.updateStatusDialog = event;
    this.reviewStatusDialog = event;
  }

  /*
   *Method to complete control
   */
  completeControl(recordTaskid, recordDisplayOrder) {
    this.msgs = [];
    this.dataJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'taskId': recordTaskid,
      'displayOrder': recordDisplayOrder,
      'loginId': appConstants.loginId
    };
    this.onlineChecklistService.completeControl(this.dataJson).subscribe(data => {
      this.savedRecord = data;
      this.fetchOnlineChecklistControls();
      this.msgs = [{ severity: 'success', detail: 'Record Updated Successfully' }];
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Cannot perform complete control action', detail: error }];
    });
  }
}
