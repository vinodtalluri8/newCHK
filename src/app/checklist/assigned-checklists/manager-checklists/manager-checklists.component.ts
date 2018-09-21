import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manager-checklists',
  templateUrl: './manager-checklists.component.html',
  styleUrls: ['./manager-checklists.component.css']
})
export class ManagerChecklistsComponent implements OnInit {
  // loginid = 'bhat_v';
  managerChecklistResults;
  @Output() managerDataLength = new EventEmitter();
  screenName: string;
  onlineDataJson: any;

  colHeaders: any[];
  isReview: string;
  routePath: string;
  isUpdate: boolean;
  isView: boolean;
  constructor(private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router, private confirmationService: ConfirmationService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: ' 20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'modifyManagerReviewDate', header: 'Last Rev', width: '10%' },
      { field: 'endDate', header: 'End Date', width: '8%' },
      { field: 'comment', header: 'Empl Comment', width: '11%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '8%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the awaiting checlists
     * @returns awaitingChecklistResults
     */
    this.assignedChecklistService.geManagerChecklists(appConstants.loginId).subscribe(
      (data) => {
        this.managerChecklistResults = data;
        this.managerDataLength.emit(this.managerChecklistResults.length);
      }
    );
  }
  /**Method to view checklist controls*/
  onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle,
    recordStartDate, recordFrequency, recordChecklistComment, recordManagerCompletedTask, recordBackupManager,
    recordbkupManagerCompletedTask) {
    if ((recordManagerCompletedTask && !recordBackupManager) || (recordbkupManagerCompletedTask && recordBackupManager)) {
      this.confirmationService.confirm({
        message: 'You performed one or more of the controls in the '
          + 'checklist you want to review. A person cannot act as employee and manager on the same checklist,'
          + 'another manager must review the checklist.',
        header: 'Alert'
      });
    } else {
      this.routePath = 'myonline';
      this.isReview = 'review';
      this.isUpdate = false;
      this.isView = true;
      this.onlineDataJson = {
        'checklistInstanceID': recordChecklistID,
        'reviewComments': recordComment,
        'checklistName': recordChecklistName,
        'scheduleTitle': recordSubtitle,
        'startDate': recordStartDate,
        'frequency': recordFrequency,
        'comments': recordChecklistComment,
        'mode': this.isReview
      };
      this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
      this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
    }
  }
}
