import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { ViewChecklistsControlsService } from '../../services/view-checklists-controls.service';
import { Location } from '@angular/common';
import { Message } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { routerConstants } from '../../../../core/constants/routerConstants';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  itemsPath: MenuItem[];
  home: MenuItem;
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  checklistId: string;
  checklistName: string;
  displayOrder: SelectItem[] = [];
  selectedDisplayOrder: number;
  routePath: string;
  viewChecklistsControlsResults: any;
  records: number;
  msgs: Message[] = [];
  colHeaders: any[];
  selectedRows: number;
  displayRows: SelectItem[];

  constructor(private viewChecklistsControlsService: ViewChecklistsControlsService,
    private location: Location, private router: Router, private route: ActivatedRoute,
    private messageService: MessageService, private confirmationService: ConfirmationService) {

      /** to get the values from the route params for checklist id and checklist name */
      this.route.params.subscribe(params => {
        this.routePath = params['routePath'];
        this.checklistId = params['checklistId'];
        this.checklistName = params['checklistName'];
      });
      this.home = { icon: 'fa fa-home' };
      this.breadcrumbs();

       /** to initialize the column headers */
      this.colHeaders = [
        { field: 'new', header: 'New', width: '10%' },
        { field: 'title', header: 'Title', width: '22%' },
        { field: 'description', header: 'Description', width: '70%' }

      ];
      this.isPaginator = true;
      this.filterable = true;
      this.exportFileName = 'Order';
      this.selectedRows = 15;
 /** to initialize the display rows count dropdown */
      this.displayRows = [{ label: '15', value: 15 },
      { label: '20', value: 20 }, { label: '30', value: 30 },
      { label: '50', value: 50 }, { label: '100', value: 100 }];
    }

/** to get the data for the grid by calling service onInit method*/
  ngOnInit() {

    this.viewChecklistsControlsService.fetchViewCheckLists().subscribe(data => {
      this.viewChecklistsControlsResults = data;
           this.records = this.viewChecklistsControlsResults.length;
           this.populateDisplayOrderDropDown();
        },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
      if (this.messageService.getMessage()) {
        this.msgs = [this.messageService.getMessage()];
        this.messageService.clearMessage();
      }
  }

   /** This method is used to  populate the display order drop down based on the length  */
   populateDisplayOrderDropDown() {
    for (let i = 1; i <= this.records; i++) {
      this.displayOrder.push({ label: i.toString(), value: i });
    }
      }
  /*
  *To go back to previous screen
  */
 back() {
  this.location.back();
}

   /*
   *To display breadcrumbs based on route path as controls or checklists
   */
  breadcrumbs() {
    if (this.routePath === 'Controls') {
      this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
      { label: 'Search Controls', routerLink: ['/' + routerConstants.searchControl] },
      { label: 'Search Control Results', routerLink: ['/' + routerConstants.searchControlResults] },
      {label:  'Checklist Controls' , routerLink: ['/' + routerConstants.viewchecklistControl]},
      { label: 'Order' }
      ];
    }
    if (this.routePath === 'Checklists') {
      this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
      { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
      { label: 'Search Checklist Results', routerLink: ['/' + routerConstants.searchChecklistResults] },
      {label:  'Checklist Controls' ,  routerLink: ['/' + routerConstants.viewchecklistControl]},
      { label: 'Order' }
      ];
    }
  }

}
