import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';

@Component({
  selector: 'app-awaiting-checklist',
  templateUrl: './awaiting-checklist.component.html',
  styleUrls: ['./awaiting-checklist.component.css']
})
export class AwaitingChecklistComponent implements OnInit {
  colHeaders: any[];
  // loginid = 'bhat_v';
  awaitingChecklistResults;
  @Output() awaitingDataLength = new EventEmitter();
  onlineDataJson: any;
  routePath: string;
  isUpdate: boolean;
  isView: boolean;

  constructor(private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'startDate', header: 'StartDate', width: '18%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '19%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the awaiting checlists
     * @returns awaitingChecklistResults
     */
    this.assignedChecklistService.getAwaitingChecklists(appConstants.loginId).subscribe(
      (data) => {
        this.awaitingChecklistResults = data;
        this.awaitingDataLength.emit(this.awaitingChecklistResults.length);
      }
    );
  }

  /**Method to view checklist controls*/
  onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle,
    recordStartDate, recordFrequency) {
    this.routePath = 'myonline';
    this.isUpdate = false;
    this.isView = true;
    this.onlineDataJson = {
      'checklistInstanceID': recordChecklistID,
      'reviewComments': recordComment,
      'checklistName': recordChecklistName,
      'scheduleTitle': recordSubtitle,
      'startDate': recordStartDate,
      'isUpdate': this.isUpdate,
      'frequency': recordFrequency,
      'isView': this.isView,
    };
    this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
  }
  /**Method for past due date notification*/
  isPastDue(intendedDate) {
    return (Date.parse(intendedDate) < Date.now()) && new Date(intendedDate).toLocaleDateString() !== new Date().toLocaleDateString();
  }
}
