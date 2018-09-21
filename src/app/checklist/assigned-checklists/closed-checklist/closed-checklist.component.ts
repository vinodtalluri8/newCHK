import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';

@Component({
  selector: 'app-closed-checklist',
  templateUrl: './closed-checklist.component.html',
  styleUrls: ['./closed-checklist.component.css']
})
export class ClosedChecklistComponent implements OnInit {
  colHeaders: any[];
  // loginid = 'bhat_v';
  closedChecklistResults;
  @Output() closedDataLength = new EventEmitter();
  onlineDataJson: any;
  onlineCommentsJson: any;
  routePath: string;
  isUpdate: boolean;
  isView: boolean;
  isClosed: boolean;

  constructor(private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'startDate', header: 'Start Date', width: '8%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '8%' },
      { field: 'modifyUser', header: 'Last to Modify', width: '13%' },
      { field: 'comments', header: 'Comments', width: '8%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the closed checlists
    * @returns closedChecklistResults
    */
    this.assignedChecklistService.getClosedChecklists(appConstants.loginId).subscribe(
      (data) => {
        this.closedChecklistResults = data;
        this.closedDataLength.emit(this.closedChecklistResults.length);
      }
    );
  }
   /**Method to view checklist controls*/
   onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle,
    recordStartDate, recordFrequency, recordEndDate) {
      this.routePath = 'myonline';
      this.isUpdate = false;
      this.isView = true;
      this.isClosed = true;
      this.onlineDataJson = {
      'checklistInstanceID': recordChecklistID,
      'reviewComments': recordComment,
      'checklistName': recordChecklistName,
      'scheduleTitle': recordSubtitle,
      'startDate': recordStartDate,
      'frequency': recordFrequency,
      'isUpdate': this.isUpdate,
      'closedDate': recordEndDate,
      'isView': this.isView,
      'isClosed': this.isClosed
    };
    this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
  }

  /**Method to add additional comments*/
  addAdditionalComments(recordComments, recordChecklistId, recordFrequency, recordChecklistName
    , recordStartDate) {
    this.routePath = 'myonline';
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
}
