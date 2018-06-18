import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddchecklistService } from '../../services/addchecklist.service';
import { AddControlService } from '../../services/add-control.service';
import { ChecklistCommonService } from '../../../services/checklist-common.service';
@Component({
  selector: 'app-add-controls',
  templateUrl: './add-controls.component.html',
  styleUrls: ['./add-controls.component.css']
})
export class AddControlsComponent implements OnInit {
  dataJson: { 'existingControl': any; 'checklistcontrol': any; 'primary': any; 'department': any; 'checklistGroup': any; };
  itemsPath: { label: string; }[];
  addControls: any[];
  colHeaders: any[];
  filterable: boolean;
  inputSwitch;
  control;
  primary;
  Backup;
  reviewer;
  selectedControl;
  selectedPrimary;
  selectedBackup;
  selectedReviewer;

  constructor(private router: Router, private addchecklistService: AddchecklistService,
     private checklistCommonService: ChecklistCommonService) {
    this.colHeaders = [
      { field: 'checklistName', header: 'Checklist' },
      { field: 'description', header: 'Description' },
      { field: 'department', header: 'Department' },
      { field: 'frequency', header: 'Frequency' },
      { field: 'checklistGroup', header: 'Group' },
      { field: 'action', header: 'Action[s]' }
    ];
    this.itemsPath = [{ label: 'Checklists' },
    { label: 'Add & Search' },
    { label: 'Add Controls' }];

  }

  ngOnInit() {
    this.preloadData();
    this.addchecklistService.currentAddControls.subscribe((addControls) => {
      this.addControls = addControls;
      console.log(this.addControls);
    });
  }
  /*navigation to the data list page based on the hyperlink*/
  navigateListSystem(code: string) {
    // console.log('inside system');
    // this.router.navigate(['systemcodes/listsystemcodes', code]);
  }

  /** Populate all the required dropdown values during the screen load **/
  preloadData() {
    // this.checklistCommonService.getControl().subscribe(data => {
    //   this.control = data;
    // });
    this.checklistCommonService.getPrimary().subscribe(data => {
      this.primary = data;
    });
    this.checklistCommonService.getBackup().subscribe(data => {
      this.Backup = data;
    });
    this.checklistCommonService.getReviewer().subscribe(data => {
      this.reviewer = data;
    });
  }

  /** This method will enable or disable the Save button based on the mandatory fields selected **/
  disable() {
    if (!this.inputSwitch || !this.control || !this.primary || !this.Backup || !this.reviewer) {
      return true;
    } else {
      return false;
    }
  }

  /** This method will navigate back to keycontrol screen **/
  back() {
    this.router.navigate(['/mychecklist']);
  }

  /** This method will reset all values to default **/
  resetAll() {
    this.inputSwitch = '';
    this.control = '';
    this.primary = '';
    this.Backup = '';
    this.reviewer = '';
  }

  /** This method will save all the data in add control screen  **/
  saveControl() {
    if (!this.disable()) {
      this.dataJson = {
        'existingControl': this.inputSwitch,
        'checklistcontrol': this.control,
        'primary': this.primary,
        'department': this.reviewer,
        'checklistGroup': this.Backup,
      };
    }
  }
}
