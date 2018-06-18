/**
 * This file should contains all the logic and parameters related to multiselect dropdown.
 * Any changes in this file will lead to changes in all the places
 * where ever its refered
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input() dataSource: SelectItem[];
  @Input() selectedItems: string[];
  @Input() defaultlabel: string;
  @Output() selectedMultiSelect = new EventEmitter();
  display: boolean;

  constructor() {
    this.defaultlabel = 'Select option(s)';
  }

  ngOnInit() {
  }
  /* when ever the change event is triggered, check whether value has been selected.
  Incase value has been deselected then the value would be null. Incase of null then trigger the event with none*/

  change(event) {
    if (event.value && event.value.length > 0) {
      this.selectedMultiSelect.emit(event.value);
    } else {
      this.selectedMultiSelect.emit('none');
    }

  }

  displayModel() {
    this.display = true;
  }
}
