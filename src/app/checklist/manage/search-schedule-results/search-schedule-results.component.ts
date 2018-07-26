import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ChecklistScheduleService } from '../services/checklist-schedule.service';

@Component({
  selector: 'app-search-schedule-results',
  templateUrl: './search-schedule-results.component.html',
  styleUrls: ['./search-schedule-results.component.css']
})
export class SearchScheduleResultsComponent implements OnInit {
  public routePath: any = 'scheduleResults';

  value: string;
  isPaginator: boolean;
  filterable: boolean;
  loading: boolean;

  @Input() scheduleChecklistResults: any = [];
  exportFileName: string;
  selectedRows: number;
  colHeaders: any[];
  displayRows: SelectItem[];
  msgs: Message[] = [];

  checklistId: number;
  checklistscheduledResults: any;
  dataJson: any;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService,
  private checklistScheduleService: ChecklistScheduleService ) {

    /** Initilase the column headers data **/
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '25%' },
      { field: 'checklistDepartment', header: 'Department', width: '12%' },
      { field: 'description', header: 'Description', width: '45%' },
      { field: 'checklistFrequency', header: 'Frequency', width: '10%' },
      { field: 'schedule', header: 'Schedule', width: '8%' }
    ];
    /** Assign values to variables on page load **/
    this.isPaginator = true;
    this.filterable = true;
    this.selectedRows = 15;
    this.loading = false;
    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
    this.exportFileName = 'ScheduleChecklistResults';
  }

  /** method to call data on page on load **/
  ngOnInit() {
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
    // this.msgs.push();
    this.filterable = true;
    this.isPaginator = true;

    console.log('list', this.scheduleChecklistResults);
  }
  /* to schedule record */
  schedule(record) {

    this.checklistScheduleService.setChecklistByName(record['checklistName']);
    this.checklistScheduleService.setChecklistByFrequency(record['checklistFrequency']);
    this.checklistScheduleService.setChecklistById(record['checklistId']);
    this.checklistId = record['checklistId'];
    console.log('checklist inside schedule method', this.checklistId);

    this.dataJson = {
      'checklistID': this.checklistId
    };
    this.checklistScheduleService.setJsonForScheduleGrid(this.dataJson);
    this.checklistScheduleService.scheduledChecklist(this.dataJson).subscribe(data => {
    this.checklistscheduledResults = data;
    if (this.checklistscheduledResults.length > 0) {
      console.log('this.checklistscheduledResults.length', this.checklistscheduledResults.length);
      console.log('true');
      this.checklistScheduleService.setChecklistSchedule(this.checklistscheduledResults);
      this.router.navigate([routerConstants.checklistScheduled]);
    } else {
      console.log('empty');
      this.router.navigate(['/' + routerConstants.newChecklistSchedule, this.routePath]);
          }
    },
    error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
  }

    /** To check and enable or disable pagination**/
  checkAndEnablePage(value: number) {
    if (this.scheduleChecklistResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
    console.log(' mesagepage ', this.msgs);
  }

  pagination(isPaginator: boolean) {
    this.isPaginator = isPaginator;
  }

}
