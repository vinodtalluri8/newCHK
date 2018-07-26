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
  viewDisplayResults: any;
  records: number;
  msgs: Message[] = [];
  colHeaders: any[];
  selectedRows: number;
  displayRows: SelectItem[];
  dataJson: any;

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
      { field: '', header: '', width: '2%' },
      { field: 'displayOrder', header: 'Order', width: '7%' },
      { field: 'title', header: 'Title', width: '21%' },
      { field: 'description', header: 'Description', width: '70%' }

    ];
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'Display Order';
    this.selectedRows = 15;
    /** to initialize the display rows count dropdown */
    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
  }

  /** to get the data for the grid by calling service onInit method*/
  ngOnInit() {
    this.preloadData();
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }
  }

  preloadData() {
    this.viewChecklistsControlsService.fetchViewCheckLists(this.routePath).subscribe(data  =>  {
      this.viewDisplayResults = data;
      this.records = this.viewDisplayResults.length;
      //  this.populateDisplayOrderDropDown();
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
      });
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
      { label: 'Checklist Controls', routerLink: ['/' + routerConstants.viewchecklistControl] },
      { label: 'Order' }
      ];
    }
    if (this.routePath === 'Checklists') {
      this.itemsPath = [{ label: 'Checklists', routerLink: ['/mychecklist'] },
      { label: 'Search Checklist', routerLink: ['/' + routerConstants.searchChecklist] },
      { label: 'Search Checklist Results', routerLink: ['/' + routerConstants.searchChecklistResults] },
      { label: 'Checklist Controls', routerLink: ['/' + routerConstants.viewchecklistControl] },
      { label: 'Order' }
      ];
    }
  }
 /*
  *To assign the changed displayed order value for the drop down
  */
  changeDisplayOrder(event) {
    console.log(event, 'event');
  }

  reorder(oldPosition, newPosition) {
    console.log('Re-orer - old', oldPosition);
    console.log('Re-orer - new', newPosition);
    if (oldPosition - newPosition < 0) {
      oldPosition++;
    } else {
      oldPosition++;
      newPosition++;
    }
    this.dataJson = {
      'checklistId': this.checklistId,
      'displayOrder': oldPosition,
      'newDisplayOrder': newPosition
    };
    this.viewChecklistsControlsService.reorder(this.dataJson).subscribe(data => {
      this.preloadData();
      this.msgs = [{ severity: 'success', detail: 'Record saved Successfully' }];
    }, error => {
      this.preloadData();
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
  }

}
