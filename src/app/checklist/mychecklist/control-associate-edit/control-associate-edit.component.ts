import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, Message } from 'primeng/api';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-control-associate-edit',
  templateUrl: './control-associate-edit.component.html',
  styleUrls: ['./control-associate-edit.component.css']
})
export class ControlAssociateEditComponent implements OnInit {
  controlAssociateEditForm: FormGroup;
  primary: SelectItem[];
  selectedPrimary: string;
  selectedControl: string;
  selectedBackup: string;
  selectedReviewer: string;
  selected: string;
  @Input() childChecklistName: string;
  dataJson: any;
  backup: SelectItem[];
  reviewer: SelectItem[];
  control: SelectItem[];
  msgs: Message[] = [];

  @Output() cancel;
  @Output() closeControlAssociateEdit = new EventEmitter();
  constructor(private checklistCommonService: ChecklistCommonService, private messageService: MessageService) {
    this.controlAssociateEditForm = new FormGroup({
      valueinput: new FormControl('', Validators.required),
      guilabel: new FormControl(''),
      checkbox: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit() {
    this.preloadData();
  }

  preloadData() {

    this.checklistCommonService.getControl('add').subscribe(data => {
      this.control = data;
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
  }

  back() {
    this.clearAll();
    this.closeControlAssociateEdit.emit(false);
    this.controlAssociateEditForm.reset();
    this.cancel = true;
  }
  clearAll() {
    this.selectedControl = '';
    this.selectedPrimary = '';
    this.selectedBackup = '';
    this.selectedReviewer = '';
  }
  disable() {
    if (!this.selectedControl || !this.selectedPrimary || !this.selectedBackup || !this.selectedReviewer) {
      return true;
    } else {
      return false;
    }
  }
  save() {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Implementation Pending', detail: 'Save yet to be Implemented' });
  }
  updateControlAssociateEdit() {
    this.msgs = [];
    if (!this.disable()) {
      this.dataJson = {
        'controlName': this.selectedControl,
        'primaryName': this.selectedPrimary,
        'backupName': this.selectedBackup,
        'reviewer': this.selectedReviewer,
      };
      // this.addchecklistService.updateSystemValue(this.dataJson, this.updateRecord['checklistId']).subscribe(data => {
      //   this.savedRecord = data;
      //   this.searchChecklistService.refreshResults().subscribe(results => {
      //     this.searchChecklistService.setResultsSearch(results);
      this.messageService.clearMessage();
      this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
      alert(this.selectedControl);
      alert(this.selectedPrimary);
      alert(this.selectedBackup);
      alert(this.selectedReviewer);
      this.clearAll();
      this.back();
      // });
      // });
    }
  }
}
