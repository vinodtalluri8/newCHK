import { Component, OnInit, Output, Input } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { AssignedChecklistService } from '../assigned-checklists/services/assigned-checklist.service';

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
  dataLength: Number;

  constructor(private assignedChecklistService: AssignedChecklistService) {
    /** Initilase the breadcrumbs navigation data **/
    this.home = { icon: 'fa fa-home' };
    this.itemsPath = [{ label: 'My Online Checklists' },
    ];
  }

  ngOnInit() {
    // this.scheduledDisplay = this.assignedChecklistService.getScheduledResultsdata();

  }
  showOrHide(scheduledDataDisplay, $event) {
    this.dataLength = $event;
    if (this.dataLength > 0) {
      this.dataDisplay = true;
    }
  }

}
