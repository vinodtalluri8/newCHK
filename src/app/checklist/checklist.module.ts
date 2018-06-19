import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MychecklistComponent } from './mychecklist/mychecklist.component';
import { AddCheckListComponent } from './mychecklist/add-check-list/add-check-list.component';
import { SharedModule } from 'diva-shared-apps/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {AddchecklistService} from './mychecklist/services/addchecklist.service';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
// import { SearchControlComponent } from './mychecklist/search-control/search-control.component';
 // import { SearchchecklistComponent } from './mychecklist/searchchecklist/searchchecklist.component';
import { AddSearchTabsComponent } from './mychecklist/add-search-tabs/add-search-tabs.component';
import { AddControlsComponent } from './mychecklist/add-check-list/add-controls/add-controls.component';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignedChecklistsComponent } from './assigned-checklists/assigned-checklists.component';
import {AccordionModule} from 'primeng/accordion';
import { SearchChecklistService } from './mychecklist/services/search-checklist.service';
import { SearchChecklistResultsComponent } from './mychecklist/search-checklist-results/search-checklist-results.component';
import { SearchControlResultsComponent } from './mychecklist/search-control-results/search-control-results.component';
// import { AddControlService } from './mychecklist/services/add-control.service';
import { SearchchecklistComponent } from './mychecklist/searchchecklist/searchchecklist.component';
// import { ChecklistCommonService } from './services/checklist-common.service';
import { AddControlService } from './mychecklist/services/add-control.service';
import { ControlsComponent } from './mychecklist/search-control/search-control.component';
import { NumberonlyDirective } from './interfaces/numberonly.directive';
import { ChecklistCommonService } from './services/checklist-common.service';
import { SearchControlService } from './mychecklist/services/search-control.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';

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
    ConfirmDialogModule
  ],
  declarations: [MychecklistComponent, AddCheckListComponent, SearchchecklistComponent,
       AddSearchTabsComponent, AddControlsComponent,
    AssignedChecklistsComponent, SearchChecklistResultsComponent, SearchControlResultsComponent,
    ControlsComponent, NumberonlyDirective],
  providers : [SearchControlService, ChecklistCommonService , AddchecklistService, SearchChecklistService, AddControlService,
     ConfirmationService]
})
export class ChecklistModule { }
