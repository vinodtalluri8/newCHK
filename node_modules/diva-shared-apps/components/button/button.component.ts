/**
 * This file should contains all the logic and parameters related to button.
 * Any changes in this file will lead to changes in all the places
 * where ever its refered
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() method: string;
  @Input() label: string;
  @Input() styleClass: string;
  @Input() disabled: boolean;
  constructor() {
    this.styleClass = 'btn btn-danger';
  }

  ngOnInit() {
  }


}
