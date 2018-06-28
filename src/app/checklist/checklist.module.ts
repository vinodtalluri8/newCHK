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
// import { SearchControlComponent } from './mychecklist/search-control/search-control.component';
// import { SearchchecklistComponent } from './mychecklist/searchchecklist/searchchecklist.component';
import { AddSearchTabsComponent } from './mychecklist/add-search-tabs/add-search-tabs.component';
import { AddControlsComponent } from './mychecklist/add-check-list/add-controls/add-controls.component';
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

import { ManageChecklistManagersComponent } from './mychecklist/manage-checklist-managers/manage-checklist-managers.component';

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
    AddSearchTabsComponent, AddControlsComponent,
    AssignedChecklistsComponent, SearchChecklistResultsComponent, SearchControlResultsComponent,
    ControlsComponent, NumberonlyDirective, ViewChecklistsControlsComponent,
    CreateControlComponent, InprogressChecklistComponent, ScheduledChecklistComponent,
    FollowupChecklistComponent, ClosedChecklistComponent, AwaitingChecklistComponent,
    DisplayReportComponent, DisplayReportResultsComponent, ControlAssociateEditComponent,
    SearchOnlineChecklistComponent, ManageChecklistManagersComponent],

  providers : [SearchControlService, ChecklistCommonService , AddchecklistService, SearchChecklistService, AddControlService,
     ConfirmationService, MessageService, ViewChecklistsControlsService, CreateControlService, AssignedChecklistService, ReportService]

})
export class ChecklistModule { }
