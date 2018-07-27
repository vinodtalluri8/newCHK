/**  Business logic implementation for the add checklist  **/

import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { AddchecklistService } from '../services/addchecklist.service';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { SelectItem, Message } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { EventEmitter } from 'events';
import { SearchChecklistResultsComponent } from '../search-checklist-results/search-checklist-results.component';
import { MessageService } from '../../services/message.service';
import { SearchChecklistService } from '../services/search-checklist.service';
import { routerConstants } from '../../../core/constants/routerConstants';


@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  styleUrls: ['./add-check-list.component.css'],
})
export class AddCheckListComponent implements OnInit {

  // checklistItem: ChecklistItem;
  groups: SelectItem[];
  departments: SelectItem[];
  frequency: SelectItem[];
  selectedGroup: string;
  selectedDepartments: string;
  selectedFrequency: string;
  description: string;
  dataJson: any;
  name: string;
  savedRecord;
  msgs: Message[] = [];
  itemsPath: MenuItem[];
  home: MenuItem;
  saved: boolean;
  checklistId: number;
  @Input() isUpdate;
  updateRecord: any;
  header: string;
  @Output() checklistEvent = new EventEmitter();
  @ViewChild(SearchChecklistResultsComponent) searchList: SearchChecklistResultsComponent;
  constructor(private checklistCommonService: ChecklistCommonService,
    private addchecklistService: AddchecklistService, private router: Router, private location: Location,
    private route: ActivatedRoute, private messageService: MessageService, private searchChecklistService: SearchChecklistService) {

    this.home = { icon: 'fa fa-home' };

    this.itemsPath = [
      { label: 'Checklists', routerLink: [routerConstants.defaultRoute]},
      { label: 'Add Checklist' }];

    this.selectedGroup = 'GIST';
  }

  /** method to call data on page on load **/
  ngOnInit() {
    this.header = 'Add Checklist';
    this.preloadData();
    this.route.params.subscribe(params => {
      this.checklistId = params['id'];
      if (this.checklistId > 0) {
        this.addchecklistService.getDataByChecklistId(this.checklistId).subscribe(data => {
          this.updateRecord = data;
          this.isUpdate = true;
          this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
          { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
          { label: 'Search Checklist Results', routerLink: ['/' + routerConstants.searchChecklistResults] },
          { label: 'Modify Checklist' }];
          this.header = 'Modify Checklist';
          // this.updateRecord = this.addchecklistService.getDataByChecklistId(this.checklistId);
          console.log('updateRecord', this.updateRecord);
          this.populateValues();
        });
      }

    });
  }

  populateValues() {
    this.name = this.updateRecord['checklistName'] ? this.updateRecord['checklistName'] : '';
    this.description = this.updateRecord['description'] ? this.updateRecord['description'] : '';
    this.selectedGroup = this.updateRecord['checklistGroup'] ? this.updateRecord['checklistGroup'] : '';
    this.selectedDepartments = this.updateRecord['checklistDepartment'] ? this.updateRecord['checklistDepartment'] : '';
    this.selectedFrequency = this.updateRecord['checklistFrequency'] ? this.updateRecord['checklistFrequency'] : '';
  }
  /** Populate all the required dropdown values during the screen load **/
  preloadData() {

    this.checklistCommonService.getFrequency('add').subscribe(data => {
      this.frequency = data;
    });
    this.checklistCommonService.getGroup().subscribe(data => {
      this.groups = data;
    });
    this.checklistCommonService.getDepartment(this.selectedGroup, 'add').subscribe(data => {
      this.departments = data;
    });

  }

  isDirty() {
    if (this.name === this.updateRecord['checklistName'] && this.description === this.updateRecord['description']
      && this.selectedGroup === this.updateRecord['checklistGroup'] && this.selectedDepartments === this.updateRecord['checklistDepartment']
      && this.selectedFrequency === this.updateRecord['checklistFrequency']) {
      return false;
    } else {
      return true;
    }
  }

  /** This method will enable or disable the Save button based on the mandatory fields selected **/
  disable() {
    if (!this.name || this.name.trim().length === 0 || !this.description || this.description.trim().length === 0
      || !this.selectedGroup || !this.selectedDepartments || !this.selectedFrequency) {

      return true;

    } else if (this.isUpdate) {
      console.log('isDirty', this.isDirty());
      return !this.isDirty();
    } else {
      return false;
    }
  }

  /** This method will navigate back to keycontrol screen **/
  back() {
    this.resetAll();
    this.location.back();
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.name = '';
    this.description = '';
    this.selectedGroup = 'GIST';
    this.selectedFrequency = '';
    this.selectedDepartments = '';
  }

  /** This method will assign the changed group value
   * @param event
   * **/
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.selectedDepartments = null;
    this.checklistCommonService.getDepartment(event, 'add').subscribe(data => {
      this.departments = data;
    });
  }

  modifyChecklist() {
    this.msgs = [];
    if (!this.disable()) {
      this.dataJson = {
        'checklistId': this.updateRecord['checklistId'],
        'checklistName': this.name,
        'description': this.description,
        'frequency': this.selectedFrequency,
        'department': this.selectedDepartments,
        'checklistGroup': this.selectedGroup,
      };
      this.addchecklistService.updateSystemValue(this.dataJson ).subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({ severity: 'success', detail: 'Record Updated Successfully' });
        this.resetAll();
        this.back();
      });
    }
  }
  /** This method will save all the data in add checklist screen  **/
  saveChecklist() {
    this.msgs = [];
    if (!this.disable()) {
      this.dataJson = {
        'checklistName': this.name,
        'description': this.description,
        'frequency': this.selectedFrequency,
        'department': this.selectedDepartments,
        'checklistGroup': this.selectedGroup,
      };

      this.addchecklistService.addChecklist(this.dataJson)
        .subscribe(data => {
          this.savedRecord = data;
          this.resetAll();
          this.messageService.clearMessage();
          this.messageService.sendMessage({ severity: 'success', detail: 'Record Added Successfully' });
          this.router.navigate([routerConstants.searchChecklist]);
        });
    }
  }
  saveAddControl() {
    this.dataJson = {
      'checklistName': this.name,
      'description': this.description,
      'frequency': this.selectedFrequency,
      'department': this.selectedDepartments,
      'checklistGroup': this.selectedGroup,
    };
    console.log(this.dataJson, 'this.dataJson ');
    this.addchecklistService.changeAddControls([this.dataJson]);
    this.router.navigate([routerConstants.addControl]);
  }
}
