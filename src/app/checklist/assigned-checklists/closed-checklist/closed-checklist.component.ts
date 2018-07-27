import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';

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

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'subTitle', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '10%' },
      { field: 'startDate', header: 'Start Date', width: '10%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '8%' },
      { field: 'modifyUser', header: 'Last to Modify', width: '15%' },
      { field: 'comments', header: 'Comments', width: '9%' },
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
}
