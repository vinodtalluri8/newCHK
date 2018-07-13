import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { SearchChecklistService } from './../services/search-checklist.service';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { AddchecklistService } from '../services/addchecklist.service';
import { MessageService } from '../../services/message.service';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';
import { routerConstants } from '../../../core/constants/routerConstants';

@Component({
  selector: 'app-search-checklist-results',
  templateUrl: './search-checklist-results.component.html',
  styleUrls: ['./search-checklist-results.component.css']
})

export class SearchChecklistResultsComponent implements OnInit  {
  public routePath: any = 'Checklists';

  dataJson: any;
  itemsPath: MenuItem[];
  home: MenuItem;

  value: string;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  searchChecklistResults: any = [];
  selectedRows: number;
  colHeaders: any[];
  displayRows: SelectItem[];
  msgs: Message[] = [];
  loading: boolean;


  constructor(private route: ActivatedRoute, private router: Router, private searchChecklistService: SearchChecklistService,
    private location: Location, private confirmationService: ConfirmationService,
    private addchecklistService: AddchecklistService, private messageService: MessageService,
    private viewChecklistsControlsService: ViewChecklistsControlsService) {

    this.home = { icon: 'fa fa-home' };
    /** Initilase the breadcrumbs navigation data **/
    this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
    { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
    { label: 'Search Checklist Results' }
    ];
    /** Initilase the column headers data **/
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist', width: '20%' },
      { field: 'description', header: 'Description', width: '30%' },
      { field: 'checklistDepartment', header: 'Department', width: '20%' },
      { field: 'checklistFrequency', header: 'Frequency', width: '10%' },
      { field: 'checklistOnline', header: 'Online', width: '8%' },
      { field: 'action', header: 'Action(s)', width: '12%' }
    ];
    /** Assign values to variables on page load **/
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'Checklists';
    this.selectedRows = 15;
    this.loading = false;
    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
  }

  /** Initilase or call methods onInit**/
  ngOnInit() {
    this.loading = true;
    this.searchChecklistService.refreshResults().subscribe(data => {
      this.searchChecklistResults = data;
      this.loading = false;
    });
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
    // this.msgs.push();
    this.filterable = true;
    this.isPaginator = true;

    console.log('list', this.searchChecklistResults);
  }


  messageStatus(event) {
    console.log('messageStatus', event);
    if (event === 'Added') {
      this.msgs = [{ severity: 'success', detail: 'Record Added Successfully' }];
    }
    if (event === 'Updated') {
      this.msgs = [{ severity: 'success', detail: 'Record Updated Successfully' }];

    }
  }

  /** To check and enable or disable pagination**/
  checkAndEnablePage(value: number) {
    if (this.searchChecklistResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
    console.log(' mesagepage ', this.msgs);
  }

  pagination(isPaginator: boolean) {
    this.isPaginator = isPaginator;
  }

  /** To go back to the previous screen**/
  back() {
    this.location.back();
  }

  /* to modify record */
  modify(record) {
    // this.addchecklistService.setChecklistById(record);
    this.router.navigate([routerConstants.modifyChecklist, record['checklistId']]);
    // this.msgs = [];
    // this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Modify yet to be Implemented'});
  }

  /** to delete record**/
  delete(record) {
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.searchChecklistService.deleteChecklist(record).subscribe(data => {
          this.msgs = [{ severity: 'success', detail: 'Record Deleted Successfully' }];
          this.searchChecklistService.refreshResults().subscribe(results => {
            this.searchChecklistResults = results;
          });
        }, error => {
          this.msgs = [{ severity: 'error', detail: 'Cannot delete a scheduled online checklist' }];
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
    // this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Delete yet to be Implemented'});
  }



  /** to navigate to the checklist page**/
  checklistDetails(checklistId, status, checklistName) {
    this.dataJson = {
      'checklistId': checklistId,
      'status': status,
    };
    this.viewChecklistsControlsService.setViewSearchCriteria(this.dataJson);
    this.router.navigate([routerConstants.viewchecklistControl, this.routePath , checklistId, checklistName]);

  }
}
