import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { SearchChecklistService } from './../services/search-checklist.service';
import { Location } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-search-checklist-results',
  templateUrl: './search-checklist-results.component.html',
  styleUrls: ['./search-checklist-results.component.css']
})
export class SearchChecklistResultsComponent implements OnInit {

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


  constructor(private route: ActivatedRoute, private router: Router, private searchChecklistService: SearchChecklistService,
     private location: Location , private confirmationService: ConfirmationService) {
    /** Initilase the breadcrumbs navigation data **/
    this.home = {icon: 'fa fa-home'};

    this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
    { label: 'Search Checklist', routerLink: ['/checklist/searchchecklist'] },
    { label: 'Search Checklist Results' }
    ];
    this.colHeaders = [
      { field: 'checkListName', header: 'Checklist' , width: '20%'},
      {  field: 'description', header: 'Description' , width: '30%'},
      {  field: 'checkListDepartment', header: 'Department' , width: '20%' },
      {  field: 'checkListFrequency', header: 'Frequency', width: '10%' },
      {  field: 'checkListOnline', header: 'Online' , width: '8%'  },
      { field: 'action', header: 'Action(s)', width: '12%' }
    ];
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'Checklists';
    this.selectedRows = 15;
    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
    // this.searchChecklistResults.push({'checkListName': 'str' });
  }

  ngOnInit() {
    this.searchChecklistResults = this.searchChecklistService.getResultSearch();
    // console.log('testing', this.searchChecklistResults[0]);

    this.filterable = true;
    this.isPaginator = true;

    console.log('list', this.searchChecklistResults);
    /*this.searchChecklistResults.push([{
         'checkListName': null,
     'description': 'test description',*/

    // }]);
  }
   checkAndEnablePage(value: number) {
    if (this.searchChecklistResults.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
  }
  pagination(isPaginator: boolean) {
    this.isPaginator = isPaginator;
  }

  back() {
    this.location.back();
  }
/* to modify record */
  modify(record) {
    console.log('record', record);
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Modify yet to be Implemented'});
  }

  delete(record) {
    console.log('record', record);
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Delete yet to be Implemented'});

//     this.confirmationService.confirm({
//       message: ' Delete yet to be Implemented',
//       header: 'Implementation Pending',
//       icon: 'fa fa-trash',
//       accept: () => {
//         this.msgs = [{ severity: 'success', detail: 'delete yet to be Implemented' }];

// },
//       reject: () => {
//         this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
//       }
//     });



}

checklistdetails(record) {
  console.log('record', record);
  this.msgs = [];
  this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Navigation Screen yet to be Implemented'});
  }
}
