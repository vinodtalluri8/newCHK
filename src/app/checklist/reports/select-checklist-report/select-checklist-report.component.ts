import { ReportService } from './../services/report.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { ChecklistCommonService } from '../../services/checklist-common.service';

@Component({
  selector: 'app-select-checklist-report',
  templateUrl: './select-checklist-report.component.html',
  styleUrls: ['./select-checklist-report.component.css']
})
export class SelectChecklistReportComponent implements OnInit {
  group: Object;
  report: Object;
  itemsPath: MenuItem[];
  selectedGroup: any;
  selectedReport: any;
  home: MenuItem;
  dataJson: {
    'checklistGroup': any;
    'checklistReport': any;
  };

  constructor(private router: Router, private checklistCommonService: ChecklistCommonService, private reportService: ReportService) {
    this.itemsPath = [{
        label: 'Checklists',
        routerLink: ['/mychecklist']
      },
      {
        label: 'Reports'
      }
    ];
    this.home = {
      icon: 'fa fa-home'
    };
  }

  /** method to call data on page on load **/
  ngOnInit() {
    this.preloadData();
  }

  /** Populate all the required dropdown values during the screen load **/
  preloadData() {
    this.reportService.getReport().subscribe(data => {
      this.report = data;
    });
    this.checklistCommonService.getGroup().subscribe(data => {
      this.group = data;
    });

  }

  /** This method will enable or disable the Save button based on the mandatory fields selected **/
  disable() {
    if (!this.selectedGroup || !this.selectedReport) {
      return true;
    } else {
      return false;
    }
  }
  displayReports() {
    if (this.disable()) {
      // this.dataJson = {
      //   'checklistGroup': this.selectedGroup,
      //   'checklistReport': this.selectedReport
      // };
      this.router.navigate(['/displayReport']);
      console.log(this.dataJson, 'this.dataJson ');
    }

  }

}
