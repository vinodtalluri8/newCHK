import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Message, SelectItem } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { appConstants } from '../../../core/constants/appConstants';

@Component({
  selector: 'app-update-checklist-status',
  templateUrl: './update-checklist-status.component.html',
  styleUrls: ['./update-checklist-status.component.css']
})
export class UpdateChecklistStatusComponent implements OnInit {

  updateStatusForm: FormGroup;
  header: string;
  savedRecord: any;
  dataJson: any;
  checklistInstanceId: number;
  checklistInstanceIdR: number;
  disabled: boolean;

  checklistControlData: any;
  reviewChecklistData: any;
  msgs: Message[] = [];
  status: SelectItem[];
  selectedStatus: string;
  additionalComments: string;
  employeeLoginId: string;
  screenName: string;
  isReview: string;
  reviewJson: any;
  routePath: string;
  page: string;

  @Output() closeUpdateStatus = new EventEmitter();
  @Input() childChecklistName: string;
  @Input() frequency: string;
  @Input() startDate: string;
  @Input() reviewCheck: string;

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.preloadData();
    this.disabled = true;
    if (this.isReview === 'review') {
      this.header = 'Review Checklist';
      this.status = [
        { label: 'Manager Review', value: 'Manager Review' },
        { label: 'Employee Follow-up', value: 'Employee Follow-up' },
        { label: 'Complete', value: 'Complete' }];
      this.selectedStatus = 'Manager Review';
    }
    if (this.isReview !== 'review') {
      if (this.page === 'followup') {
      this.header = 'Update Checklist Status';
      this.status = [
        { label: 'Manager Review', value: 'Manager Review' },
        { label: 'Employee Follow-up', value: 'Employee Follow-up' }];
      this.selectedStatus = 'Employee Follow-up';
      } else {
      this.header = 'Update Checklist Status';
      this.status = [
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Complete', value: 'Complete' }];
      this.selectedStatus = 'In Progress';
    }
  }
    this.updateStatusForm = new FormGroup({
      status: new FormControl(''),
      additionalComments: new FormControl('')
    });
  }

  preloadData() {
    if (this.reviewCheck === 'reviewCheck') {
      this.reviewChecklistData = this.onlineChecklistService.getReviewStatusJson();
      this.checklistInstanceIdR = this.reviewChecklistData['checklistInstanceId'];
      this.isReview = this.reviewChecklistData['mode'];
    } else {
      this.checklistControlData = this.onlineChecklistService.getUpdateStatusJson();
      console.log(' this.checklistControlData 2:', this.checklistControlData);
      this.checklistInstanceId = this.checklistControlData['checklistInstanceId'];
      this.employeeLoginId = this.checklistControlData['employeeLoginId'];
      this.additionalComments = this.checklistControlData['comment'];
      this.selectedStatus = this.checklistControlData['status'];
      this.screenName = this.checklistControlData['screenName'];
      this.page = this.checklistControlData['page'];
    }
  }

  /** This method will navigate back to checklist control results **/
  back() {
    this.routePath = 'myonline';
    this.resetAll();
    console.log('in back');
    this.closeUpdateStatus.emit(false);
    this.updateStatusForm.reset();
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);

  }

  /** This method will reset all values to default **/
  resetAll() {
    // this.selectedStatus = 'In Progress',
    // this.additionalComments = '';
    if (this.reviewCheck === 'reviewCheck') {
      this.additionalComments = '';
      this.selectedStatus = 'Manager Review';
    } else {
      this.additionalComments = this.checklistControlData['comment'];
      this.selectedStatus = this.checklistControlData['status'];
    }
  }

  /** This method is used to  disable the save button */
  disable() {
    if (!this.selectedStatus || !this.additionalComments) {
      return true;
    } else {
      return false;
    }
  }

  /*This method will update the checklist status*/
  updateStatus() {
    this.msgs = [];
    this.dataJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'employeeLoginId': this.employeeLoginId,
      'status': this.selectedStatus,
      'comment': this.additionalComments,
    };

    console.log('inside final update method n json is 3', this.dataJson);
    this.onlineChecklistService.updateChecklistStatus(this.dataJson)
      .subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({
          severity: 'success',
          detail: 'Checklist Status Updated Successfully'
        });
        this.resetAll();
        this.location.back();
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot perform an Update for the Checklist', detail: error }];
      });


  }

  /*This method will review the checklist status*/
  updateReview() {
    this.msgs = [];
    this.reviewJson = {
      'checklistInstanceId': this.checklistInstanceIdR,
      'status': this.selectedStatus,
      'reviewComment': this.additionalComments,
      'loginId': appConstants.loginId
    };
    console.log('reviewJson', this.reviewJson);
    this.onlineChecklistService.reviewChecklist(this.reviewJson)
      .subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({
          severity: 'success',
          detail: 'Reviewed Checklist'
        });
        this.resetAll();
        this.location.back();
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot perform review for the Checklist', detail: error }];
      });

  }


}
