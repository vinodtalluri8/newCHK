import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AssignedChecklistService} from '../services/assigned-checklist.service';

@Component({
  selector: 'app-inprogress-checklist',
  templateUrl: './inprogress-checklist.component.html',
  styleUrls: ['./inprogress-checklist.component.css']
})
export class InprogressChecklistComponent implements OnInit {
  colHeaders: any[];
  loginid = 'divatest_sa1';
  inprogressChecklistResults;
  @Output() inprogressDataLength = new EventEmitter();

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
    { field: 'checklist', header: 'Checklist', width: '25%' },
    { field: 'schedule', header: 'Schedule' , width: '25%' },
    { field: 'frequency', header: 'Frequency' , width: '15%' },
    { field: 'startDate', header: 'StartDate' , width: '10%' },
    { field: 'review', header: 'Review', width: '7%'},
    { field: 'dueDate', header: 'Due Date', width: '10%' },
    { field: 'action', header: 'Action', width: '8%' }
  ];
}

  ngOnInit() {
    /** To get the grid values for the inprogress checlists
     * @returns inprogressChecklistResults
     */
    this.assignedChecklistService.getInProgressChecklists(this.loginid).subscribe(
      (data) => {
        this.inprogressChecklistResults = data;
        this.inprogressDataLength.emit(this.inprogressChecklistResults.length);
      }
    );
  }

}
