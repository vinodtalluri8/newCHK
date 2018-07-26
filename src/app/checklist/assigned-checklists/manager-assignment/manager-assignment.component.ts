import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssignedChecklistService } from '../services/assigned-checklist.service';
import { MessageService } from '../../services/message.service';
// import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-manager-assignment',
  templateUrl: './manager-assignment.component.html',
  styleUrls: ['./manager-assignment.component.css']
})
export class ManagerAssignmentComponent implements OnInit {

  managerAssignmentForm: FormGroup;
  employee: SelectItem[];
  manager: SelectItem[];
  selectedManager: string;
  selectedBackupManager: string;
  selectedEmployee: string;
  backupManager: SelectItem[];
  dataJson: any;
  savedRecord;
  msgs: Message[] = [];
  disabled: boolean;
  status: any;
  checkModifyDisable: boolean;

  @Output() closeAddAssignment = new EventEmitter();
  @Output() closeModifyAssignment = new EventEmitter();
  @Input() childChecklistName: string;
  @Input() childScheduleName: string;
  @Input() childChecklistId: string;
  @Input() screenName: string;
  @Input() modifyManagerData;

  constructor(private router: Router, private location: Location, private messageService: MessageService,
    private assignedChecklist: AssignedChecklistService) {

    this.managerAssignmentForm = new FormGroup({
      manager: new FormControl(''),
      backupManager: new FormControl(''),
      employee: new FormControl('')
    });

  }
  /** To Initialize and call the
* preloaddata method to get
*  the drop down values OnInit  */

  ngOnInit() {
    this.preloadData();
    if (this.screenName === 'modify') {
      this.selectedBackupManager = this.modifyManagerData['backupManagerLoginId'];
      this.selectedManager = this.modifyManagerData['managerLoginId'];
      this.selectedEmployee = this.modifyManagerData['employeeLoginId'];
      this.disabled = true;

    }

  }

  preloadData() {
    this.assignedChecklist.getManager().subscribe(data => {
      this.manager = data;
      this.backupManager = data;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
    this.assignedChecklist.getEmployee().subscribe(data => {
      this.employee = data;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });


  }
  /** This method will navigate back to keycontrol screen **/
  back() {
    this.resetAll();
    this.closeModifyAssignment.emit(false);
    this.managerAssignmentForm.reset();
  }

  /** This method will reset all values to default **/
  resetAll() {
    if (this.screenName === 'add') {
      this.selectedEmployee = '';
      this.selectedManager = '';
      this.selectedBackupManager = '';
    } else if (this.screenName === 'modify') {
      this.selectedManager = this.modifyManagerData['managerLoginId'];
      this.selectedBackupManager = this.modifyManagerData['backupManagerLoginId'];
      this.selectedEmployee = this.modifyManagerData['employeeLoginId'];
      this.disabled = true;
    }
  }
  /* This method will check the status (active/ inactive) for the manager  */
  checkActiveManager(event, selection) {
    if (selection === 'manager') {
      this.selectedManager = event;
      if (this.screenName === 'modify') {
        this.assignedChecklist.checkManagerActive(this.selectedManager).subscribe(data => {
          this.status = data;
          if (this.status['status'] === 'InActive') {
            this.checkModifyDisable = true;
            this.msgs.push({ severity: 'error', detail: 'Selected Manager is not Active. Please choose an active Manager.' });
            // this.selectedManager = this.modifyManagerData['managerLoginId'];
          } else {
            this.checkModifyDisable = false;
          }
        }, error => {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
        });
      }
    } else if (selection === 'backupManager') {
      this.selectedBackupManager = event;
      if (this.screenName === 'modify') {
        this.assignedChecklist.checkManagerActive(this.selectedBackupManager).subscribe(data => {
          this.status = data;
          if (this.status['status'] === 'InActive') {
            this.checkModifyDisable = true;
            this.msgs.push({ severity: 'error', detail: 'Selected Backup Manager is not Active. Please choose an active Backup Manager.' });
            // this.selectedBackupManager = this.modifyManagerData['backupManagerLoginId'];
          } else {
            this.checkModifyDisable = false;
          }

        }, error => {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
        });
      }
    }
  }

  /** This method is used to  disable the save button */
  disable() {
    if (this.screenName === 'add') {
      if (!this.selectedEmployee || !this.selectedManager || !this.selectedBackupManager) {
        return true;
      } else {
        return false;
      }
    } else if (this.screenName === 'modify') {
      if (this.selectedManager === this.modifyManagerData['managerLoginId'] &&
        this.selectedBackupManager === this.modifyManagerData['backupManagerLoginId'] ||
        !this.selectedEmployee || this.checkModifyDisable) {
        return true;
      } else {
        return false;
      }
    }
  }
  /** To call services and pass the
   * data to the service to save the
   * modified manager data */
  modifyManagerAssignment() {
    this.msgs = [];
    if (!this.disable()) {
      if ( this.selectedManager === this.selectedBackupManager && this.selectedEmployee === this.selectedBackupManager
      && this.selectedEmployee === this.selectedManager) {
        this.msgs.push({ severity: 'error', detail: 'Employee , Manager and Backup Manager cannot be same'});
      } else if (this.selectedEmployee === this.selectedManager  ) {
        this.msgs.push({ severity: 'error', detail: 'Employee and  Manager cannot be same'});
      } else if (this.selectedEmployee === this.selectedBackupManager) {
        this.msgs.push({ severity: 'error', detail: 'Employee and Backup Manager cannot be same'});
      } else if (this.selectedManager === this.selectedBackupManager) {
        this.msgs.push({ severity: 'error', detail: 'Manager and Backup Manager cannot be same'});
       } else {
        this.dataJson = {
          'managerLoginId': this.selectedManager,
          'employeeLoginId': this.selectedEmployee,
          'backupManagerLoginId': this.selectedBackupManager,
          'checklistScheduleId': this.childChecklistId
        };
        if (this.screenName === 'add') {
          this.assignedChecklist.addManagerAssignment(this.dataJson).subscribe(data => {
            this.savedRecord = data;
            this.messageService.clearMessage();
            this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
            this.back();
          }, error => {
            this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
          });

        } else if (this.screenName === 'modify') {

          this.assignedChecklist.modifyManagerAssignment(this.dataJson).subscribe(data => {
            this.savedRecord = data;
            this.messageService.clearMessage();
            this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
            this.back();
            this.closeModifyAssignment.emit(false);
          }, error => {
            this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
          });
        }
      }
    }
  }

}
