import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-checklists',
  templateUrl: './assigned-checklists.component.html',
  styleUrls: ['./assigned-checklists.component.css']
})
export class AssignedChecklistsComponent implements OnInit {

  colHeaders: { field: string; header: string; }[];
  filterable: boolean;
  assignedChecklist: any[];
  addControls: any[] = [{
    'Checklist': 'GIT PM Operations Monthly Checklist',
    'Schedule': 'EPMO Project On-Boarding Monthly Checklist',
    'Frequency': 'Monthly',
    'Review': 'No',
    'Due Date': '05/20/2018'
},
{
    'Checklist': 'GIT PM Operations Quarterly Checklist',
    'Schedule': 'EPMO Quarterly On-Boarding Checklist',
    'Frequency': 'Quarterly',
    'Review': 'No',
    'Due Date': '05/20/2018'
},
{
    'Checklist': 'GIT PM Operations Weekly Checklist',
    'Schedule': 'EPMO Weekly',
    'Frequency': 'Weekly',
    'Review': 'No',
    'Due Date': '05/20/2018'
  }
];

  constructor() {   this.colHeaders = [
    { field: 'Checklist', header: 'Checklist' },
    { field: 'Schedule', header: 'Schedule' },
    { field: 'Frequency', header: 'Frequency' },
    { field: 'Review', header: 'Review' },
    { field: 'Due Date', header: 'Due Date' },
    { field: 'action', header: 'Action[s]' }
  ]; }

  ngOnInit() {
  }

}
