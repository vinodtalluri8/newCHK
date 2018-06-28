/** This file is contains the routing for the checklist application **/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MychecklistComponent } from './checklist/mychecklist/mychecklist.component';
import { AddCheckListComponent } from './checklist/mychecklist/add-check-list/add-check-list.component';
import { ChecklistModule } from './checklist/checklist.module';
import { AddSearchTabsComponent } from './checklist/mychecklist/add-search-tabs/add-search-tabs.component';
import { AddControlsComponent } from './checklist/mychecklist/add-check-list/add-controls/add-controls.component';
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

import { ManageChecklistManagersComponent } from './checklist/mychecklist/manage-checklist-managers/manage-checklist-managers.component';

import {SearchOnlineChecklistComponent} from './checklist/assigned-checklists/search-online-checklist/search-online-checklist.component';

const routes: Routes = [
  { path: '', redirectTo: '/assigned', pathMatch: 'full' },
  { path: 'mychecklist', component: MychecklistComponent },
  /*{ path: 'addSearch', component: AddSearchTabsComponent, children: [
    { path: 'addchecklist', component: AddCheckListComponent},

  ] },*/
  { path: 'addchecklist', component: AddCheckListComponent },
  { path: 'modifychecklist/:id', component: AddCheckListComponent },
  { path: 'addControls', component: AddControlsComponent },
  { path: 'assigned', component: AssignedChecklistsComponent },
  { path: 'control/searchcontrolresults', component: SearchControlResultsComponent },
  { path: 'checklist/checklistResults', component: SearchChecklistResultsComponent },
  { path: 'checklist/searchchecklist', component: SearchchecklistComponent },
  {path: 'checklist/managechecklistmanagers', component: ManageChecklistManagersComponent},
  { path: 'control/searchcontrol', component: ControlsComponent },
  { path: 'checklist/myonlinechecklist', component: AssignedChecklistsComponent },
  { path: 'addcontrol/:checklistId', component: CreateControlComponent },
  { path : 'checklist/reports', component: DisplayReportComponent},
  {path : 'checklist/reports/reportresults', component: DisplayReportResultsComponent},
  { path: 'checklists/controlassociateedit', component: ControlAssociateEditComponent},
  { path: 'controls/viewChecklistsControls', component: ViewChecklistsControlsComponent },
  { path: 'controls/viewChecklistsControls/:routePath', component: ViewChecklistsControlsComponent }/*,
  {path: 'searchonlinechecklist', component: SearchOnlineChecklistComponent}*/
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
