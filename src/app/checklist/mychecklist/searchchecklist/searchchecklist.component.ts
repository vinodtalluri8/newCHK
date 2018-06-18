import { SearchChecklistService } from './../services/search-checklist.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ChecklistCommonService } from '../../services/checklist-common.service';


@Component({
  selector: 'app-searchchecklist',
  templateUrl: './searchchecklist.component.html',
  styleUrls: ['./searchchecklist.component.css']
})
export class SearchchecklistComponent implements OnInit {
  dataJson: any;
  searchChecklistResults;
  title: string;
  itemsPath: MenuItem[];
  nameContains;
  selectedGroup;
  group;
  departments;
  selectedDepartments;
  frequency;
  selectedFrequency;
  online;
  selectedOnline;
  status;
  selectedStatus;
  name;
  home: MenuItem;
  constructor(private router: Router, private searchChecklistService: SearchChecklistService,
    private checklistCommonService: ChecklistCommonService) {
    this.home = { icon: 'fa fa-home' };
    this.itemsPath = [{ label: 'Checklist', routerLink: ['/mychecklist'] },
    { label: 'Search Checklist' }];
    this.selectedOnline = 'A';
    this.selectedGroup = 'GIST';
    this.selectedFrequency = 'A';
    this.selectedDepartments = 'A';
    this.selectedStatus = 'Active';
  }

  ngOnInit() {
    this.preloadData();
  }

  preloadData() {
        this.checklistCommonService.getGroup().subscribe(
      (data) => {
        this.group = data;
      }
    );

    this.checklistCommonService.getDepartment(this.selectedGroup).subscribe(
      (data) => {
        this.departments = data;
      }
    );

    this.checklistCommonService.getFrequency().subscribe(
      (data) => {
        this.frequency = data;
              }
    );
    this.checklistCommonService.getStatus().subscribe(
      (data) => {
        this.status = data;
      }
    );

    // this.online = [
    //   { label: 'All', value: 'A'  },
    //   { label: 'No', value: 'N'  },
    //   { label: 'Yes', value: 'Y'  },
    // ];

     this.checklistCommonService.getOnline().subscribe(
      (data) => {
        this.online = data;
      }
     );
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
  /** This method will reset all values to default **/
  resetAll() {
    this.nameContains = '';
    this.selectedOnline = 'A';
    this.selectedGroup = 'GIST';
    this.selectedFrequency = 'A';
    this.selectedDepartments = 'A';
    this.selectedStatus = 'Active';
  }

  /** This method will send the inputs
   * for displaying the search results for checklist **/
  searchChecklist() {
    this.dataJson = {
      'checkListName': this.nameContains,
      'checkListGroup': this.selectedGroup,
      'checkListDepartment': this.selectedDepartments,
      'checkListFrequency': this.selectedFrequency,
      'checkListOnline': this.selectedOnline,
      'taskStatus': this.selectedStatus
    };

    console.log(this.dataJson);
    this.searchChecklistService.getSearchChecklistData(this.dataJson).subscribe(data => {
      // this.searchChecklistResults = data;
      this.searchChecklistService.setResultsSearch(data);
      this.router.navigate(['/checklist/checklistResults']);
    });
  }
}
