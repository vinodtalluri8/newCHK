import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';

@Component({
  selector: 'app-closed-checklist',
  templateUrl: './closed-checklist.component.html',
  styleUrls: ['./closed-checklist.component.css']
})
export class ClosedChecklistComponent implements OnInit {
  colHeaders: any[];
  loginid = 'divatest_sa1';
  closedChecklistResults;
  @Output() closedDataLength = new EventEmitter();

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklist', header: 'Checklist', width: '20%' },
      { field: 'schedule', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '10%' },
      { field: 'startDate', header: 'Start Date', width: '10%' },
      { field: 'dueDate', header: 'Due Date', width: '8%' },
      { field: 'lastToModify', header: 'Last to Modify', width: '15%' },
      { field: 'comments', header: 'Comments', width: '9%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the closed checlists
    * @returns closedChecklistResults
    */
    this.assignedChecklistService.getClosedChecklists(this.loginid).subscribe(
      (data) => {
        this.closedChecklistResults = data;
        this.closedDataLength.emit(this.closedChecklistResults.length);
      }
    );
  }

}
