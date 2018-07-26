import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Location } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { ChecklistScheduleService } from '../services/checklist-schedule.service';
import { NewEditScheduleService } from '../services/new-edit-schedule.service';

@Component({
  selector: 'app-new-checklist-schedule',
  templateUrl: './new-checklist-schedule.component.html',
  styleUrls: ['./new-checklist-schedule.component.css']
})
export class NewChecklistScheduleComponent implements OnInit {

  jsonAssignment: any;
  checklistId: number;
  checklistScheduleID: number;
  isUpdate: boolean;
  scheduleHeader: string;
  updateRecord: any;
  savedRecord: any;
  saved: boolean;
  disabled: boolean;

  dataJson: any;
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  routePath: string;
  newChecklistScheduleData: any;
  modifiedChecklistScheduleData: any;

  schedule: string;
  relativeStartDay: string;
  requiredCompletionLength: SelectItem[];
  selectedRequiredCompletionLength: string;
  completionHoursFormat: SelectItem[];
  selectedcompletionHoursFormat: string;
  completionLength: string;
  format: string;
  autoClose: SelectItem[];
  selectedAutoClose: string;
  emailWarningTime: SelectItem[];
  selectedEmailWarningTime: string;
  emailHoursFormat: SelectItem[];
  selectedEmailHoursFormat: string;
  reviewedByManager: SelectItem[];
  selectedReviewedByManager: string;
  activeDate: Date;
  active: SelectItem[];
  selectedActive: string;

