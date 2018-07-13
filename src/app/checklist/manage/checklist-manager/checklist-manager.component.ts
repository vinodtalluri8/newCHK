import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message, ConfirmationService } from 'primeng/api';
import {ListboxModule} from 'primeng/listbox';
import { routerConstants } from '../../../core/constants/routerConstants';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { ChecklistManagersService } from '../services/checklist-managers.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-checklist-manager',
  templateUrl: './checklist-manager.component.html',
  styleUrls: ['./checklist-manager.component.css']
})
export class ChecklistManagerComponent implements OnInit {
  managers: SelectItem[];
  selectedManager: string;

  addChecklistManagers: SelectItem[];
  selectedAddChecklistManager: string;
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  savedRecord: any;

  constructor(private checklistCommonService: ChecklistCommonService, private messageService: MessageService,
    private checklistManagersService: ChecklistManagersService, private confirmationService: ConfirmationService) {

    this.home = {icon: 'fa fa-home'};
  /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklist', routerLink: [routerConstants.defaultRoute] },
      { label: 'Manage Checklist Managers' }];

    //   this.managers = [
    //     {label: 'Daily Scan of Instances', value: 'Daily Scan of Instances'}
    // ];
   }

 /** to call methods on init */
  ngOnInit() {
    this.preloadData();
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
      }
  }

  /** to get data for dropdowns from  checklist manager service*/
  preloadData() {

  /** to get active employees dropdown */
  this.checklistManagersService.getAddManagerList().subscribe(
    (data) => {
      this.addChecklistManagers = data;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });

  /** to get managers dropdown */
  this.checklistManagersService.getDeleteManagerList().subscribe(
    (data) => {
      this.managers = data;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });

  }
  /** this method makes an active employee as checklist manager **/
  add(value) {
  console.log('add, selectedAddChecklistManager', this.selectedAddChecklistManager);
  this.msgs = [{ severity: 'info', summary: 'Implemention Pending', detail: 'Add yet to be implemented' }];
  // console.log('value', value);
  // this.checklistManagersService.addChecklistManager(value)
  // .subscribe(data => {
  //   this.savedRecord = data;
  //   this.messageService.clearMessage();
  //   this.messageService.sendMessage({ severity: 'success', detail: 'Record Added Successfully' });
  //   },
  //   error => {
  //     this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
  //   });
  }
  /** to delete checklist manager**/
  delete(value) {
    console.log('delete');
    // this.msgs = [];
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete?',
    //   header: 'Delete Confirmation',
    //   icon: 'fa fa-trash',
    //   accept: () => {
    //     this.checklistManagersService.deleteChecklistManager(value).subscribe(data => {
    //       this.msgs = [{ severity: 'success', detail: 'Record Deleted Successfully' }];
    //       // this.checklistManagersService.refreshResults().subscribe(results => {
    //       //   this.checklistManagersService = results;
    //       // });
    //     }, error => {
    //       this.msgs = [{ severity: 'error', detail: 'Cannot delete checklist manager' }];
    //     });
    //   },
    //   reject: () => {
    //     this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
    //   }
    // });
    this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Delete yet to be Implemented'});
  }

}
