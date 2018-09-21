import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { AssignmentServiceService } from '../services/assignment-service.service';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { MessageService } from '../../services/message.service';
import { Location } from '@angular/common';
import { ChecklistScheduleService } from '../../manage/services/checklist-schedule.service';
import { NewEditScheduleService } from '../../manage/services/new-edit-schedule.service';
import { Breadcrumb } from 'primeng/primeng';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  itemsPath: MenuItem[];
  home: MenuItem;
  colHeader: any = [];
  results: any = [];
  displayData: any;
  checklistName: string;
  checklistSchedule: string;
  param: string;
  value: boolean;
  loading: boolean;


  displayDialog: boolean;
  isUpdate: boolean;
  dialogHeader: string;
  addAssignmentDialog: boolean;
  screenName: string;
  msgs: Message[] = [];
  modifyManagerData: any = [];
  addNewChecklistManagerDialog: boolean;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  selectedRows: number;
  displayRows: SelectItem[];
  scheduleId: number;
  dataJson: any = [];
  fromGrid: string;
  newScheudleData: any;


  constructor(private onlineChecklistService: OnlineChecklistService, private router: Router,
    private assignmentServiceService: AssignmentServiceService,
    private confirmationService: ConfirmationService, private assignedChecklistService: AssignedChecklistService,
    private location: Location, private route: ActivatedRoute, private messageService: MessageService,
    private checklistScheduleService: ChecklistScheduleService, private newEditScheduleService: NewEditScheduleService) {

    this.home = { icon: 'fa fa-home' };

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fromGrid = params['fromGrid'];
      this.param = this.fromGrid;
      console.log('Value of fromGrid', this.fromGrid);
      console.log('Value of fromGrid', this.param);
    });
    this.fetchValues();
    this.getAssignmentData();
    this.breadcrumb();
    /** Code for column header based on read or Edit mode
        Edit mode has button to modify the data and view mode will only display the data **/
    if (this.param === 'New Schedule' || this.param === 'Edit Assignment' || this.param === 'Scheduled') {
      this.colHeader = [
        { field: 'employeeFullName', header: 'Employee', width: '24%' },
        { field: 'managerFullName', header: 'Reviewer', width: '24%' },
        { field: 'backupManagerFullName', header: 'Backup Reviewer', width: '23%' },
        { field: 'checklistEdit', header: 'Edit', width: '15%' },
        { field: 'checklistDelete', header: 'Delete', width: '12%' }
      ];
      this.value = true;
    } else if (this.param === 'In Progress' || this.param === 'Closed' || this.param === 'Complete') {
      this.colHeader = [
        { field: 'employeeFullName', header: 'Employee', width: '33%' },
        { field: 'managerFullName', header: 'Reviewer', width: '33%' },
        { field: 'backupManagerFullName', header: 'Backup Reviewer', width: '34%' }
      ];
      this.value = false;
    }
  }
  /** to generate dynamic values in breadcrumb. */
  breadcrumb() {
    if (this.param === 'New Schedule' || this.param === 'Edit Assignment') {
      this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Schedule Checklist', routerLink: ['/' + routerConstants.scheduleChecklist] },
      { label: 'Checklist Schedule', routerLink: ['/' + routerConstants.checklistScheduled] },
      { label: 'Employee Assignments' }
      ];
    } else {
      this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Search Online Checklists', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
      { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
      { label: 'Employee Assignments' }
      ];
    }
  }
  getAssignmentData() {
    this.assignmentServiceService.getAssignmentDetail(this.scheduleId).subscribe(
      (data) => {
        this.results = data;
      });
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }
  /** to fetch values in grid by calling services based on the screen from which it enters */
  fetchValues() {
    if (this.fromGrid === 'grid') {
      this.displayData = this.onlineChecklistService.getRowData();
      console.log(this.displayData['status']);
      this.checklistName = this.displayData['checklistName'];
      this.checklistSchedule = this.displayData['subTitle'];
      this.scheduleId = this.displayData['checklistScheduleID'];
      this.param = this.displayData['status'];
      /** value of status is NULL in schedule grid JSON setting param to Schdeuled to open assignment
       * button in edit mode.
      */
      if ( this.param === null) {
        this.param = 'Scheduled';
      }
    } else if (this.param === 'Edit Assignment') {
      console.log('Inside fetchvalue edit assignment');
      this.displayData = this.checklistScheduleService.getDataForAssignments();
      console.log(this.displayData);
      this.checklistName = this.checklistScheduleService.getChecklistByName();
      // this.checklistName = this.displayData['checklistName'];

      this.checklistSchedule = this.displayData['subTitle'];
      this.scheduleId = this.displayData['checklistScheduleID'];
      this.param = this.fromGrid;

    } else {
      // this.checklistName = this.checklistScheduleService.getChecklistByName();
      this.displayData = this.newEditScheduleService.getJsonAssignment();
      console.log('new schedule', this.displayData);
      this.checklistName = this.displayData['checklistName'];
      this.checklistSchedule = this.displayData['subTitle'];
      this.scheduleId = this.displayData['checklistScheduleID'];
      this.param = this.fromGrid;
    }
  }
  /*
  *modify manager assignment
  */
  navigateModifyManager(rowData) {
    this.modifyManagerData = {
      'checklistScheduleId': rowData['checklistScheduleID'],
      'employeeLoginId': rowData['employeeLoginId'],
      'managerLoginId': rowData['managerLoginId'],
      'backupManagerLoginId': rowData['backupManagerLoginId']

    };

    console.log(this.modifyManagerData, ' in assignment');
    this.displayDialog = true;
    this.screenName = 'modify';
    this.dialogHeader = 'Edit Reviewer Assignments';
  }
  /*
     *Add manager assignment
     */
  addNewAssignment() {
    this.addAssignmentDialog = true;
    this.dialogHeader = 'Add New Assignment';
    this.screenName = 'add';
  }
  /*
  *This method is used to add new checklist manager
  */
  addNewChecklistManager() {
    this.addNewChecklistManagerDialog = true;
    this.dialogHeader = 'Add New Checklist Reviewer(s)';
  }

  /*
   *Refresh dialog
   */
  refresh(event) {
    this.fetchValues();
    this.getAssignmentData();
    this.displayDialog = event;
    this.addAssignmentDialog = event;
    this.addNewChecklistManagerDialog = event;
  }

  /*
   *To call the delete assignment
   service to delete an assignment
   */
  deleteAssignments(checklistId, employeeId) {
    this.dataJson = {
      'checklistScheduleId': checklistId,
      'employeeLoginId': employeeId

    };
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Delete',
      icon: 'fa fa-trash',
      accept: () => {
        this.assignedChecklistService.deleteAssignments(this.dataJson).subscribe(data => {
          this.assignmentServiceService.getAssignmentDetail(this.scheduleId).subscribe(
            (griddata) => {
              this.results = griddata;
            });
          this.msgs = [{ severity: 'success', detail: 'Record Deleted Successfully' }];
        }, error => {
          this.msgs = [{ severity: 'error', detail: 'Cannot delete an assignment' }];
        });
      },
      // reject: () => {
      //   this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      // }
    });
  }
  done() {
    if (this.param === 'New Schedule') {
      this.router.navigate([routerConstants.checklistScheduled]);
    } else {
      this.location.back();
    }
  }

}
