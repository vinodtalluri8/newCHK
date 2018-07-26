import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Message } from 'primeng/components/common/api';
import { OnlineChecklistService } from '../services/online-checklist.service';

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

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService) {
    this.home = { icon: 'fa fa-home' };
    this.disabled = true;
    this.breadcrumbs();
    this.issue = [
      { label: 'No', value: 'No' },
      { label: 'Yes', value: 'Yes' }];
    this.escalation = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];
    this.evidence = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];
    this.status = [{ label: 'All', value: 'A' },
    { label: 'In Progress', value: 'In Progress' },
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
    }
    this.viewUpdateControl();
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
    this.icm = this.viewUpdateRecord['gridItem'] ? this.viewUpdateRecord['gridItem'] : '';
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
    this.location.back();
  }

  /*Method for breadcrumbs*/
  breadcrumbs() {
    this.itemsPath = [{ label: 'Checklists' },
    { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
    { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
    { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls] },
    { label: 'View Controls' }];
  }

  /*
   *To add and delete attachment
   */
  addAttachments() {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Implementation Pending', detail: 'Yet to be Implemented' });
  }
}
