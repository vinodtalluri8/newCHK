import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchControlService } from '../services/search-control.service';
import { Location } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';

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

  constructor(private route: ActivatedRoute, private router: Router,
  private searchControlService: SearchControlService , private location: Location,
  private viewChecklistsControlsService: ViewChecklistsControlsService) {
    /** Initilase the breadcrumbs navigation data **/

    this.home = {icon: 'fa fa-home'};
    this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
    { label: 'Search Controls', routerLink: ['/control/searchcontrol'] },
    { label: 'Search Control Results' }
  ];
    this.colHeaders = [
      { field: 'title', header: 'Title', width: '10%'},
      { field: 'description', header: 'Description' , width: '20%' },
      { field: 'primary', header: 'Primary', width: '8%'  },
      { field: 'backup', header: 'Backup', width: '7%'   },
      { field: 'controlLength', header: 'Control Length', width: '7%' },
      { field: 'reviewer', header: 'Reviewer', width: '8%'   },
      { field: 'reviewLength', header: 'Review Length', width: '7%'},
      { field: 'risk', header: 'Risk' , width: '7%'  },
      { field: 'status', header: 'Status' , width: '6%'  },
      { field: 'evaluation', header: 'Evalution' , width: '8%'  },
      { field: 'checklistName', header: 'Checklist' , width: '9%'  },
      { field: 'evidenceRequired', header: 'Evidence' , width: '8%'  }
    ];
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'Controls';
    this.selectedRows = 15;
    this.loading = false;

    this.displayRows  =  [{  label:  '15',  value:  15  },
    {  label:  '20',  value:  20  }, {  label: '30', value: 30  },
    {  label:  '50',  value:  50  }, {  label: '100', value: 100  }];
  }

  ngOnInit() {
    this.loading = true;
    this.searchControlService.fetchSearchControlList().subscribe(data => {
      this.searchControlResults = data;
      this.loading = false;
    });
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
  viewChecklistsForControls(checklistid, status) {
    this.dataJson = {
      'checklistId': checklistid,
      'status': status,
    };
    this.viewChecklistsControlsService.setViewSearchCriteria(this.dataJson);
    this.router.navigate(['/controls/viewChecklistsControls' , this.routePath]);
  }
}
