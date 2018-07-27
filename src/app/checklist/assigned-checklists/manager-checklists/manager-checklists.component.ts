import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { appConstants } from '../../../core/constants/appConstants';

@Component({
  selector: 'app-manager-checklists',
  templateUrl: './manager-checklists.component.html',
  styleUrls: ['./manager-checklists.component.css']
})
export class ManagerChecklistsComponent implements OnInit {
  // loginid = 'bhat_v';
  managerChecklistResults;
  @Output() managerDataLength = new EventEmitter();
  colHeaders: any[];
  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** assigning grid column headers */
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '30%' },
      { field: 'subTitle', header: 'Schedule' , width: '30%' },
      { field: 'frequency', header: 'Frequency' , width: '10%' },
      { field: 'modifyManagerReviewDate', header: 'Last Rev' , width: '10%' },
      { field: 'endDate', header: 'End Date' , width: '10%' },
      { field: 'comment', header: 'Empl Comment' , width: '10%' },
      { field: 'intendedCompletionDate', header: 'Due Date', width: '10%' },
      { field: 'action', header: 'Action', width: '10%' }
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

}
