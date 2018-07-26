import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MychecklistComponent } from './mychecklist/mychecklist.component';
import { AddCheckListComponent } from './mychecklist/add-check-list/add-check-list.component';
import { SharedModule } from 'diva-shared-apps/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AddchecklistService } from './mychecklist/services/addchecklist.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignedChecklistsComponent } from './assigned-checklists/assigned-checklists.component';
import { AccordionModule } from 'primeng/accordion';
import { SearchChecklistService } from './mychecklist/services/search-checklist.service';
import { SearchChecklistResultsComponent } from './mychecklist/search-checklist-results/search-checklist-results.component';
import { SearchControlResultsComponent } from './mychecklist/search-control-results/search-control-results.component';
// import { AddControlService } from './mychecklist/services/add-control.service';
import { SearchchecklistComponent } from './mychecklist/searchchecklist/searchchecklist.component';
import { AddControlService } from './mychecklist/services/add-control.service';
import { ControlsComponent } from './mychecklist/search-control/search-control.component';
import { NumberonlyDirective } from './interfaces/numberonly.directive';
import { ChecklistCommonService } from './services/checklist-common.service';
import { SearchControlService } from './mychecklist/services/search-control.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';

import { CreateControlComponent } from './mychecklist/create-control/create-control.component';
import { CreateControlService } from './mychecklist/services/create-control.service';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from './services/message.service';
import { ViewChecklistsControlsComponent } from './mychecklist/view-checklists-controls/view-checklists-controls.component';
import { ViewChecklistsControlsService } from './mychecklist/services/view-checklists-controls.service';
import { InprogressChecklistComponent } from '../checklist/assigned-checklists/inprogress-checklist/inprogress-checklist.component';
import { ScheduledChecklistComponent } from '../checklist/assigned-checklists/scheduled-checklist/scheduled-checklist.component';
import { FollowupChecklistComponent } from '../checklist/assigned-checklists/followup-checklist/followup-checklist.component';
import { ClosedChecklistComponent } from '../checklist/assigned-checklists/closed-checklist/closed-checklist.component';
import { AwaitingChecklistComponent } from '../checklist/assigned-checklists/awaiting-checklist/awaiting-checklist.component';
import { AssignedChecklistService } from '../checklist/assigned-checklists/services/assigned-checklist.service';
import { ControlAssociateEditComponent } from '../checklist/mychecklist/control-associate-edit/control-associate-edit.component';
import { ReportService } from '../checklist/mychecklist/services/report.service';
import { DisplayReportComponent } from './mychecklist/display-report/display-report.component';
import { DisplayReportResultsComponent } from './mychecklist/display-report-results/display-report-results.component';
import {ListboxModule} from 'primeng/listbox';
import { SearchOnlineChecklistComponent } from '../checklist/assigned-checklists/search-online-checklist/search-online-checklist.component';

import { ChecklistManagersService } from '../checklist/manage/services/checklist-managers.service';
import { ChecklistManagerComponent } from '../checklist/manage/checklist-manager/checklist-manager.component';
import { SearchScheduleComponent } from './manage/search-schedule/search-schedule.component';
import { SearchScheduleResultsComponent } from './manage/search-schedule-results/search-schedule-results.component';

import { SearchOnlineChecklistResultComponent
 } from './assigned-checklists/search-online-checklist-result/search-online-checklist-result.component';
import { ChecklistScheduledComponent } from './manage/checklist-scheduled/checklist-scheduled.component';
import { ManagerChecklistsComponent } from './assigned-checklists/manager-checklists/manager-checklists.component';

import {AddExistingControlService} from '../checklist/mychecklist/services/add-existing-control.service';
import { OrderComponent } from './mychecklist/view-checklists-controls/order/order.component';
import { ChecklistScheduleService } from './manage/services/checklist-schedule.service';
import { ManagerAssignmentComponent } from './assigned-checklists/manager-assignment/manager-assignment.component';
import { CommentsChecklistComponent } from './assigned-checklists/comments-checklist/comments-checklist.component';
import { AssignmentComponent } from './assigned-checklists/assignment/assignment.component';
import { OnlineChecklistService } from './assigned-checklists/services/online-checklist.service';
import { SearchOnlineChecklistResultService } from './assigned-checklists/services/search-online-checklist-result.service';
import { NewChecklistScheduleComponent } from './manage/new-checklist-schedule/new-checklist-schedule.component';
import { NewEditScheduleService } from './manage/services/new-edit-schedule.service';
import { AddChecklistManagerComponent } from './assigned-checklists/add-checklist-manager/add-checklist-manager.component';

import { OnlineChecklistControlsComponent } from './assigned-checklists/online-checklist-controls/online-checklist-controls.component';
import { OnlineUpdateViewControlsComponent } from './assigned-checklists/online-update-view-controls/online-update-view-controls.component';
import { AssignmentServiceService } from './assigned-checklists/services/assignment-service.service';
import { StatusSearchOnlineChecklistService} from './assigned-checklists/services/status-search-online-checklist.service';
import { UpdateChecklistStatusComponent } from './assigned-checklists/update-checklist-status/update-checklist-status.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFontAwesomeModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,
    RouterModule,
    GrowlModule,
    TableModule,
    FormsModule,
    InputSwitchModule,
    AccordionModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    GrowlModule,
    ToolbarModule,
    DialogModule,
    ListboxModule
  ],
  declarations: [MychecklistComponent, AddCheckListComponent, SearchchecklistComponent,
    AssignedChecklistsComponent, SearchChecklistResultsComponent, SearchControlResultsComponent,
    ControlsComponent, NumberonlyDirective, ViewChecklistsControlsComponent,
    CreateControlComponent, InprogressChecklistComponent, ScheduledChecklistComponent,
    FollowupChecklistComponent, ClosedChecklistComponent, AwaitingChecklistComponent,
    DisplayReportComponent, DisplayReportResultsComponent, ControlAssociateEditComponent,
    SearchScheduleResultsComponent, SearchOnlineChecklistComponent, ChecklistManagerComponent,
    SearchScheduleComponent, ManagerChecklistsComponent, ChecklistScheduledComponent,
    OrderComponent, SearchOnlineChecklistResultComponent, AssignmentComponent, NewChecklistScheduleComponent, CommentsChecklistComponent,
    ManagerAssignmentComponent,
    AddChecklistManagerComponent, OnlineChecklistControlsComponent, OnlineUpdateViewControlsComponent, UpdateChecklistStatusComponent],


  providers : [SearchControlService, ChecklistCommonService , AddchecklistService, SearchChecklistService, AddControlService,
     ConfirmationService, MessageService, ViewChecklistsControlsService, CreateControlService, AssignedChecklistService,
     ReportService, ChecklistManagersService, AddExistingControlService, ChecklistScheduleService, OnlineChecklistService,
     SearchOnlineChecklistResultService, NewEditScheduleService, AssignmentServiceService, StatusSearchOnlineChecklistService]

})
export class ChecklistModule { }
