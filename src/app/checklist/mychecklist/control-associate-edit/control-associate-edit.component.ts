import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { MessageService } from '../../services/message.service';
import { AddExistingControlService } from '../services/add-existing-control.service';

@Component({
  selector: 'app-control-associate-edit',
  templateUrl: './control-associate-edit.component.html',
  styleUrls: ['./control-associate-edit.component.css']
})
export class ControlAssociateEditComponent implements OnInit, AfterViewInit {
  controlAssociateEditForm: FormGroup;
  primary: SelectItem[];
  selectedPrimary: string;
  selectedControl: string;
  selectedBackup: string;
  selectedReviewer: string;
  selected: string;
  @Input() childChecklistName: string;
  @Input() childChecklistId: string;

  dataJson: any;
  backup: SelectItem[];
  reviewer: SelectItem[];
  control: SelectItem[];
  msgs: Message[] = [];
  displayOrder: SelectItem[] = [];
  selectedDisplayOrder: any;


  @Output() closeControlAssociateEdit = new EventEmitter();
  constructor(private checklistCommonService: ChecklistCommonService, private messageService: MessageService,
    private addExistingControlService: AddExistingControlService) {
    this.controlAssociateEditForm = new FormGroup({
      backup: new FormControl(''),
      reviewer: new FormControl(''),
      control: new FormControl(''),
      primary: new FormControl('')
    });
  }

  ngOnInit() {
    this.selectedDisplayOrder = 0;
  }
  ngAfterViewInit() {
    this.preloadData();
  }
  /** This method is used to  set the  displayRecordsLength got as input */
  @Input()
  set displayRecordsLength(displayRecordsLength: number) {
    this.displayOrder.push({ label: '0', value: 0 });
    if (displayRecordsLength > 0) {
      this.populateDisplayOrderDropDown(displayRecordsLength);
    }
  }
  /** This method is used to  get the  displayRecordsLength */
  get displayRecordsLength(): number {
    return this.selectedDisplayOrder;
  }

  /** This method is used to  populate the display order drop down based on the length  */
  populateDisplayOrderDropDown(displayRecordsLength) {
    for (let i = 1; i <= displayRecordsLength; i++) {
      this.displayOrder.push({ label: i.toString(), value: i });
    }
    this.selectedDisplayOrder = 0;
  }

  /** This method is used to get the data for the dropdowns */
  preloadData() {

    this.checklistCommonService.getControl('add').subscribe(data => {
      this.control = data;
      console.log('data', data);
    }
    );
    this.checklistCommonService.getPrimary('add').subscribe(
      (data) => {
        this.primary = data;
        this.backup = data;
        this.reviewer = data;
      }
    );
    /* this.checklistCommonService.getBackup('add').subscribe(
       (data) => {
         this.backup = data;
       }
     );
     this.checklistCommonService.getReviewer('add').subscribe(
       (data) => {
         this.reviewer = data;
       }
     );*/
  }

  /** This method is used to  back button */
  back() {
    this.clearAll();
    this.closeControlAssociateEdit.emit(false);
    this.controlAssociateEditForm.reset();
  }

  /** This method is used to  clear entries for the fields */
  clearAll() {
    // this.selectedControl = { label: '', value: '' };
    this.selectedControl = '';
    this.selectedPrimary = '';
    this.selectedBackup = '';
    this.selectedReviewer = '';
    this.selectedDisplayOrder = 0;
  }
  /** This method is used to  disable the save button */
  disable() {
    if (!this.selectedControl || !this.selectedPrimary || !this.selectedBackup || !this.selectedReviewer) {
      return true;
    } else {
      return false;
    }
  }
  /** This method is used to  call the service to add existing control */
  updateControlAssociateEdit() {
    this.msgs = [];
    if (!this.disable()) {
      this.dataJson = {
        'taskId': this.selectedControl,
        'displayOrder': this.selectedDisplayOrder,
        'primary': this.selectedPrimary,
        'backup': this.selectedBackup,
        'reviewer': this.selectedReviewer,
        'checklistId': this.childChecklistId
      };
      console.log('in component');
      this.addExistingControlService.addExistingControl(this.dataJson).subscribe((data) => {
        this.messageService.clearMessage();
        this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
        this.clearAll();
        this.back();
      });

    }
  }
}
