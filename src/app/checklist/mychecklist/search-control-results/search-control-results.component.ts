import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchControlService } from '../services/search-control.service';
import {  Location  } from '@angular/common';
import {  MenuItem, SelectItem  } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';
import { routerConstants } from '../../../core/constants/routerConstants';

@Component({
  selector: 'app-search-control-results',
  templateUrl: './search-control-results.component.html',
  styleUrls: ['./search-control-results.component.css']
})
export class SearchControlResultsComponent implements OnInit {
  public routePath: any = 'Controls';

  dataJson: any;
  itemsPath: MenuItem[];
  home: MenuItem;

  value: string;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  searchControlResults: any;
  selectedRows: number;
  displayRows: SelectItem[];
  msgs: Message[] = [];
  colHeaders: any[];
  loading: boolean;

  displayData: any = [];
  displayGroup: string;
  displayTitle: string;
  displayDepartment: string;
  displayFrequency: string;
  displayAssignee: string;
  displayReviewer: string;
  displayPrimary: string;
  displayBackup: string;
  displayReview: number;
  displayRisk: string;
  displayEvaluation: string;
  displayControl: number;
  displayStatus: string;
  displayReviewOperation: any;
  displayControlOperation: any;


  constructor(private route: ActivatedRoute, private router: Router,
    private searchControlService: SearchControlService, private location: Location,
    private viewChecklistsControlsService: ViewChecklistsControlsService) {
    /** Initilase the breadcrumbs navigation data **/

    this.home = { icon: 'fa fa-home' };
    this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
    { label: 'Search Controls', routerLink: ['/' + routerConstants.searchControl] },
    { label: 'Search Control Results' }
    ];
    this.colHeaders = [
      { field: 'title', header: 'Title', width: '10%' },
      { field: 'description', header: 'Description', width: '20%' },
      { field: 'primary', header: 'Primary', width: '8%' },
      { field: 'backup', header: 'Backup', width: '7%' },
      { field: 'controlLength', header: 'Control Length', width: '7%' },
      { field: 'reviewer', header: 'Reviewer', width: '8%' },
      { field: 'reviewLength', header: 'Review Length', width: '7%' },
      { field: 'risk', header: 'Risk', width: '7%' },
      { field: 'status', header: 'Status', width: '6%' },
      { field: 'evaluation', header: 'Evalution', width: '8%' },
      { field: 'checklistName', header: 'Checklist', width: '9%' },
      { field: 'evidenceRequired', header: 'Evidence', width: '8%' }
    ];
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'Controls';
    this.selectedRows = 15;
    this.loading = false;

    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
  }

  ngOnInit() {
    this.loading = true;
    this.searchControlService.fetchSearchControlList().subscribe(data => {
      this.searchControlResults = data;
      this.loading = false;
    });
    /*
    *Displaying search criteria on results grid
    */
    this.displayData = this.searchControlService.getSearchCriteria();
    this.displayTitle = this.displayData['title'];
    this.displayGroup = this.displayData['checklistGroup'];
    this.displayDepartment = this.displayData['checklistDepartment'];
    this.displayFrequency = this.displayData['checklistFrequency'];
    this.displayAssignee = this.displayData['anyAssigned'];
    this.displayReviewer = this.displayData['reviewer'];
    this.displayPrimary = this.displayData['primary'];
    this.displayBackup = this.displayData['backup'];
    this.displayReview = this.displayData['reviewLength'];
    this.displayReviewOperation = this.displayData['reviewOperation'];
    this.displayRisk = this.displayData['risk'];
    this.displayEvaluation = this.displayData['evaluation'];
    this.displayControl = this.displayData['controlLength'];
    this.displayControlOperation = this.displayData['taskOperation'];
    this.displayStatus = this.displayData['status'];

  }
  /*
  *To enable or diable pagination
  */
  checkAndEnablePage(value: number) {
    if (this.searchControlResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
  }
  pagination(isPaginator: boolean) {
    this.isPaginator = isPaginator;
  }
  /*
  *To go back to previous screen
  */
  back() {
    this.location.back();
  }
  /** This method will hit service get checklist data**/
  viewChecklistsForControls(checklistId, status, checklistName) {
    this.dataJson = {
      'checklistId': checklistId,
      'status': status,
    };
    this.viewChecklistsControlsService.setViewSearchCriteria(this.dataJson);
    this.router.navigate([routerConstants.viewchecklistControl, this.routePath, checklistId, checklistName]);
  }
}