  public fromGrid: any;
  public selectedName: string;
  public selectedFrequency: string;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService,
    private checklistScheduleService: ChecklistScheduleService, private newEditScheduleService: NewEditScheduleService,
    private location: Location) {
    this.route.params.subscribe(params => {
      this.routePath = params['routePath'];
    });
    this.home = { icon: 'fa fa-home' };
    /** Initilase the breadcrumbs navigation data **/
    this.isUpdate = false;

    this.requiredCompletionLength = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
      { label: '11', value: '11' },
      { label: '12', value: '12' },
    ];

    /** Filling the dropdown of HoursFormat  */
    this.completionHoursFormat = [
      { label: 'AM', value: 'AM' },
      { label: 'PM', value: 'PM' }
    ];

    /** Filling the dropdown of autoClose and reviewedByManager */
    this.autoClose = [
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' }
    ];
    this.reviewedByManager = this.autoClose;
    this.active = this.autoClose;
    this.emailHoursFormat = this.completionHoursFormat;
    this.emailWarningTime = this.requiredCompletionLength;
    this.disabled = true;
  }

  ngOnInit() {
    this.fromGrid = 'New Schedule';
    this.preloadData();
    console.log('isUpdate', this.isUpdate);
    this.selectedName = this.checklistScheduleService.getChecklistByName();
    this.selectedFrequency = this.checklistScheduleService.getChecklistByFrequency();
    this.checklistId = this.checklistScheduleService.getChecklistById();
    this.route.params.subscribe(params => {
      this.scheduleHeader = 'New Checklist Schedule';
      this.checklistScheduleID = params['checklistScheduleID'];
      // this.checklistScheduleID = this.checklistScheduleService.getChecklistByScheduleID();
      console.log('this.checklistScheduleID', this.checklistScheduleID);
      this.routePath = params['routePath'];
      if (this.checklistScheduleID > 0) {
        this.isUpdate = true;
        this.scheduleHeader = 'Modify Checklist Schedule';
        console.log('inside modify data');
        this.newEditScheduleService.toModifyChecklistSchedule(this.checklistScheduleID).subscribe(data => {
          this.updateRecord = data;
          this.populateData();
          // this.breadcrumbs();
          console.log('after calling modified service in ts', this.updateRecord);
        });
      }
    });
        this.breadcrumbs();
    if (!this.isUpdate && this.selectedFrequency === 'Daily') {
      this.selectedRequiredCompletionLength = '11';
    }
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }

  /** This method will load the default values on new schedule screen **/
  preloadData() {

    if (!this.isUpdate) {
      this.format = 'Days';
      this.selectedEmailWarningTime = '9';
      this.selectedcompletionHoursFormat = 'PM';
      this.selectedEmailHoursFormat = 'PM';
      this.selectedAutoClose = 'N';
      this.selectedReviewedByManager = 'N';
    }
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.schedule = '';
    this.relativeStartDay = '';
    this.completionLength = '';
    this.format = 'Days';
    this.selectedEmailWarningTime = '9';
    this.selectedcompletionHoursFormat = 'PM';
    this.selectedEmailHoursFormat = 'PM';
    this.selectedAutoClose = 'N';
    this.selectedReviewedByManager = 'N';
    if (this.selectedFrequency === 'Daily') {
      this.selectedRequiredCompletionLength = '11';
    }
  }

  breadcrumbs() {
    if (this.routePath === 'scheduleResults') {
      if (!this.isUpdate) {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Schedule Checklist', routerLink: ['/' + routerConstants.scheduleChecklist] },
        { label: 'New Checklist Schedule' }
        ];
      } else {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Schedule Checklist', routerLink: ['/' + routerConstants.scheduleChecklist] },
        { label: 'Modify Checklist Schedule' }
        ];
      }
    }
    if (this.routePath === 'scheduledGrid') {
      if (!this.isUpdate) {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Schedule Checklist', routerLink: ['/' + routerConstants.scheduleChecklist] },
        { label: 'Checklist Schedule', routerLink: ['/' + routerConstants.checklistScheduled] },
        { label: 'New Checklist Schedule' }
        ];
      } else {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Schedule Checklist', routerLink: ['/' + routerConstants.scheduleChecklist] },
        { label: 'Checklist Schedule', routerLink: ['/' + routerConstants.checklistScheduled] },
        { label: 'Modify Checklist Schedule' }
        ];
      }
    }

    if (this.routePath === 'searchOnlineResults' && this.isUpdate) {
      this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Search Online Checklist', routerLink: [routerConstants.searchOnlineChecklistt] },
      { label: 'Search Results', routerLink: [routerConstants.searchonlinechecklistResult] },
      { label: 'Modify Checklist Schedule' }
      ];
    }
  }

  /** This method will save the data from new schedule screen to the backend **/
  createNewSchedule() {
    // this.msgs = [{ severity: 'info', summary: 'Implemention Pending',
    // detail: 'Add Schedule and Specify Assignments yet to be implemented' }];
    if (!this.disable()) {
      if (this.selectedFrequency === 'Daily') {
        this.dataJson = {
          'checklistID': this.checklistId,
          'subTitle': this.schedule,
          'reqCompletionHour': this.selectedRequiredCompletionLength,
          'codeReqCompAmPmInd': this.selectedcompletionHoursFormat,
          'emailAlertHour': this.selectedEmailWarningTime,
          'emailAlertAmPmInd': this.selectedEmailHoursFormat,
          'startDate': this.activeDate,
          'autoClose': this.selectedAutoClose,
          'managerReview': this.selectedReviewedByManager
        };
      } else {
        this.dataJson = {
         'checklistID': this.checklistId,
         'subTitle': this.schedule,
         'reqCompletionLength': this.completionLength,
         'codeReqCompLengthInd': this.format,
         'emailAlertHour': this.selectedEmailWarningTime,
         'emailAlertAmPmInd': this.selectedEmailHoursFormat,
         'startDate': this.activeDate,
         'autoClose': this.selectedAutoClose,
         'managerReview': this.selectedReviewedByManager,
         'startDay': this.relativeStartDay
      };
    }
      // check whether you require this!
      // this.newEditScheduleService.setResultScheduleCriteria(this.dataJson);
      console.log('inside create new schedule method');
      this.newEditScheduleService.setScheduleByName(this.schedule);
      this.newEditScheduleService.newChecklistSchedule(this.dataJson).subscribe(data => {
        this.newChecklistScheduleData = data;
        console.log('after service is called and correcponding data', this.newChecklistScheduleData.checklistScheduleID);
        this.messageService.clearMessage();
        this.messageService.sendMessage({ severity: 'success', detail: 'Record Added Successfully' });
        this.jsonAssignment = {
          'checklistID': this.checklistId,
          'checklistName': this.selectedName,
          'subTitle': this.schedule,
          'checklistScheduleID': this.newChecklistScheduleData.checklistScheduleID,
          'screenName': 'add'
        };
        console.log(this.jsonAssignment);
        this.newEditScheduleService.setJsonAssignment(this.jsonAssignment);
        this.resetAll();
        //  then route to assignments page (pending)
        this.router.navigate([routerConstants.onlineChecklistAssignment, this.fromGrid]);
        console.log('routing to next page');
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error.message }];
      });
    }
  }

  // validateTime() {
  //   if (this.selectedEmailHoursFormat === 'AM' && this.selectedcompletionHoursFormat === 'AM' &&
  //   +(this.selectedEmailWarningTime) <= +(this.selectedRequiredCompletionLength)) {
  //     return true;
  //   } else if (this.selectedEmailHoursFormat === 'AM' && this.selectedcompletionHoursFormat === 'PM' ) {
  //     return true;
  //   } else if (this.selectedEmailHoursFormat === 'PM' && this.selectedcompletionHoursFormat === 'PM' &&
  //   +(this.selectedEmailWarningTime) <= +(this.selectedRequiredCompletionLength)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  /** This method will enable or disable the Save button based on the mandatory fields selected
   *  || !this.validateTime() in dialy **/
  disable() {
    if (this.selectedFrequency === 'Daily') {
      if (!this.schedule || this.schedule.trim().length === 0) {
        return true;
      } else if (this.isUpdate) {
        return !this.isModified();
      } else {
        return false;
      }
    } else {
      if (!this.schedule || this.schedule.trim().length === 0 || !this.relativeStartDay ||
         !this.completionLength ) {
        return true;
      } else if (this.isUpdate) {
        return !this.isModified();
      } else {
        return false;
      }
    }
  }// this.relativeStartDay.trim().length === 0 || ||        this.completionLength.trim().length === 0

  populateData() {
    console.log('inside populateData method');

    this.schedule = this.updateRecord['subTitle'] ? this.updateRecord['subTitle'] : '';
    this.selectedRequiredCompletionLength = this.updateRecord['reqCompletionHour'] ?
      this.updateRecord['reqCompletionHour'] : '';
    this.selectedcompletionHoursFormat = this.updateRecord['codeReqCompAmPmInd'] ?
      this.updateRecord['codeReqCompAmPmInd'] : '';
    this.selectedEmailWarningTime = this.updateRecord['emailAlertHour'] ? this.updateRecord['emailAlertHour'] : '';
    this.selectedEmailHoursFormat = this.updateRecord['emailAlertAmPmInd'] ? this.updateRecord['emailAlertAmPmInd'] : '';
    this.activeDate = this.updateRecord['startDate'] ? this.updateRecord['startDate'] : '';
    this.selectedReviewedByManager = this.updateRecord['managerReview'] ? this.updateRecord['managerReview'] : '';
    this.selectedAutoClose = this.updateRecord['autoClose'] ? this.updateRecord['autoClose'] : '';
    this.format = this.updateRecord['codeReqCompLengthInd'] ? this.updateRecord['codeReqCompLengthInd'] : '';
    this.completionLength = this.updateRecord['reqCompletionLength'] ? this.updateRecord['reqCompletionLength'] : '';
    this.relativeStartDay = this.updateRecord['startDay'] ? this.updateRecord['startDay'] : '';
    this.selectedActive = this.updateRecord['flagActive'] ? this.updateRecord['flagActive'] : '';
  }

  /** To check fields modified or not  **/
  isModified() {
    if (this.selectedFrequency === 'Daily') {
      if (this.schedule === this.updateRecord['subTitle']
        && this.selectedRequiredCompletionLength === this.updateRecord['reqCompletionHour']
        && this.selectedcompletionHoursFormat === this.updateRecord['codeReqCompAmPmInd']
        && this.selectedEmailWarningTime === this.updateRecord['emailAlertHour']
        && this.selectedEmailHoursFormat === this.updateRecord['emailAlertAmPmInd']
        && this.activeDate === this.updateRecord['startDate']
        && this.selectedAutoClose === this.updateRecord['autoClose']
        && this.selectedReviewedByManager === this.updateRecord['managerReview']) {
        return false;
      } else {
        return true;
      }
    } else {
      if (this.schedule === this.updateRecord['subTitle']
        && this.format === this.updateRecord['codeReqCompLengthInd']
        && this.completionLength === this.updateRecord['reqCompletionLength']
        && this.relativeStartDay === this.updateRecord['startDay']
        && this.selectedEmailWarningTime === this.updateRecord['emailAlertHour']
        && this.selectedEmailHoursFormat === this.updateRecord['emailAlertAmPmInd']
        && this.activeDate === this.updateRecord['startDate']
        && this.selectedAutoClose === this.updateRecord['autoClose']
        && this.selectedReviewedByManager === this.updateRecord['managerReview']
        && this.selectedActive === this.updateRecord['flagActive']) {
        return false;
      } else {
        return true;
      }
    }
  }

  /** This method will navigate back to checklist main screen **/
  back() {
    this.location.back();
  }

  /** This method will take the modified data from modify schedule screen to the backend **/
  modifySchedule() {
    // this.msgs = [];
    // this.msgs = [{ severity: 'info', summary: 'Implemention Pending',
    //  detail: 'modify schedule yet to be implemented' }];
    if (!this.disable()) {
      if (this.selectedFrequency === 'Daily') {
        this.dataJson = {
          'checklistID': this.checklistId,
          'checklistScheduleID': this.checklistScheduleID,
          'subTitle': this.schedule,
          'reqCompletionHour': this.selectedRequiredCompletionLength,
          'codeReqCompAmPmInd': this.selectedcompletionHoursFormat,
          'emailAlertHour': this.selectedEmailWarningTime,
          'emailAlertAmPmInd': this.selectedEmailHoursFormat,
          'startDate': this.activeDate,
          'autoClose': this.selectedAutoClose,
          'managerReview': this.selectedReviewedByManager
        };
      } else {
        this.dataJson = {
          'checklistID': this.checklistId,
          'checklistScheduleID': this.checklistScheduleID,
          'subTitle': this.schedule,
          'reqCompletionLength': this.completionLength,
          'codeReqCompLengthInd': this.format,
          'emailAlertHour': this.selectedEmailWarningTime,
          'emailAlertAmPmInd': this.selectedEmailHoursFormat,
          'startDate': this.activeDate,
          'autoClose': this.selectedAutoClose,
          'managerReview': this.selectedReviewedByManager,
          'startDay': this.relativeStartDay,
          'flagActive': this.selectedActive
        };
      }
    }
    console.log('data json for update schedule', this.dataJson);
    this.newEditScheduleService.updateChecklistSchedule(this.dataJson).subscribe(data => {
      this.modifiedChecklistScheduleData = data;
      console.log('after update schedule', this.modifiedChecklistScheduleData);
      this.messageService.clearMessage();
      this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
      this.resetAll();
      this.back();
      // route to whatever page you should go.

    }, error => {
      this.msgs = [{ severity: 'error', detail: 'Cannot modify this schedule' }];
    });
  }

}
