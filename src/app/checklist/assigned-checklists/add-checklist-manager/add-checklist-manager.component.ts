import { Component, OnInit ,  Output, Input, EventEmitter} from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem, Message } from 'primeng/api';
import { AssignedChecklistService } from '../services/assigned-checklist.service';

@Component({
  selector: 'app-add-checklist-manager',
  templateUrl: './add-checklist-manager.component.html',
  styleUrls: ['./add-checklist-manager.component.css']
})
export class AddChecklistManagerComponent implements OnInit {

  addChecklistManagerForm: FormGroup;
  activeEmployees: SelectItem[];
  selectedActiveEmployees: string[];
  msgs: Message[] = [];
  @Output() closeAddChecklistManager = new EventEmitter();
  dataJson: any;
  activeEmployeesJson: any[] = [];

  constructor( private assignedChecklist: AssignedChecklistService) {
    this.addChecklistManagerForm = new FormGroup({
      activeEmployees: new FormControl('')
    });
  }

  ngOnInit() {
    this.preloadData();
  }

  preloadData() {
    this.assignedChecklist.getActiveEmployees().subscribe(data => {
      this.activeEmployees = data;
          }, error => {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: error }];
    });


  }

   /** This method is used to  disable the save button */
   disable() {
    if (!this.selectedActiveEmployees || this.selectedActiveEmployees.length === 0) {
      return true;
    } else {
      return false;
    }
  }

    /* This method will assign the changed category value */
    changeActiveEmployees(event) {
      if (event === 'none') {
        this.selectedActiveEmployees = [];
      } else {
        this.selectedActiveEmployees = event;
      }
    }


   /** This method will navigate back to keycontrol screen **/
   back() {
    this.resetAll();
    this.closeAddChecklistManager.emit(false);
    this.addChecklistManagerForm.reset();
  }
   /** This method will reset all values to default **/
   resetAll() {
      this.selectedActiveEmployees = [];
   }

     /* This method will generate JSOn for ActiveEmployees */
  generateActiveEmployeesJson() {
    for (let i = 0; i < this.selectedActiveEmployees.length; i++) {
      this.activeEmployeesJson.push({
        'activeEmployees': this.selectedActiveEmployees[i]
      });
    }
  }

   /* This method add the data for active employees */
  addChecklistManager() {
    if (!this.disable()) {
    this.generateActiveEmployeesJson();
    this.dataJson = {
      'activeEmployees': this.activeEmployeesJson
    };
  }
   }

}

