import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { CreateControlService } from '../../mychecklist/services/create-control.service';
import { Location, SlicePipe } from '@angular/common';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';
import { MessageService } from '../../services/message.service';
import { Message } from 'primeng/components/common/api';
import { routerConstants } from '../../../core/constants/routerConstants';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['./create-control.component.css']
})
export class CreateControlComponent implements OnInit {

  dataJson: any;
  controlTitle: string;
  group: SelectItem[];
  status: SelectItem[];
  description: any;
  risk: SelectItem[];
  evaluation: SelectItem[];
  control: number;
  review: number;
  procedure: SelectItem[];
  primary: SelectItem[];
  backup: SelectItem[];
  reviewer: SelectItem[];
  evidenceRequired: SelectItem[];
  checklist: SelectItem[];
  savedRecord: any;
  saved: boolean;

  selectedGroup: string;
  selectedStatus: string;
  selectedRisk: string;
  selectedEvaluation: string;
  selectedProcedure: any;
  selectedPrimary: string;
  selectedBackup: string;
  selectedReviewer: string;
  selectedEvidenceRequired: string;
  selectedChecklist: number;
  defaultgroup: string;
  records;
  displayOrder: SelectItem[] = [];
  selectedDisplayOrder: any;
  displayOrderVal: any;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

  checklistId: number;
  taskId: number;
  header: string;
  isUpdate: boolean;
  routePath: string;
  checklistName: string;
  updateRecord: any;
  inactiveProcedure: string;
  filtererdProcedureVal: SelectItem[];
  matrixList: any = [];
  displayDisabled: boolean;
  checklistDisabled: boolean;

  constructor(private router: Router, private checklistCommonService: ChecklistCommonService,
    private createControlService: CreateControlService, private location: Location,
    private viewChecklistsControlsService: ViewChecklistsControlsService,
    private route: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.home = { icon: 'fa fa-home' };
    // Filling the dropdown of evidence Required
    this.evidenceRequired = [
      { label: 'No', value: 'N' },
      { label: 'Yes', value: 'Y' }];

    this.control = 0.0;
    this.review = 0.0;
    this.selectedEvidenceRequired = 'N';
  }

  /** method to call data on page on load **/
  ngOnInit() {
    this.preloadData();
    this.selectedDisplayOrder = 0;
    this.checklistDisabled = true;
    this.route.params.subscribe(params => {
      this.header = 'Add New Control';
      this.checklistId = params['checklistId'];
      this.displayOrderVal = params['displayOrder'];
      this.taskId = params['taskId'];
      this.routePath = params['routePath'];
      this.checklistName = params['checklistName'];
      this.records = params['records'];
      this.selectedChecklist = this.checklistId;
      if (this.taskId > 0) {
        this.isUpdate = true;
        this.displayDisabled = true;
        this.checklistDisabled = false;
        this.header = 'Modify Control';
        this.createControlService.getControlDetails(this.checklistId, this.taskId, this.displayOrderVal)
          .subscribe(data => {
            this.updateRecord = data;
            this.populateData();
          });
      }
      this.breadcrumbs();
      this.populateDisplayOrderDropDown();
    });
  }
  populateDisplayOrderDropDown() {
    this.displayOrder.push({ label: '0', value: 0 });
    for (let i = 1; i <= this.records; i++) {
      this.displayOrder.push({ label: i.toString(), value: i });
    }
  }


