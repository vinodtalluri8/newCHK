import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AssignedChecklistService} from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';

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

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
    { field: 'checklistName', header: 'Checklist', width: '25%' },
    { field: 'subTitle', header: 'Schedule' , width: '10%' },
    { field: 'frequency', header: 'Frequency' , width: '10%' },
    { field: 'startDate', header: 'Start Date' , width: '10%' },
    { field: 'managerReview', header: 'Review', width: '10%'},
    { field: 'intendedCompletionDate', header: 'Due Date', width: '10%' },
    { field: 'action', header: 'Action', width: '12%' }
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

}
