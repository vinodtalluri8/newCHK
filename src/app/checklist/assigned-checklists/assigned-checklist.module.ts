import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedChecklistRoutingModule } from './assigned-checklist-routing.module';
import { AssignedChecklistService } from './services/assigned-checklist.service';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    AssignedChecklistRoutingModule,
    AccordionModule,
    TableModule
  ],
  declarations: [],
  providers: [AssignedChecklistService]
})
export class AssignedChecklistModule { }
