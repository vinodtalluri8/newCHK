import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchControlService } from '../services/search-control.service';
import { Location } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-search-control-results',
  templateUrl: './search-control-results.component.html',
  styleUrls: ['./search-control-results.component.css']
})
export class SearchControlResultsComponent implements OnInit {

  itemsPath: { label: string; }[];
  value: string;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  searchControlResults: any;
  selectedRows: number;
  displayRows: SelectItem[];
  msgs: Message[] = [];
  colHeaders: { field: string; header: string; }[];
  constructor(private route: ActivatedRoute, private router: Router,
  private searchControlService: SearchControlService , private location: Location) {
    /** Initilase the breadcrumbs navigation data **/
    this.itemsPath = [{ label: 'Add & Manage' },
    { label: 'Search Control Results' }
  ];
    this.colHeaders = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'primary', header: 'Primary' },
      { field: 'backup', header: 'Backup' },
      { field: 'controllength', header: 'Control Length' },
      { field: 'reviewer', header: 'Reviewer' },
      { field: 'reviewlength', header: 'Review Length' },
      { field: 'risk', header: 'Risk' },
      { field: 'status', header: 'Status' },
      { field: 'evaluation', header: 'Evalution' },
      { field: 'checklistname', header: 'Checklist' },
      { field: 'evidence', header: 'Evidence' }
    ];
    this.value = 'SYSTEM_VALUE';
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'SystemValues';
    this.selectedRows = 15;

    this.displayRows  =  [{  label:  '15',  value:  15  },
    {  label:  '20',  value:  20  }, {  label: '30', value: 30  },
    {  label:  '50',  value:  50  }, {  label: '100', value: 100  }];
  }

  ngOnInit() {
    this.searchControlResults = this.searchControlService.getControlResultSearch();
  }
  /** to navigate to the list system values screen */
  navigateListSystemValues(code: string) {
    // this.router.navigate(['systemvalues/listsystemvalues', code]);
  }
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

  back() {
    this.location.back();
    }

    controldetails(record) {
      console.log('record', record);
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Navigation Screen yet to be Implemented'});
      }
}
