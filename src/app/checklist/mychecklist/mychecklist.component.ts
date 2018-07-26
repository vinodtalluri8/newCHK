import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-mychecklist',
  templateUrl: './mychecklist.component.html',
  styleUrls: ['./mychecklist.component.css']
})
export class MychecklistComponent implements OnInit {

  itemsPath: MenuItem[];
  home: MenuItem;
  displayDialog: boolean;
  isUpdate: boolean;
  dialogHeader: string;
  @Input() cancel;

  constructor(private router: Router) {
    this.home = { icon: 'fa fa-home' };

    this.itemsPath = [
      { label: 'Checklists' }];
  }

  ngOnInit() {
  }

  /* This method will navigate  to addchecklist screen */
  addChecklist() {
    this.router.navigate(['/addchecklist']);
  }
  searchChecklist() {
    this.router.navigate(['../checklist/searchchecklist']);
  }
  searchControls() {
    this.router.navigate(['../control/searchcontrol']);
  }
  createControls() {
    this.router.navigate(['../addcontrol']);
  }

  newSchedule() {
    this.router.navigate(['../managed/newchecklistschedule']);
  }

  scheduleChecklistOnline() {
    this.router.navigate(['../managed/schedulechecklist']);
  }

  updateChecklistStatus() {
    this.router.navigate(['../updatecheckliststatus']);
  }

  refresh(event) {
    console.log('refresh');
    // this.dataValues();
    this.displayDialog = event;
  }
}
