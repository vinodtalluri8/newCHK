import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { OnlineChecklistService } from '../services/online-checklist.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { appConstants } from '../../../core/constants/appConstants';

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
  routePath: string;

  constructor(private location: Location, private onlineChecklistService: OnlineChecklistService,
    private messageService: MessageService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.routePath = params['routePath'];
    });
  }

  ngOnInit() {
    /*Fetch Comments Data*/
    this.fetchCommentsData = this.onlineChecklistService.getCommentsJson();
    if (this.fetchCommentsData != null) {
      this.checklistInstanceId = this.fetchCommentsData['checklistInstanceID'];
      this.displayFrequency = this.fetchCommentsData['frequency'];
      this.checklistName = this.fetchCommentsData['checklistName'];
      this.displayStartDate = this.fetchCommentsData['startDate'];
      this.additionalComments = this.fetchCommentsData['additionalComments'];
    }
    this.home = { icon: 'fa fa-home' };
    this.header = 'Add Additional Comments';
    this.breadcrumbs();
  }

  /** This method will navigate back to search online results **/
  back() {
    if (this.routePath === 'searchonline') {
      this.router.navigate([routerConstants.searchonlinechecklistResult]);
    }
    if (this.routePath === 'myonline') {
      this.router.navigate([routerConstants.defaultRoute]);
    }
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.additionalComments = '';
    this.back();
  }

  /*method for breadcrumbs*/
  breadcrumbs() {
    if (this.routePath === 'searchonline') {
      this.itemsPath = [{ label: 'Checklists' },
      { label: 'Search Online Checklist', routerLink: ['/' + routerConstants.searchOnlineChecklistt] },
      { label: 'Search Results', routerLink: ['/' + routerConstants.searchonlinechecklistResult] },
      { label: 'Additional Comments' }
      ];
    }
    if (this.routePath === 'myonline') {
      this.itemsPath = [
        { label: 'My Assigned Checklists', routerLink: ['/' + routerConstants.defaultRoute] },
        { label: 'Additional Comments' }
      ];
    }
  }

  /*This method will add additional comments to controls*/
  saveComments() {
    this.msgs = [];
    this.dataJson = {
      'checklistInstanceID': this.checklistInstanceId,
      'modifyUser': appConstants.loginId,
      'additionalComment': this.additionalComments,
    };
    this.onlineChecklistService.addAdditionalComments(this.dataJson)
      .subscribe(data => {
        this.savedRecord = data;
        this.messageService.clearMessage();
        this.messageService.sendMessage({
          severity: 'success',
          detail: 'Comments added successfully'
        });
        this.resetAll();
        this.back();
      }, error => {
        this.msgs = [{ severity: 'error', summary: 'Cannot Add Comments For Checklist', detail: error }];
      });
  }
}
