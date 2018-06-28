import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import {AssignedChecklistService} from '../services/assigned-checklist.service';
@Component({
  selector: 'app-scheduled-checklist',
  templateUrl: './scheduled-checklist.component.html',
  styleUrls: ['./scheduled-checklist.component.css']
})
export class ScheduledChecklistComponent implements OnInit {
  colHeaders: any[];
  loginid = 'divatest_sa1';
  scheduledChecklistResults;
  @Output() scheduledDataLength = new EventEmitter();
  // @Input() scheduledDataLength: Number;

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
    { field: 'checklist', header: 'Checklist', width: '25%' },
    { field: 'schedule', header: 'Schedule', width: '25%' },
    { field: 'frequency', header: 'Frequency', width: '20%' },
    { field: 'review', header: 'Review', width: '10%' },
    { field: 'dueDate', header: 'Due Date' , width: '10%' },
    { field: 'action', header: 'Action' , width: '10%'}
  ];
}

  ngOnInit() {
    /** To get the grid values for the scheduled checlists
     * @returns scheduledChecklistResults
     */
    console.log( 'inside component');
    this.assignedChecklistService.getScheduledChecklists(this.loginid).subscribe(
      (data) => {
                this.scheduledChecklistResults = data;
               this.scheduledDataLength.emit(this.scheduledChecklistResults.length);

      }
    );
  }
}
