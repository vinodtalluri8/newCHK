import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayReportComponent } from './display-report/display-report.component';

const routes: Routes = [
  {path: 'displayReport', component: DisplayReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
