import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';
import { MessageService } from '../../services/message.service';
import { Message } from 'primeng/components/common/api';
@Component({
  selector: 'app-scheduled-checklist',
  templateUrl: './scheduled-checklist.component.html',
  styleUrls: ['./scheduled-checklist.component.css']
})
export class ScheduledChecklistComponent implements OnInit {
  colHeaders: any[];
  // loginid = 'bhat_v';
  scheduledChecklistResults;
  @Output() scheduledDataLength = new EventEmitter();
  onlineDataJson: any;
  screenName: string;
  isUpdate: boolean;
  isView: boolean;
  savedRecord;
  msgs: Message[] = [];
  scheduledJson: any;
  routePath: string;
  // @Input() scheduledDataLength: Number;

  constructor(private assignedChecklistService: AssignedChecklistService,
    private onlineChecklistService: OnlineChecklistService, private router: Router, private messageService: MessageService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'managerReview', header: 'Review', width: '18%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '19%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the scheduled checlists
     * @returns scheduledChecklistResults
     */
    console.log('inside component');
    this.assignedChecklistService.getScheduledChecklists(appConstants.loginId).subscribe(
      (data) => {
        this.scheduledChecklistResults = data;
        if (this.scheduledChecklistResults.length > 0) {
          console.log('data length', this.scheduledChecklistResults.length);
          this.scheduledDataLength.emit(this.scheduledChecklistResults.length);
        }

      }
    );
  }

  /**Method to view checklist controls*/
  onlineChecklistControls(recordChecklistID, recordComment, recordChecklistName, recordSubtitle,
    recordStartDate, recordFrequency, recordChecklistComment, recordscheduledId) {
    this.msgs = [];
    this.screenName = 'moip';
    this.scheduledJson = {
      'checklistScheduleID': recordscheduledId,
      'loginId': appConstants.loginId,
    }; // 'loginId': 'bhat_v'
    this.onlineChecklistService.startChecklist(this.scheduledJson).subscribe(data => {
      this.savedRecord = data;
      this.routePath = 'myonline';
      this.isUpdate = true;
      this.isView = false;
      this.onlineDataJson = {
        'checklistInstanceID': this.savedRecord['id'],
        'reviewComments': recordComment,
        'checklistName': recordChecklistName,
        'scheduleTitle': recordSubtitle,
        'startDate': recordStartDate,
        'frequency': recordFrequency,
        'screenName': this.screenName,
        'comments': recordChecklistComment,
        'isUpdate': this.isUpdate,
        'isView': this.isView
      };
      console.log(this.onlineDataJson, 'this.onlineDataJson');
      this.onlineChecklistService.setChecklistJson(this.onlineDataJson);
      this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Cannot Start Checklist', detail: error }];
    });
  }
}
