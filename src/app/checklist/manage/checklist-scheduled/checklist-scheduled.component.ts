import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from '../../services/message.service';
import { routerConstants } from '../../../core/constants/routerConstants';
import { ChecklistScheduleService } from '../services/checklist-schedule.service';

@Component({
  selector: 'app-checklist-scheduled',
  templateUrl: './checklist-scheduled.component.html',
  styleUrls: ['./checklist-scheduled.component.css']
})
export class ChecklistScheduledComponent implements OnInit {

  dataJson: any;
  itemsPath: MenuItem[];
  home: MenuItem;

  value: string;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  checklistScheduled: any;
  selectedRows: number;
  colHeaders: any[];
  displayRows: SelectItem[];
  msgs: Message[] = [];
  loading: boolean;

//  checklistId: number;
  updateRecord: any;
  public selectedName: string;
  public selectedFrequency: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private location: Location, private confirmationService: ConfirmationService,
    private messageService: MessageService, private checklistScheduleService: ChecklistScheduleService) {

    this.home = { icon: 'fa fa-home' };
    /** Initilase the breadcrumbs navigation data **/
    this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
    { label: 'Schedule Checklist', routerLink: ['/' + routerConstants.scheduleChecklist] },
    { label: 'Checklist Scheduled' }
    ];
    /** Initilase the column headers data **/
    this.colHeaders = [
      { field: 'subTitle', header: 'Schedule', width: '45%' },
      { field: 'startDate', header: 'Start Date', width: '20%' },
      { field: 'action', header: 'Action(s)', width: '35%' }
    ];

    /** Assign values to variables on page load **/
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'Checklists Scheduled';
    this.selectedRows = 15;
    this.loading = false;
    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
  }

  /** Initilase or call methods onInit**/
  ngOnInit() {
    this.loading = false;
    this.selectedName = this.checklistScheduleService.getChecklistByName();
    this.selectedFrequency = this.checklistScheduleService.getChecklistByFrequency();
  //  this.checklistId = this.checklistScheduleService.getScheduledChecklistById();

    this.checklistScheduled = this.checklistScheduleService.getChecklistSchedule();
    console.log('grid record inside checklist scheduled comp', this.checklistScheduled);

    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
    // this.msgs.push();
    this.filterable = true;
    this.isPaginator = true;
    console.log('list', this.checklistScheduled);
  }

  /** To check and enable or disable pagination**/
  checkAndEnablePage(value: number) {
    if (this.checklistScheduled.length > value) {
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

  navigateNewSchedule() {
    console.log(' navigateNewSchedule yet to be implemented');
    this.msgs = [{ severity: 'info', summary: 'Implemention Pending', detail: 'New Schedule yet to be implemented' }];
  }

  editAssignments(value) {
    console.log('editAssignments yet to be implemented');
    this.msgs = [{ severity: 'info', summary: 'Implemention Pending', detail: 'Edit Assignments yet to be implemented' }];
  }

  editSchedule(value) {
    console.log('editSchedule yet to be implemented');
    this.msgs = [{ severity: 'info', summary: 'Implemention Pending', detail: 'Edit Schedule yet to be implemented' }];
  }

}
