import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, SelectItem } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-checklist-status',
  templateUrl: './update-checklist-status.component.html',
  styleUrls: ['./update-checklist-status.component.css']
})
export class UpdateChecklistStatusComponent implements OnInit {

  displayFrequency: string;
  displayStartDate: string;
  checklistName: string;
  header: string;
  savedRecord: any;
  dataJson: any;
  checklistInstanceId: number;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

  status: SelectItem[];
  selectedStatus: string;
  additionalComments: string;


  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private route: ActivatedRoute) {
      this.home = { icon: 'fa fa-home' };
      this.status = [
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Complete', value: 'Complete' }];
      this.selectedStatus = 'In Progress';
      this.route.params.subscribe(params => {
        this.checklistInstanceId = params['checklistInstanceId'];
      });
     }

  ngOnInit() {
    this.displayFrequency = 'Daily';
    this.displayStartDate = '26/7/2018';
    this.header = 'Update Checklist Status';
    this.breadcrumbs();
  }
    /** This method will navigate back to search online results **/
    back() {
      this.location.back();
    }

    /** This method will reset all values to default **/
    resetAll() {
      this.selectedStatus = 'In Progress',
      this.additionalComments = '';
    }
      /*method for breadcrumbs*/
  breadcrumbs() {
    this.itemsPath = [{ label: 'Checklists' },
    { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
    { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
    { label: 'Update Checklist Status' }
    ];
  }

  /*This method will add additional comments to controls*/
  saveComments() {
    this.msgs = [];
    this.dataJson = {
      'checklistInstanceID': this.checklistInstanceId,
      'modifyUser': 'divatest_sa1',
      'status': this.selectedStatus,
      'additionalComment': this.additionalComments,
    };

    this.onlineChecklistService.updateChecklistStatus(this.dataJson)
      .subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({
          severity: 'success',
          detail: 'Checklist Status Updated Successfully'
        });
        this.resetAll();
        this.back();
      });
  }

}
