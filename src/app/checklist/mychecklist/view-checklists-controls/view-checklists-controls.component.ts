import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem  } from 'primeng/api';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';
import { Location  } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';

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
  displayOrder: string;

  displayDialog: boolean;
  isUpdate: boolean;
  dialogHeader: string;
  dataJson: any;
  loading: boolean;
  routePath: any;

  constructor(private viewChecklistsControlsService: ViewChecklistsControlsService,
    private location: Location, private router: Router, private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.routePath = params['routePath'];
        console.log('this.routePath', this.routePath);
      });
    this.home = { icon: 'fa fa-home' };
   if (this.routePath === 'Controls') {
    this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
    { label: 'Search Controls', routerLink: ['/control/searchcontrol'] },
    { label: 'Search Control Results', routerLink: ['/control/searchcontrolresults'] },
    { label: 'Checklist Info' }
    ];
  }
  if (this.routePath === 'Checklists') {
    this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
    { label: 'Search Checklist', routerLink: ['/checklist/searchchecklist'] },
    { label: 'Search Checklist Results' , routerLink: ['/checklist/checklistResults'] },
    { label: 'Checklist Info' }
    ];
  }
    this.colHeaders = [
      { field: 'title', header: 'Title', width: '10%' },
      { field: 'description', header: 'Description', width: '20%' },
      { field: 'primary', header: 'Primary', width: '8%' },
      { field: 'backup', header: 'Backup', width: '7%' },
      { field: 'controlLength', header: 'Control Length', width: '6%' },
      { field: 'reviewer', header: 'Reviewer', width: '7%' },
      { field: 'reviewLength', header: 'Review Length', width: '6%' },
      { field: 'risk', header: 'Risk', width: '6%' },
      { field: 'doctitle', header: 'Procedure', width: '6%' },
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
    this.viewChecklistsControlsService.fetchViewCheckLists().subscribe(data => {
    this.viewChecklistsControlsResults = data;
    this.loading = false;
      if (this.viewChecklistsControlsResults.length > 0) {
        this.checklistName = this.viewChecklistsControlsResults[0]['checklistName'];
        this.checklistId = this.viewChecklistsControlsResults[0]['checklistId'];
        }},
    error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
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
  *Modify checklists
  */
  modify(record) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Implementation Pending', detail: 'Modify yet to be Implemented' });
  }
  /*
  *Delete checklists
  */
  delete(record) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Implementation Pending', detail: 'Delete yet to be Implemented' });
  }
  /*
  *View procedure Document
  */
  viewProcedureDoc(record, records) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Implementation Pending', detail: 'Yet to be Implemented' });
  }
  /*
  *Add new control
  */
  navigateAddNewControl() {
    this.router.navigate(['/addcontrol/', this.checklistId]);
  }
 /*
  *Add Existing control
  */
  navigateAddExistingControl() {
    this.displayDialog = true;
    this.isUpdate = false;
    this.dialogHeader = 'Add Control to Checklist';
  }
  refresh(event) {
    console.log('refresh');
    // this.dataValues();
    this.displayDialog = event;
  }
}
