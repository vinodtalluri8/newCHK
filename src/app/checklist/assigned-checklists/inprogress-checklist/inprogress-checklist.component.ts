import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';

@Component({
  selector: 'app-inprogress-checklist',
  templateUrl: './inprogress-checklist.component.html',
  styleUrls: ['./inprogress-checklist.component.css']
})
export class InprogressChecklistComponent implements OnInit {
  colHeaders: any[];
  // loginid = 'bhat_v';
  inprogressChecklistResults;
  @Output() inprogressDataLength = new EventEmitter();
  screenName: string;
  onlineDataJson: any;
  isUpdate: boolean;
  routePath: string;
  isView: boolean;

  constructor(private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'managerReview', header: 'Review', width: '15%' },
      { field: 'startDate', header: 'Start Date', width: '11%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '11%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the inprogress checlists
     * @returns inprogressChecklistResults
     */
    this.assignedChecklistService.getInProgressChecklists(appConstants.loginId).subscribe(
      (data) => {
        this.inprogressChecklistResults = data;
        this.inprogressDataLength.emit(this.inprogressChecklistResults.length);
      }
    );
  }

  /**Method to view checklist controls*/
  onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle,
    recordStartDate, recordFrequency, recordChecklistComment, recordStatus) {
    this.routePath = 'myonline';
    this.screenName = 'moip';
    this.isUpdate = true;
    this.isView = false;
    this.onlineDataJson = {
      'checklistInstanceID': recordChecklistID,
      'reviewComments': recordComment,
      'checklistName': recordChecklistName,
      'scheduleTitle': recordSubtitle,
      'startDate': recordStartDate,
      'frequency': recordFrequency,
      'screenName': this.screenName,
      'comment': recordChecklistComment,
      'isUpdate': this.isUpdate,
      'status': recordStatus,
      'isView': this.isView
    };
    console.log('in progress data 0:', this.onlineDataJson);
    this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
  }
  /**Method for past due date notification*/
  isPastDue(intendedDate) {
    return (Date.parse(intendedDate) < Date.now()) && new Date(intendedDate).toLocaleDateString() !== new Date().toLocaleDateString();
  }
}
