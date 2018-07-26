import { Component, OnInit, Output, Input } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { AssignedChecklistService } from '../assigned-checklists/services/assigned-checklist.service';
import { routerConstants } from '../../core/constants/routerConstants';
import { DataGrid } from 'primeng/primeng';
import {  Location  } from '@angular/common';
@Component({
  selector: 'app-assigned-checklists',
  templateUrl: './assigned-checklists.component.html',
  styleUrls: ['./assigned-checklists.component.css']
})
export class AssignedChecklistsComponent implements OnInit {
  date: Date = new Date();
  isPaginator: boolean;
  filterable: boolean;
  exportFileName: string;
  selectedRows: number;
  msgs: Message[] = [];
  itemsPath: MenuItem[];
  home: MenuItem;
  dataDisplay = false;
  dataLength: number[] = [];

  constructor(private assignedChecklistService: AssignedChecklistService, private location: Location) {
    /** Initilase the breadcrumbs navigation data **/
    this.home = { icon: 'fa fa-home' };
    this.itemsPath = [{ label: 'My Assigned Checklists' },
    ];
  }

  ngOnInit() {
    // this.scheduledDisplay = this.assignedChecklistService.getScheduledResultsdata();

  }
  showOrHide(scheduledDataDisplay, $event, grid) {
    this.dataLength[grid] = $event;
    if ($event > 0) {
      this.dataDisplay = true;
    }
  }
  back() {
    this.location.back();
  }

}
