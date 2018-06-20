import {
  ReportService
} from './services/report.service';
import {
  RouterModule
} from '@angular/router';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  ReportsRoutingModule
} from './reports-routing.module';
import {
  SelectChecklistReportComponent
} from './select-checklist-report/select-checklist-report.component';
import {
  SharedModule
} from 'diva-shared-apps/shared.module';
import {
  DisplayReportComponent
} from './display-report/display-report.component';
import {
  CheckboxModule,
  ConfirmDialogModule,
  ToolbarModule,
  DialogModule,
  GrowlModule,
  MessageModule,
  MessagesModule
} from 'primeng/primeng';
import {
  TableModule
} from 'primeng/table';

import {
  AngularFontAwesomeModule
} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    RouterModule,
    TableModule,
    CheckboxModule,
    ConfirmDialogModule,
    GrowlModule,
    ToolbarModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    AngularFontAwesomeModule,
  ],
  declarations: [SelectChecklistReportComponent, DisplayReportComponent],
  providers: [ReportService]
})
export class ReportsModule {}
