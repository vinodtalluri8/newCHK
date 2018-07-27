/** This file is contains the routing for the checklist application **/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MychecklistComponent } from './checklist/mychecklist/mychecklist.component';
import { AddCheckListComponent } from './checklist/mychecklist/add-check-list/add-check-list.component';
import { ChecklistModule } from './checklist/checklist.module';
import { SearchChecklistResultsComponent } from './checklist/mychecklist/search-checklist-results/search-checklist-results.component';
import { AssignedChecklistsComponent } from './checklist/assigned-checklists/assigned-checklists.component';
import { SearchchecklistComponent } from './checklist/mychecklist/searchchecklist/searchchecklist.component';
import { SearchControlResultsComponent } from './checklist/mychecklist/search-control-results/search-control-results.component';
import { ControlsComponent } from './checklist/mychecklist/search-control/search-control.component';

import { ControlAssociateEditComponent } from './checklist/mychecklist/control-associate-edit/control-associate-edit.component';

import { CreateControlComponent } from './checklist/mychecklist/create-control/create-control.component';
import { DisplayReportComponent } from './checklist/mychecklist/display-report/display-report.component';
import { DisplayReportResultsComponent } from './checklist/mychecklist/display-report-results/display-report-results.component';
import { ViewChecklistsControlsComponent } from './checklist/mychecklist/view-checklists-controls/view-checklists-controls.component';

import { SearchOnlineChecklistComponent } from './checklist/assigned-checklists/search-online-checklist/search-online-checklist.component';

import {
  SearchOnlineChecklistResultComponent
} from './checklist/assigned-checklists/search-online-checklist-result/search-online-checklist-result.component';
import { SearchScheduleComponent } from './checklist/manage/search-schedule/search-schedule.component';
import { ChecklistManagerComponent } from './checklist/manage/checklist-manager/checklist-manager.component';
import { SearchScheduleResultsComponent } from './checklist/manage/search-schedule-results/search-schedule-results.component';
import { ChecklistScheduledComponent } from './checklist/manage/checklist-scheduled/checklist-scheduled.component';
import { OrderComponent } from './checklist/mychecklist/view-checklists-controls/order/order.component';
import { AssignmentComponent } from './checklist/assigned-checklists/assignment/assignment.component';
import { NewChecklistScheduleComponent } from './checklist/manage/new-checklist-schedule/new-checklist-schedule.component';
import {
  OnlineChecklistControlsComponent
} from './checklist/assigned-checklists/online-checklist-controls/online-checklist-controls.component';
import {
  OnlineUpdateViewControlsComponent
} from './checklist/assigned-checklists/online-update-view-controls/online-update-view-controls.component';

import { CommentsChecklistComponent } from './checklist/assigned-checklists/comments-checklist/comments-checklist.component';
import { UpdateChecklistStatusComponent } from './checklist/assigned-checklists/update-checklist-status/update-checklist-status.component';

const routes: Routes = [
  { path: '', redirectTo: 'assigned/viewassigned', pathMatch: 'full' },
  { path: 'mychecklist', component: MychecklistComponent },
  {
    path: 'checklists', children: [
      { path: 'addchecklist', component: AddCheckListComponent },
      { path: 'modifychecklist/:id', component: AddCheckListComponent },
      { path: 'searchchecklist', component: SearchchecklistComponent },
      { path: 'searchchecklist/checklistResults', component: SearchChecklistResultsComponent },
      { path: 'searchcontrol', component: ControlsComponent },
      { path: 'searchcontrol/searchcontrolresults', component: SearchControlResultsComponent },
      { path: 'viewChecklistsControls/:routePath/:checklistId/:checklistName', component: ViewChecklistsControlsComponent },
      { path: 'addcontrol/:routePath/:checklistId/:checklistName/:records', component: CreateControlComponent },
      { path: 'reports', component: DisplayReportComponent },
      { path: 'reportresults', component: DisplayReportResultsComponent },
      { path: 'modifycontrols/:routePath/:checklistId/:taskId/:checklistName/:displayOrder/:records', component: CreateControlComponent },
      { path: 'order/:routePath/:checklistId/:checklistName', component: OrderComponent },
      { path: 'viewChecklistsControls', component: ViewChecklistsControlsComponent }
    ]
  }, {
    path: 'assigned', children: [
      { path: 'viewassigned', component: AssignedChecklistsComponent }
    ]
  }, {
    path: 'managed', children: [
      { path: 'checklistmanager', component: ChecklistManagerComponent },
      { path: 'schedulechecklist', component: SearchScheduleComponent },
      { path: 'schedulechecklist/schedulechecklistresults', component: SearchScheduleResultsComponent },
      { path: 'schedulechecklist/schedulechecklistresults/checklistscheduled', component: ChecklistScheduledComponent },
      { path: 'newchecklistschedule/:routePath', component: NewChecklistScheduleComponent },
      { path: 'newchecklistschedule', component: NewChecklistScheduleComponent },
      { path: 'editchecklistschedule/:routePath/:checklistScheduleID', component: NewChecklistScheduleComponent },
    ]
  }, {
    path: 'searchonlinechecklist', children: [
      { path: '', component: SearchOnlineChecklistComponent },
      // { path: 'results/assignment/:fromGrid', component: AssignmentComponent },
      { path: 'assignments/:fromGrid', component: AssignmentComponent },
      { path: 'comments/:checklistInstanceId', component: CommentsChecklistComponent },
      { path: 'checklistControls', component: OnlineChecklistControlsComponent },
      { path: 'viewControl', component: OnlineUpdateViewControlsComponent },
      { path: 'results/:statusVal', component: SearchOnlineChecklistResultComponent },
      { path: 'results', component: SearchOnlineChecklistResultComponent },
      { path: 'updatecheckliststatus', component: UpdateChecklistStatusComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ChecklistModule
  ],
  exports: [RouterModule, ChecklistModule],
  declarations: []
})
export class AppRoutingModule { }