  populateData() {
    this.controlTitle = this.updateRecord['title'] ? this.updateRecord['title'] : '';
    this.description = this.updateRecord['description'] ? this.updateRecord['description'] : '';
    this.selectedProcedure = this.updateRecord['docId'] ? this.updateRecord['docId'] : '';
    this.selectedEvidenceRequired = this.updateRecord['evidenceRequired'] ? this.updateRecord['evidenceRequired'] : '';
    this.selectedStatus = this.updateRecord['status'] ? this.updateRecord['status'] : '';
    this.selectedRisk = this.updateRecord['risk'] ? this.updateRecord['risk'] : '';
    this.selectedEvaluation = this.updateRecord['evaluation'] ? this.updateRecord['evaluation'] : '';
    this.selectedChecklist = this.updateRecord['checklistId'] ? this.updateRecord['checklistId'] : '';
    this.selectedPrimary = this.updateRecord['primary'] ? this.updateRecord['primary'] : '';
    this.selectedBackup = this.updateRecord['backup'] ? this.updateRecord['backup'] : '';
    this.selectedReviewer = this.updateRecord['reviewer'] ? this.updateRecord['reviewer'] : '';
    this.review = this.updateRecord['reviewLength'] ? this.updateRecord['reviewLength'] : 0.0;
    this.control = this.updateRecord['controlLength'] ? this.updateRecord['controlLength'] : 0.0;
    this.selectedDisplayOrder = this.updateRecord['displayOrder'] ? this.updateRecord['displayOrder'] : '';
  }
  /** Populate all the required dropdown values during the screen load **/
  preloadData() {
    this.checklistCommonService.getDefaultGroup().subscribe(
      (data) => {
        this.defaultgroup = data[0]['departmentName'];
        this.selectedGroup = this.defaultgroup;
      }
    );

    this.checklistCommonService.getGroup().subscribe(
      (data) => {
        this.group = data;
      }
    );

    this.checklistCommonService.getStatus('add').subscribe(
      (data) => {
        this.status = data;
      }
    );

    this.checklistCommonService.getRisk('add').subscribe(
      (data) => {
        this.risk = data;
      }
    );

    this.checklistCommonService.getEvaluation('add').subscribe(
      (data) => {
        this.evaluation = data;
      }
    );

    this.checklistCommonService.getPrimary('add').subscribe(
      (data) => {
        this.primary = data;
      }
    );

    this.checklistCommonService.getBackup('add').subscribe(
      (data) => {
        this.backup = data;
      }
    );

    this.checklistCommonService.getReviewer('add').subscribe(
      (data) => {
        this.reviewer = data;
      }
    );

    this.createControlService.getProcedure().subscribe(
      (data) => {
        this.procedure = data;
      }
    );

    this.createControlService.getChecklist().subscribe(
      (data) => {
        this.checklist = data;
        this.selectedChecklist = this.checklistId;
      }
    );

  }
  /** This method will enable or disable the Save button based on the mandatory fields selected
       * !this.review || !this.control || **/
  disable() {
    if (!this.controlTitle || this.controlTitle.trim().length === 0 || !this.description ||
      this.description.trim().length === 0 || !this.selectedStatus ||
      !this.selectedRisk || !this.selectedEvaluation ||
      !this.selectedPrimary || !this.selectedBackup || !this.selectedReviewer) {
      return true;
    } else if (this.isUpdate) {
      return !this.isModified();
    } else {
      return false;
    }
  }

  /** To check fields modified or not  **/
  isModified() {
    if (this.controlTitle === this.updateRecord['title']
      && this.description === this.updateRecord['description']
      && this.selectedStatus === this.updateRecord['status']
      && this.selectedRisk === this.updateRecord['risk']
      && this.selectedEvaluation === this.updateRecord['evaluation']
      && this.selectedPrimary === this.updateRecord['primary']
      && this.selectedBackup === this.updateRecord['backup']
      && this.review === this.updateRecord['reviewLength']
      && this.control === this.updateRecord['controlLength']
      && (this.selectedProcedure === ''
        || this.selectedProcedure === this.updateRecord['docId'])
      && this.selectedEvidenceRequired === this.updateRecord['evidenceRequired']
      && this.selectedDisplayOrder === this.updateRecord['displayOrder']) {
      return false;
    } else {
      return true;
    }
  }

