import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';

@Component({
  selector: 'app-followup-checklist',
  templateUrl: './followup-checklist.component.html',
  styleUrls: ['./followup-checklist.component.css']
})
export class FollowupChecklistComponent implements OnInit {
  colHeaders: any[];
  // loginid = 'bhat_v';
  followupChecklistResults;
  @Output() followupDataLength = new EventEmitter();
  screenName: string;
  onlineDataJson: any;
  isUpdate: boolean;
  isView: boolean;
  routePath: string;
  page: string;
  constructor(private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'intendedCompletionDate', header: 'Intended Comp', width: '12%' },
      { field: 'status', header: 'Status', width: '8%' },
      { field: 'reviewComment', header: 'Rev Cmnt', width: '8%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '9%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the followup checlists
    * @returns followupChecklistResults
    */
    this.assignedChecklistService.getFollowUpChecklists(appConstants.loginId).subscribe(
      (data) => {
        this.followupChecklistResults = data;
        this.followupDataLength.emit(this.followupChecklistResults.length);
      }
    );
  }

  /**Method to view checklist controls*/
  onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle,
    recordStartDate, recordFrequency, recordChecklistComment) {
    this.routePath = 'myonline';
    this.screenName = 'moip';
    this.page = 'followup';
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
      'comments': recordChecklistComment,
      'page': this.page,
      'isUpdate': this.isUpdate,
      'isView': this.isView
    };
    this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
  }
}
