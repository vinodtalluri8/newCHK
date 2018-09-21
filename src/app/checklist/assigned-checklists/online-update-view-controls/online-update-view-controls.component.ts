import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Message } from 'primeng/components/common/api';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { appConstants } from '../../../core/constants/appConstants';

@Component({
  selector: 'app-online-update-view-controls',
  templateUrl: './online-update-view-controls.component.html',
  styleUrls: ['./online-update-view-controls.component.css']
})
export class OnlineUpdateViewControlsComponent implements OnInit {
  scheduleTitle: string;
  controlTitle: string;
  checklistName: string;
  home: MenuItem;
  itemsPath: MenuItem[];
  checklistInstanceId: number;
  displayOrder: number;
  taskId: number;

  icm: string;
  description: string;
  procedure: string;
  issue: any;
  escalation: any;
  status: any;
  evidence: any;
  comments: string;


  selectedIssue: string;
  selectedEscalation: string;
  selectedStatus: string;
  selectedEvidence: string;

  msgs: Message[] = [];
  fetchControlData: any;
  viewUpdateRecord: any;
  onlineControlJson: any;
  disabled: boolean;
  procedureLink: string;
  procedureTitle: string;
  onlineAttachmentJson: any;
  isView: boolean;
  issueDisabled: boolean;
  escalationDisabled: boolean;
  statusDisabled: boolean;
  commentsDisabled: boolean;
  header: string;
  dataJson: any;
  savedRecord;
  isUpdate: boolean;
  routePath: string;

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.home = { icon: 'fa fa-home' };
    this.route.params.subscribe(params => {
      this.routePath = params['routePath'];
    });
    this.issue = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];
    this.escalation = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];
    this.evidence = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];
    this.status = [{ label: 'In Progress', value: 'In Progress' },
    { label: 'Complete', value: 'Complete' }];
  }

  ngOnInit() {
    /*Fetch Control Data*/
    this.fetchControlData = this.onlineChecklistService.getControlJson();
    if (this.fetchControlData != null) {
      this.checklistInstanceId = this.fetchControlData['checklistInstanceID'];
      this.displayOrder = this.fetchControlData['displayOrder'];
      this.checklistName = this.fetchControlData['checklistName'];
      this.scheduleTitle = this.fetchControlData['scheduleTitle'];
      this.controlTitle = this.fetchControlData['controlTitle'];
      this.taskId = this.fetchControlData['taskId'];
      this.procedureLink = this.fetchControlData['link'];
      this.procedureTitle = this.fetchControlData['docTitle'];
      this.isUpdate = this.fetchControlData['isUpdate'];
      this.isView = this.fetchControlData['isView'];
    }
    this.viewUpdateControl();
    this.isUpdateView();
    this.breadcrumbs();
  }

  /*Method for View Update Control */
  viewUpdateControl() {
    this.onlineControlJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'taskId': this.taskId,
      'displayOrder': this.displayOrder,
    };
    this.onlineChecklistService.fetchUpdateViewOnlineCheckLists(this.onlineControlJson)
      .subscribe(data => {
        this.viewUpdateRecord = data[0];
        this.populateviewUpdateData();
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot View or Update Control', detail: error }];
      });
  }
  /*Method for populate View Update Control */
  populateviewUpdateData() {
    this.icm = this.viewUpdateRecord['gridItem'] === 'Y' ? 'Yes' : 'No';
    this.description = this.viewUpdateRecord['description'] ? this.viewUpdateRecord['description'] : '';
    this.selectedStatus = this.viewUpdateRecord['status'] ? this.viewUpdateRecord['status'] : '';
    this.selectedIssue = this.viewUpdateRecord['flagFollowUp'] ? this.viewUpdateRecord['flagFollowUp'] : '';
    this.selectedEscalation = this.viewUpdateRecord['flagEscalate'] ? this.viewUpdateRecord['flagEscalate'] : '';
    this.selectedEvidence = this.viewUpdateRecord['evidenceRequired'] ? this.viewUpdateRecord['evidenceRequired'] : '';
    this.comments = this.viewUpdateRecord['comment'] ? this.viewUpdateRecord['comment'] : '';
    this.procedure = this.viewUpdateRecord['docTitle'] ? this.viewUpdateRecord['docTitle'] : '';
  }
  /** This method will navigate back to search online results **/
  back() {
    this.router.navigate([routerConstants.searchonlinechecklistControls, this.routePath]);
  }

  /*Method for breadcrumbs*/
  breadcrumbs() {
    if (this.routePath !== 'myonline') {
    if ((this.routePath = 'searchonline') || this.isView) {
      if (this.isView) {
        this.itemsPath = [{ label: 'Checklists' },
        { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
        { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
        { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath] },
        { label: 'View Controls' }];
      } else {
        this.itemsPath = [{ label: 'Checklists' },
        { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
        { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
        { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath ]},
        { label: 'Update Controls' }];
      }
    }
  }
    if (this.routePath !== 'searchonline') {
    if ((this.routePath = 'myonline') || this.isUpdate) {
        if (this.isUpdate) {
        this.itemsPath = [{ label: 'My Assigned Checklists', routerLink: ['/' + routerConstants.defaultRoute] },
        { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath ] },
        { label: 'Update Controls' }];
        } else {
          this.itemsPath = [
            { label: 'My Assigned Checklists', routerLink: ['/' + routerConstants.defaultRoute] },
            { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath ] },
            { label: 'View Controls' }];
        }
      }
    }
  }

  /*
   *To add and delete attachment
   */
  addAttachments() {
    this.onlineAttachmentJson = {
      'checklistInstanceID': this.checklistInstanceId,
      'scheduleTitle': this.scheduleTitle,
      'checklistName': this.checklistName,
      'displayOrder': this.displayOrder,
      'taskId': this.taskId,
      'controlTitle': this.controlTitle,
      'docTitle': this.procedure,
      'isUpdate': this.isUpdate,
      'isView': this.isView
    };
    this.onlineChecklistService.setAttachmentJson(this.onlineAttachmentJson);
    this.router.navigate([routerConstants.attachments, this.routePath]);
  }
  /*
   *To check update or view
   */
  isUpdateView() {
    if (!this.isUpdate) {
      this.header = 'View Control';
      this.disabled = true;
      this.issueDisabled = true;
      this.escalationDisabled = true;
      this.statusDisabled = true;
      this.commentsDisabled = true;
    }
    if (this.isUpdate) {
      this.header = 'Update Control';
      this.disabled = true;
      this.issueDisabled = false;
      this.escalationDisabled = false;
      this.statusDisabled = false;
      this.commentsDisabled = false;
    }
  }
  /** To check fields modified or not  **/
  isModified() {
    if (this.comments === this.viewUpdateRecord['comment']
      && this.selectedEscalation === this.viewUpdateRecord['flagEscalate']
      && this.selectedStatus === this.viewUpdateRecord['status']
      && this.selectedIssue === this.viewUpdateRecord['flagFollowUp']) {
      return false;
    } else {
      return true;
    }
  }
  /*
   *Method to update control
   */
  updateControl() {
    this.msgs = [];
    if (this.isModified()) {
      this.dataJson = {
        'checklistInstanceId': this.checklistInstanceId,
        'taskId': this.taskId,
        'flagFollowUp': this.selectedIssue,
        'flagEscalate': this.selectedEscalation,
        'displayOrder': this.displayOrder,
        'status': this.selectedStatus,
        'loginId': appConstants.loginId,
        'comment': this.comments.trim()
      };
      this.onlineChecklistService.updateChecklistControl(this.dataJson).subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
        this.back();
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot View or Update Control', detail: error }];
      });
    }
  }
}
