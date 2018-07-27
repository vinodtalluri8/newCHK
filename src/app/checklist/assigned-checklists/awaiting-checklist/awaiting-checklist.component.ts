import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AssignedChecklistService} from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';

@Component({
  selector: 'app-awaiting-checklist',
  templateUrl: './awaiting-checklist.component.html',
  styleUrls: ['./awaiting-checklist.component.css']
})
export class AwaitingChecklistComponent implements OnInit { colHeaders: any[];
  // loginid = 'bhat_v';
  awaitingChecklistResults;
  @Output() awaitingDataLength = new EventEmitter();

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '30%' },
      { field: 'subTitle', header: 'Schedule' , width: '30%' },
      { field: 'frequency', header: 'Frequency' , width: '10%' },
      { field: 'startDate', header: 'StartDate' , width: '10%' },
      { field: 'dueDate', header: 'Due Date', width: '10%' },
      { field: 'action', header: 'Action', width: '10%' }
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

}
