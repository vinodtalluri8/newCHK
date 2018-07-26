import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';
import { Location } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { routerConstants } from '../../../core/constants/routerConstants';


@Component({
  selector: 'app-view-checklists-controls',
  templateUrl: './view-checklists-controls.component.html',
  styleUrls: ['./view-checklists-controls.component.css']
})
export class ViewChecklistsControlsComponent implements OnInit {
  itemsPath: MenuItem[];
  home: MenuItem;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  viewChecklistsControlsResults: any;
  selectedRows: number;
  displayRows: SelectItem[];
  colHeaders: any[];
  checklistId: string;
  checklistName: string;
  msgs: Message[] = [];

  displayDialog: boolean;
  isUpdate: boolean;
  dialogHeader: string;
  dataJson: any;
  loading: boolean;
  routePath: string;
  records: number;

  constructor(private viewChecklistsControlsService: ViewChecklistsControlsService,
    private location: Location, private router: Router, private route: ActivatedRoute,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.route.params.subscribe(params => {
      this.routePath = params['routePath'];
      this.checklistId = params['checklistId'];
      this.checklistName = params['checklistName'];
    });
    this.home = { icon: 'fa fa-home' };
    this.breadcrumbs();
    this.colHeaders = [
      { field: 'title', header: 'Title', width: '10%' },
      { field: 'description', header: 'Description', width: '20%' },
      { field: 'primary', header: 'Primary', width: '8%' },
      { field: 'backup', header: 'Backup', width: '7%' },
      { field: 'controlLength', header: 'Control Length', width: '6%' },
      { field: 'reviewer', header: 'Reviewer', width: '7%' },
      { field: 'reviewLength', header: 'Review Length', width: '6%' },
      { field: 'risk', header: 'Risk', width: '6%' },
      { field: 'docTitle', header: 'Procedure', width: '6%' },
      { field: 'procedureModDate', header: 'Procedure ModDate', width: '8%' },
      { field: 'evidenceRequired', header: 'Evidence', width: '6%' },
      { field: 'action', header: 'Action(s)', width: '10%' }
    ];
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'ViewChecklistsControls';
    this.selectedRows = 15;

    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
  }

  ngOnInit() {
    this.loading = true;
    this.fetchValues();
  }

  /*
  *fetch the values for the grid.
  * */

fetchValues() {
  this.viewChecklistsControlsService.fetchViewCheckLists(this.routePath).subscribe(data => {
    this.viewChecklistsControlsResults = data;
    this.loading = false;
    this.records = this.viewChecklistsControlsResults.length;
      },
    error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
}


  /*
  *To enable or diable pagination
  */
  checkAndEnablePage(value: number) {
    if (this.viewChecklistsControlsResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
  }
  /*
  *To go back to previous screen
  */
  back() {
    this.location.back();
  }
  /*
   *To display breadcrumbs
   */
  breadcrumbs() {
    if (this.routePath === 'Controls') {
      this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Search Controls', routerLink: ['/' + routerConstants.searchControl] },
      { label: 'Search Control Results', routerLink: ['/' + routerConstants.searchControlResults] },
      { label: 'Checklist Controls' }
      ];
    }
    if (this.routePath === 'Checklists') {
      this.itemsPath = [{ label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
      { label: 'Search Checklist Results', routerLink: ['/' + routerConstants.searchChecklistResults] },
      { label: 'Checklist Controls' }
      ];
    }
  }
  /*
  *Modify controls
  */
  modify(checklistId, taskId, displayOrder) {
    this.router.navigate([routerConstants.modifycontrols, this.routePath, checklistId, taskId, this.checklistName,
      displayOrder , this.records]);
  }
  /*
  *Delete checklists
  */
 delete(record) {
  this.msgs = [];
  console.log('record', record);
  const inputJson = {
    'checklistId': record['checklistId'],
    'taskId': record['taskId'],
    'displayOrder': record['displayOrder']
  };
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
      this.viewChecklistsControlsService.deleteControl(inputJson).subscribe(data => {
        this.viewChecklistsControlsService.fetchViewCheckLists(this.routePath).subscribe(results => {
          this.viewChecklistsControlsResults = results;
          this.records = this.viewChecklistsControlsResults.length;
            });
        this.msgs = [{ severity: 'success', detail: 'Record Deleted Successfully' }];
      }, error => {
        this.msgs = [{ severity: 'error', detail: 'Cannot delete an assigned control' }];
      });
    },
    reject: () => {
      this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    }
  });
}
  /*
  *Add new control
  */
  navigateAddNewControl() {
    this.router.navigate([routerConstants.addControl, this.routePath, this.checklistId, this.checklistName,  this.records]);
  }
  /*
   *Add Existing control
   */
  navigateAddExistingControl() {
    this.displayDialog = true;
    this.isUpdate = false;
    this.dialogHeader = 'Add Control to Checklist';
  }
  /*
  *navigating to order Screen
  */
 navigateOrder() {
  this.router.navigate([routerConstants.order, this.routePath, this.checklistId, this.checklistName]);
}
  /*
  *Refresh dialog
  */
  refresh(event) {
    this.fetchValues();
    this.displayDialog = event;
  }
}
