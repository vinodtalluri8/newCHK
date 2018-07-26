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
  selectedAddChecklistManager: any;
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  savedAddRecord: any;
  addRecordLength: any;
  savedDeleteRecord: any;
  deletRecordLength: any;

  constructor(private checklistCommonService: ChecklistCommonService, private messageService: MessageService,
    private checklistManagersService: ChecklistManagersService, private confirmationService: ConfirmationService) {

    this.home = {icon: 'fa fa-home'};
  /** To initialise breadcrumb data */
    this.itemsPath = [
      { label: 'Checklist', routerLink: [routerConstants.defaultRoute] },
      { label: 'Manage Checklist Managers' }];
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
      this.addRecordLength = this.addChecklistManagers.length;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });

  /** to get managers dropdown */
  this.checklistManagersService.getDeleteManagerList().subscribe(
    (data) => {
      this.managers = data;
      this.deletRecordLength = this.managers.length;
    }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });

  }
  selectedvalue(selectedAddChecklistManager) {
    console.log('value', this.addChecklistManagers[selectedAddChecklistManager]);
  }


  /** this method makes an active employee as checklist manager **/
  add(selectedAddChecklistManager) {
  console.log('add, selectedAddChecklistManager', this.selectedAddChecklistManager);

  this.checklistManagersService.addChecklistManager(selectedAddChecklistManager.value)
  .subscribe(data => {
    this.savedAddRecord = data;
    console.log('after add service is called in ts');
    this.preloadData();
    console.log('after preload data add');
    this.messageService.clearMessage();
    this.selectedAddChecklistManager = null;
    },
    error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });
    this.msgs = [{ severity: 'success', detail: 'Record Added Successfully' }];
  }


  /** to delete checklist manager**/
  delete(selectedManager) {
    console.log('delete', selectedManager);
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.checklistManagersService.deleteChecklistManager(selectedManager.value).subscribe(data => {
          console.log('after delete service is called in ts');
          this.preloadData();
          console.log('after preload data delte');
            this.msgs = [{ severity: 'success', detail: 'Record Deleted Successfully' }];
            this.selectedManager = null;
        }, error => {
          this.msgs = [{ severity: 'error', detail: 'Cannot delete checklist manager' }];
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
    // this.msgs.push({severity: 'info', summary: 'Implementation Pending', detail: 'Delete yet to be Implemented'});
  }

}
