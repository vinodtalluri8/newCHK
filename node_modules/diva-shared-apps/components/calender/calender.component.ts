/**
 * This file should contains all the logic and parameters related to calender.
 * Any changes in this file will lead to changes in all the places
 * where ever its refered
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  @Input() inputDate: Date;
  @Input() showIcon: boolean;
  @Input() dateFormat: string;
  @Input() monthNavigator: boolean;
  @Input() yearNavigator: boolean;
  @Input() yearRange: string;
  @Input() placeholder: string;
  @Output() calenderSelected = new EventEmitter();
  constructor() {
    this.dateFormat = 'mm/dd/yy';
    this.placeholder = 'MM/DD/YYYY';
  }

  ngOnInit() {
    this.inputDate = new Date();
    this.change(this.inputDate);
  }

  change(event) {
    this.calenderSelected.emit((event.getMonth() + 1)
      + '/' + event.getDate() + '/' + event.getFullYear());
  }
}
