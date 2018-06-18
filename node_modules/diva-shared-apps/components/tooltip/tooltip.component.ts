/**
 * This file should contains all the logic and parameters related to Tooltip.
 * Any changes in this file will lead to changes in all the places
 * where ever its refered
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  @Input() logoSrc: string;
  @Input() message: string;
  @Input() position: string;

  constructor() {
    this.position = 'top';
  }

  ngOnInit() {
  }

}
