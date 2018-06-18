/**
 * This file should contains all the logic and parameters related to dropdown.
 * Any changes in this file will lead to changes in all the places
 * where ever its refered
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';

interface Dropdown {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() datasource: SelectItem[];
  @Input() placeholder: string;
  @Input() label: string;
  @Input() showClear: boolean;
  @Input() selectedItem: string;
  @Output() selectedItemChange = new EventEmitter();

  constructor() {
    this.placeholder = 'Select option';
  }

  ngOnInit() {
  }

  change(data: any) {
    this.selectedItemChange.emit(data.value);
    console.log('change event', data.value);
  }
}
