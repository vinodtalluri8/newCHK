import { Component, OnInit } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { CreateControlService } from '../../mychecklist/services/create-control.service';
import { Location } from '@angular/common';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['./create-control.component.css']
})
export class CreateControlComponent implements OnInit {

  dataJson: any;
  controlTitle: any;
  group;
  status;
  controlText: any;
  risk;
  evaluation;
  control: number;
  review: number;
  procedure;
  primary;
  backup;
  reviewer;
  evidenceRequired;
  checklist;
  savedRecord;
  saved: boolean;

  selectedGroup: any;
  selectedStatus: any;
  selectedRisk: any;
  selectedEvaluation: any;
  selectedProcedure: any;
  selectedPrimary: any;
  selectedBackup: any;
  selectedReviewer: any;
  selectedEvidenceRequired: any;
  selectedChecklist: any;
  defaultgroup;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

  checklistId: any;

  constructor(private router: Router, private checklistCommonService: ChecklistCommonService,
   private createControlService: CreateControlService, private location: Location,
    private viewChecklistsControlsService: ViewChecklistsControlsService, private route: ActivatedRoute) {
    this.home = {icon: 'fa fa-home'};

    this.itemsPath = [
      { label: 'Checklist', routerLink: ['/mychecklist'] },
      { label: 'Search Checklist' },
      { label: 'Add Control' }];

    // Filling the dropdown of evidence Required
    this.evidenceRequired = [
      {label: 'No', value: 'No' },
      {label: 'Yes', value: 'Yes' }];

    this.control = 0.0;
    this.review = 0.0;
    this.selectedEvidenceRequired = 'No';
   }

/** method to call data on page on load **/
  ngOnInit() {
    this.preloadData();
    this.route.params.subscribe(params => {
      this.checklistId = params['checklistId'];
    });
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
        this.status = data.filter(
          (status) => {
          return status.label !== 'All';
          }
          );
      }
    );

    this.checklistCommonService.getRisk('add').subscribe(
      (data) => {
        this.risk = data.filter(
          (risk) => {
          return risk.label !== 'All';
          }
          );
     }
    );

    this.checklistCommonService.getEvaluation('add').subscribe(
      (data) => {
        this.evaluation = data.filter(
          (evaluation) => {
          return evaluation.label !== 'All';
          }
          );
      }
    );

    this.checklistCommonService.getPrimary('add').subscribe(
      (data) => {
        this.primary = data.filter(
          (primary) => {
          return primary.label !== 'All';
          }
          );
      }
    );

    this.checklistCommonService.getBackup('add').subscribe(
      (data) => {
        this.backup = data.filter(
          (backup) => {
          return backup.label !== 'All';
          }
          );
      }
    );

    this.checklistCommonService.getReviewer('add').subscribe(
      (data) => {
        this.reviewer = data.filter(
          (reviewer) => {
          return reviewer.label !== 'All';
          }
          );
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
    if (!this.controlTitle || this.controlTitle.trim().length === 0 || !this.controlText ||
    this.controlText.trim().length === 0 || !this.selectedStatus ||
        !this.selectedRisk || !this.selectedEvaluation ||
        !this.selectedPrimary || !this.selectedBackup || !this.selectedReviewer ) {
        return true;
      } else {
      return false;
    }
  }

/** This method will navigate back to checklist main screen **/
  back() {
    this.location.back();
  }

/** This method will reset all values to default **/
  resetAll() {
    this.controlTitle = '';
    this.controlText = '';
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

  // trimWhiteSpaces(value) {
  //   return value.trim();
  // }

    // saveKeyControl() {
    //   this.controlTitle = this.trimWhiteSpaces(this.controlTitle); }


  /** This method will save all the data in create control screen  **/
  saveCreateControl() {
     this.msgs = [];
    /*{
    	"title": "addControltesting",
        "checklistGroup": "GIST",
		"reviewer" :"CIO",
		"primary":"CIO",
		"backup": "CIO",
		"status":"Active",
		"risk":"High",
		"evaluation":"Fine",
		"evidenceRequired":"No",
		"controlLength":"0.0",
		"doc_id":"169",
		"reviewLength":"0.0",
		"checklistId":"2836",
		"displayOrder":"2" */
    if (!this.disable()) {
      this.dataJson = {
        'title': this.controlTitle,
        'checklistGroup': this.selectedGroup,
        'status': this.selectedStatus,
        'description': this.controlText,
        'risk': this.selectedRisk,
        'controlLength': this.control,
        'evaluation': this.selectedEvaluation,
        'reviewLength': this.review,
        'procedure': this.selectedProcedure,
        'primary': this.selectedPrimary,
        'backup': this.selectedBackup,
        'reviewer': this.selectedReviewer,
        'evidenceRequired': this.selectedEvidenceRequired,
        'checklistId': this.selectedChecklist,
             'doc_id' : 169,
             'displayOrder' : 0
         };
         console.log('datajson', this.dataJson);
      this.createControlService.createControlList(this.dataJson)
        .subscribe(data => {
          this.savedRecord = data;
          console.log('hi');
          console.log('data', data);
            this.msgs.push({
            severity: 'success',
            detail: ' Record Saved Successfully. Checklist id = ' + this.savedRecord['checklistId']
          });
          this.resetAll();
          this.router.navigate(['/controls/viewChecklistsControls']);
        });
    }
  }


}