  /** This method will navigate back to checklist main screen **/
  back() {
    this.resetAll();
    this.location.back();
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.controlTitle = '';
    this.description = '';
    this.selectedGroup = this.defaultgroup;
    this.selectedStatus = '';
    this.selectedRisk = '';
    this.selectedEvaluation = '';
    this.review = 0.0;
    this.control = 0.0;
    this.selectedProcedure = '';
    this.selectedPrimary = '';
    this.selectedBackup = '';
    this.selectedReviewer = '';
    this.selectedEvidenceRequired = 'No';

  }
  breadcrumbs() {
    if (this.routePath === 'Controls') {
      if (!this.isUpdate) {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Search Controls', routerLink: ['/' + routerConstants.searchControl] },
        { label: 'Search Control Results', routerLink: ['/' + routerConstants.searchControlResults] },
        {label:  'Checklist Controls' , routerLink: ['/' + routerConstants.viewchecklistControl]},
        { label: 'Add New Control' }
        ];
      } else {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Search Controls', routerLink: ['/' + routerConstants.searchControl] },
        { label: 'Search Control Results', routerLink: ['/' + routerConstants.searchControlResults] },
        {label:  'Checklist Controls' , routerLink: ['/' + routerConstants.viewchecklistControl]},
        { label: 'Modify Control' }
        ];
      }
    }
    if (this.routePath === 'Checklists') {
      if (!this.isUpdate) {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
        { label: 'Search Checklist Results', routerLink: ['/' + routerConstants.searchChecklistResults] },
        {label:  'Checklist Controls' ,  routerLink: ['/' + routerConstants.viewchecklistControl]},
        { label: 'Add New Control' }
        ];
      } else {
        this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
        { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
        { label: 'Search Checklist Results', routerLink: ['/' + routerConstants.searchChecklistResults] },
        {label:  'Checklist Controls' ,  routerLink: ['/' + routerConstants.viewchecklistControl]},
        { label: 'Modify Control' }
        ];
      }
    }
  }
  /** This method will save all the data in create control screen  **/
  saveCreateControl() {
    this.msgs = [];
    if (!this.disable()) {
      this.dataJson = {
        'title': this.controlTitle,
        'checklistGroup': this.selectedGroup,
        'status': this.selectedStatus,
        'description': this.description,
        'risk': this.selectedRisk,
        'controlLength': this.control,
        'evaluation': this.selectedEvaluation,
        'reviewLength': this.review,
        'docId': this.selectedProcedure,
        'primary': this.selectedPrimary,
        'backup': this.selectedBackup,
        'reviewer': this.selectedReviewer,
        'evidenceRequired': this.selectedEvidenceRequired,
        'checklistId': this.selectedChecklist,
        'displayOrder': this.selectedDisplayOrder
      };
      // Code required for script
      // console.log('yes' + (this.selectedProcedure.value).substring(1, 2));
      //  this.filtererdProcedureVal = this.procedure.filter(
      //     (record) => {
      //       return  record.value === this.selectedProcedure;
      //     }
      //   );
      //   console.log('label' + (this.filtererdProcedureVal['label']));

      this.createControlService.createControlList(this.dataJson)
        .subscribe(data => {
          this.savedRecord = data;
          this.messageService.clearMessage();
          this.messageService.sendMessage({
            severity: 'success',
            detail: 'Record Saved Successfully'
          });
          this.resetAll();
          this.back();
        });
    }
  }

  modifyControl() {
    this.msgs = [];
    this.matrixList = [];
    if (!this.disable()) {
      this.dataJson = {
        'title': this.controlTitle,
        'description': this.description,
        'docId': this.selectedProcedure,
        'evidenceRequired': this.selectedEvidenceRequired,
        'checklistGroup': this.selectedGroup,
        'status': this.selectedStatus,
        'risk': this.selectedRisk,
        'evaluation': this.selectedEvaluation,
        'newChecklistId': this.selectedChecklist,
        'primary': this.selectedPrimary,
        'backup': this.selectedBackup,
        'reviewer': this.selectedBackup,
        'reviewLength': this.review,
        'controlLength': this.control,
        'taskId': this.taskId,
        'displayOrder': this.selectedDisplayOrder,
        'checklistId': this.checklistId
      };
      if (this.updateRecord['matrixlist'] !== null) {
        this.updateRecord['matrixlist'].forEach((value) => {
          if (value['matrixName'] != null) {
            this.matrixList.push(value['matrixName']);
          }
        });
      }
      if (this.updateRecord['status'] === 'Active'
        && this.selectedStatus === 'Inactive'
        && this.updateRecord['flagIcmControl'] === 'Y') {
        this.confirmationService.confirm({
          message: 'This control is attached to the following Internal Control Matrices: ' + this.matrixList
            + '. Are you sure you want to set it to Inactive ?',
          header: 'Alert',
          accept: () => {
            this.updateControlData(this.dataJson);
          },
          reject: () => {
            this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
          }
        });
      } else {
        this.updateControlData(this.dataJson);
      }
    }
  }

  updateControlData(dataJson) {
    this.createControlService.updateControl(dataJson).subscribe(data => {
      this.savedRecord = data;
      this.messageService.clearMessage();
      this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
      this.resetAll();
      this.back();
    }, error => {
      this.msgs = [{ severity: 'error', detail: 'Cannot modify an assigned control' }];
    });
  }
}
