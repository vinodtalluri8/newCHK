/**  Business logic implementation for the add checklist  **/

import { Component, OnInit } from '@angular/core';
import { AddchecklistService } from '../services/addchecklist.service';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { SelectItem, Message } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  styleUrls: ['./add-check-list.component.css']
})
export class AddCheckListComponent implements OnInit {

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
  msg: Message[] = [];
  itemsPath: MenuItem[];
  saved: boolean;
  constructor(private checklistCommonService: ChecklistCommonService,
    private addchecklistService: AddchecklistService, private router: Router, private location: Location) {

      this.itemsPath = [
        { label: 'Checklists' },
        { label: 'Add & Search' },
        { label: 'Add Checklist' }];

    this.selectedGroup = 'GIST';
  }

/** method to call data on page on load **/
  ngOnInit() {
    this.preloadData();
  }

/** Populate all the required dropdown values during the screen load **/
  preloadData() {

    this.checklistCommonService.getFrequency().subscribe(data => {
      this.frequency = data;
    });
    this.checklistCommonService.getGroup().subscribe(data => {
      this.groups = data;
    });
    this.checklistCommonService.getDepartment(this.selectedGroup).subscribe(data => {
      this.departments = data;
    });

  }

/** This method will enable or disable the Save button based on the mandatory fields selected **/
  disable() {
    if (!this.name || this.name.trim().length === 0 || !this.description || this.description.trim().length === 0
    || !this.selectedGroup || !this.selectedDepartments || !this.selectedFrequency) {
      return true;
    } else {
      return false;
    }
  }

  /** This method will navigate back to keycontrol screen **/
  back() {
    this.location.back();
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.name = '';
    this.description = '';
    this.selectedGroup = 'DCIO';
    this.selectedFrequency = '';
    this.selectedDepartments = '';
  }

  /** This method will assign the changed group value
   * @param event
   * **/
  onChangeGroup(event) {
    this.selectedGroup = event;
    this.checklistCommonService.getDepartment(event).subscribe(data => {
    this.departments = data;
    });
  }

  /** This method will save all the data in add checklist screen  **/
  saveChecklist() {
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
            this.msg.push({
            severity: 'success',
            detail: ' Record Saved Successfully. Checklist id = ' + this.savedRecord['checklistId']
          });
          this.resetAll();
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
    this.router.navigate(['/addControls']);
  }
}
