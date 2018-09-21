import { Component, OnInit } from '@angular/core';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerConstants } from '../../../core/constants/routerConstants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  fetchAttachmentData: any;
  checklistName: string;
  scheduleTitle: string;
  controlTitle: string;
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  colHeaders: any[];
  selectedRows: number;
  displayRows: SelectItem[];
  onlineAttachmentsResults: any;
  uploadedFiles: any[] = [];
  taskId: number;
  displayOrder: number;
  checklistInstanceId: number;
  fetchAttachmentJson: any;
  onlineControlJson: any;
  isView: boolean;
  procedure: string;
  isUpdate: boolean;
  routePath: string;
  deleteAttachmentsJson: any;
  addAttachmentJson: any;
  savedAttachment: any;
  attachedFile: any;
  attachedFileName: string;
  attachedFileLength: number;
  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private router: Router, private route: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    this.home = { icon: 'fa fa-home' };
    this.route.params.subscribe(params => {
      this.routePath = params['routePath'];
    });
    this.isPaginator = true;
    this.filterable = true;
    this.selectedRows = 15;

    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
  }

  ngOnInit() {
    /*Fetch Control Data*/
    this.fetchAttachmentData = this.onlineChecklistService.getAttachmentJson();
    if (this.fetchAttachmentData != null) {
      this.checklistName = this.fetchAttachmentData['checklistName'];
      this.scheduleTitle = this.fetchAttachmentData['scheduleTitle'];
      this.controlTitle = this.fetchAttachmentData['controlTitle'];
      this.displayOrder = this.fetchAttachmentData['displayOrder'];
      this.taskId = this.fetchAttachmentData['taskId'];
      this.checklistInstanceId = this.fetchAttachmentData['checklistInstanceID'];
      this.procedure = this.fetchAttachmentData['docTitle'];
      this.isUpdate = this.fetchAttachmentData['isUpdate'];
      this.isView = this.fetchAttachmentData['isView'];
    }
    this.getAttachments();
    if (this.isView || !this.isUpdate) {
      this.colHeaders = [
        { field: 'fileName', header: 'Document', width: '100%' }
      ];
    }
    if (this.isUpdate) {
      this.colHeaders = [
        { field: 'fileName', header: 'Document', width: '70%' },
        { field: 'delete', header: 'Delete', width: '30%' },
      ];
    }
    this.breadcrumbs();
  }


  /*Method for get attachments for control */
  getAttachments() {
    this.fetchAttachmentJson = {
      'checklistInstanceId':  this.checklistInstanceId,
      'taskId': this.taskId,
      'displayOrder': this.displayOrder
    };
    console.log('in attachments', this.fetchAttachmentJson);
    this.onlineChecklistService.fetchControlAttachments(this.fetchAttachmentJson)
      .subscribe(data => {
        this.onlineAttachmentsResults = data;
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot fetch attachments', detail: error }];
      });
      if (this.messageService.getMessage()) {
        this.msgs = [this.messageService.getMessage()];
        this.messageService.clearMessage();
      }
  }

  /** This method will navigate back to view/update control **/
  back() {
    this.location.back();
  }

  /*method for breadcrumbs*/
  breadcrumbs() {
    if (this.routePath !== 'myonline') {
    if ((this.routePath = 'searchonline') || this.isView) {
      if (this.isView) {
        this.itemsPath = [{ label: 'Checklists' },
        { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
        { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
        { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath] },
        { label: 'View Controls', routerLink: ['/' + routerConstants.viewUpdateOnlineControls, this.routePath] },
        { label: 'Attachments' }
        ];
      } else {
        this.itemsPath = [{ label: 'Checklists' },
        { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
        { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
        { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath] },
        { label: 'Update Controls', routerLink: ['/' + routerConstants.viewUpdateOnlineControls, this.routePath] },
        { label: 'Attachments' }
        ];
      }
    }
  }
    if (this.routePath !== 'searchonline') {
      if ((this.routePath = 'myonline') || this.isUpdate) {
        if (!this.isUpdate) {
          this.itemsPath = [{ label: 'My Assigned Checklists', routerLink: ['/' + routerConstants.defaultRoute] },
          { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath] },
          { label: 'View Controls', routerLink: ['/' + routerConstants.viewUpdateOnlineControls, this.routePath] },
          { label: 'Attachments' }
          ];
        } else {
          this.itemsPath = [{ label: 'My Assigned Checklists', routerLink: ['/' + routerConstants.defaultRoute] },
          { label: 'Checklist Controls', routerLink: ['/' + routerConstants.searchonlinechecklistControls, this.routePath] },
          { label: 'Update Controls', routerLink: ['/' + routerConstants.viewUpdateOnlineControls, this.routePath] },
          { label: 'Attachments' }
          ];
        }
      }
    }
  }

  /*
  *To enable or diable pagination
  */
  checkAndEnablePage(value: number) {
    if (this.onlineAttachmentsResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
  }

  /*
  *To upload attachments
  */
  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.addAttachmentJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'taskId': this.taskId,
      'displayOrder': this.displayOrder,
      'fileName': 'addfile31534.doc'
    };
    this.onlineChecklistService.addAttachments(this.addAttachmentJson)
    .subscribe(data => {
      this.savedAttachment = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({
          severity: 'success',
          detail: 'Uploaded Successfully'
        });
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Cannot add attachments', detail: error }];
    });
  }

  /*
  *Method to delete attachments
  */
  deleteAttachments(recordFilename) {
    this.deleteAttachmentsJson = {
      'checklistInstanceId': this.checklistInstanceId,
      'taskId': this.taskId,
      'displayOrder': this.displayOrder,
      'fileName': recordFilename
    };
    console.log(this.deleteAttachmentsJson, 'this.deleteAttachmentsJson');
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Delete',
      icon: 'fa fa-trash',
      accept: () => {
        this.onlineChecklistService.deleteAttachments(this.deleteAttachmentsJson).subscribe(data => {
          this.getAttachments();
          this.messageService.clearMessage();
          this.messageService.sendMessage({
            severity: 'success',
            detail: 'Deleted Successfully'
          });
        }, error => {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
        });
      }
    });
  }

  getAttachment(fileName) {
    this.attachedFile = fileName.split('/');
    this.attachedFileLength = fileName.split('/').length;
    this.attachedFileName = this.attachedFile[this.attachedFileLength - 1];
    return this.attachedFileName;
  }
}
