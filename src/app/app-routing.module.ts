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
// tslint:disable-next-line:max-line-length
import { SearchControlResultsComponent } from './checklist/mychecklist/search-control-results/search-control-results.component';
import { ControlsComponent } from './checklist/mychecklist/search-control/search-control.component';
import { SelectChecklistReportComponent } from './checklist/reports/select-checklist-report/select-checklist-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/mychecklist', pathMatch: 'full' },
  { path: 'mychecklist', component: MychecklistComponent },
  /*{ path: 'addSearch', component: AddSearchTabsComponent, children: [
    { path: 'addchecklist', component: AddCheckListComponent},

  ] },*/
  { path: 'addchecklist', component: AddCheckListComponent},
  {path: 'addControls', component: AddControlsComponent},
  {path: 'assigned', component: AssignedChecklistsComponent},
  {path: 'control/searchcontrolresults', component: SearchControlResultsComponent},
  {path: 'checklist/checklistResults', component: SearchChecklistResultsComponent},
  { path: 'checklist/searchchecklist', component: SearchchecklistComponent },
  {path: 'control/searchcontrol', component: ControlsComponent},
  { path: 'reports', component: SelectChecklistReportComponent }

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
