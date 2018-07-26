import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments-checklist',
  templateUrl: './comments-checklist.component.html',
  styleUrls: ['./comments-checklist.component.css']
})
export class CommentsChecklistComponent implements OnInit {

  displayFrequency: string;
  displayStartDate: string;
  header: string;
  checklistName: string;
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  additionalComments: string;
  savedRecord: any;
  dataJson: any;
  checklistInstanceId: number;
  fetchCommentsData: any;

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    /*Fetch Comments Data*/
    this.fetchCommentsData = this.onlineChecklistService.getCommentsJson();
    if (this.fetchCommentsData != null) {
      this.checklistInstanceId = this.fetchCommentsData['checklistInstanceID'];
      this.displayFrequency = this.fetchCommentsData['frequency'];
      this.checklistName = this.fetchCommentsData['checklistName'];
      this.displayStartDate = this.fetchCommentsData['startDate'];
    }
    this.home = { icon: 'fa fa-home' };
    this.header = 'Add Additional Comments';
    this.breadcrumbs();
  }

  /** This method will navigate back to search online results **/
  back() {
    this.location.back();
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.additionalComments = '';
  }

  /*method for breadcrumbs*/
  breadcrumbs() {
    this.itemsPath = [{ label: 'Checklists' },
    { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
    { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
    { label: 'Additional Comments' }
    ];
  }

  /*This method will add additional comments to controls*/
  saveComments() {
    this.msgs = [];
    this.dataJson = {
      'checklistInstanceID': this.checklistInstanceId,
      'modifyUser': 'divatest_sa1',
      'additionalComment': this.additionalComments,
    };
    this.onlineChecklistService.addAdditionalComments(this.dataJson)
      .subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({
          severity: 'success',
          detail: 'Added Comments Successfully'
        });
        this.resetAll();
        this.back();
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot Add Comments For Checklist', detail: error }];
      });
  }
}
