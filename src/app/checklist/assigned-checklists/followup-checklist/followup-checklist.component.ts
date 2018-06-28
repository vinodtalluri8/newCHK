import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';

@Component({
  selector: 'app-followup-checklist',
  templateUrl: './followup-checklist.component.html',
  styleUrls: ['./followup-checklist.component.css']
})
export class FollowupChecklistComponent implements OnInit {
  colHeaders: any[];
  loginid = 'divatest_sa1';
  followupChecklistResults;
  @Output() followupDataLength = new EventEmitter();


  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklist', header: 'Checklist', width: '20%' },
      { field: 'schedule', header: 'Schedule', width: '20%' },
      { field: 'frequency', header: 'Frequency', width: '10%' },
      { field: 'intendedComp', header: 'Intended Comp', width: '15%' },
      { field: 'status', header: 'Status', width: '8%' },
      { field: 'revCmnt', header: 'Rev Cmnt', width: '10%' },
      { field: 'dueDate', header: 'Due Date', width: '9%' },
      { field: 'action', header: 'Action', width: '8%' }
    ];
  }

  ngOnInit() {
    /** To get the grid values for the followup checlists
    * @returns followupChecklistResults
    */
    this.assignedChecklistService.getFollowUpChecklists(this.loginid).subscribe(
      (data) => {
        this.followupChecklistResults = data;
        this.followupDataLength.emit(this.followupChecklistResults.length);
      }
    );
  }

}
