import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';
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
  // @Input() scheduledDataLength: Number;

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '25%' },
      { field: 'subTitle', header: 'Schedule', width: '25%' },
      { field: 'frequency', header: 'Frequency', width: '15%' },
      { field: 'managerReview', header: 'Review', width: '10%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '10%' },
      { field: 'action', header: 'Action', width: '15%' }
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
}
