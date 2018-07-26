import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-online-checklist-controls',
  templateUrl: './online-checklist-controls.component.html',
  styleUrls: ['./online-checklist-controls.component.css']
})
export class OnlineChecklistControlsComponent implements OnInit {

  scheduleTitle: string;
  startDate: string;
  checklistName: string;
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
  checklistInstanceId: number;
  doc: any;
  fetchonlineData: any;
  displayComments: boolean;
  onlineControlJson: any;

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private router: Router, private route: ActivatedRoute) {
    this.home = { icon: 'fa fa-home' };
    this.breadcrumbs();
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
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'ViewChecklistsControls';
    this.selectedStatus = 'A';
    this.selectedRows = 15;

    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];

    this.displayStatus = [{ label: 'All', value: 'A' },
    { label: 'In Progress', value: 'In Progress' }, { label: 'Complete', value: 'Complete' }];

    this.colHeaders['Escalation'] = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];
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
    }
    if (this.managerReviewComments.trim().length > 0 ) {
      this.displayComments = true;
      console.log('in component', this.managerReviewComments);
    }
    if (this.checklistInstanceId != null) {
      this.loading = true;
      this.fetchOnlineChecklistControls();
      this.loading = false;
    }
  }


  /*
   *fetch the values for the grid.
   */
  fetchOnlineChecklistControls() {
    this.dataJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'status': this.selectedStatus,
    };
    console.log('this.dataJson', this.dataJson);
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
    this.itemsPath = [{ label: 'Checklists' },
    { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
    { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
    { label: 'Checklist Controls' }
    ];
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
      'docTitle': recordDocTitle
    };
    this.onlineChecklistService.setControlJson(this.onlineControlJson);
    this.router.navigate(['/searchonlinechecklist/viewControl']);
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
}
