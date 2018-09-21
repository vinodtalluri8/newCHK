import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, SelectItem, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { ChecklistCommonService } from '../../services/checklist-common.service';
import { ReportService } from '../services/report.service';
import { routerConstants } from '../../../core/constants/routerConstants';


@Component({
  selector: 'app-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.css']
})
export class DisplayReportComponent implements OnInit {

  @ViewChild('reportSearchBtn') reportSearchBtn;
  groups: SelectItem[];
  selectedGroup: string;
  report: SelectItem[];
  selectedReport: string;

  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];

  dataJson: any;
  submitInProgress: boolean;

  constructor(private router: Router, private checklistCommonService: ChecklistCommonService, private reportService: ReportService) {
    this.itemsPath = [
      { label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Reports' }];
    this.home = { icon: 'fa fa-home' };
    this.selectedGroup = 'GIST';
  }

  /** method to call data on page on load **/
  ngOnInit() {
    this.preloadData();
  }

  /** Populate all the required dropdown values during the screen load **/
  preloadData() {
    this.reportService.getReportType().subscribe(data => {
      this.report = data;
      console.log('report data......', this.report);
    });
    this.checklistCommonService.getGroup().subscribe(data => {
      this.groups = data;
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

  displayReports(event) {
    if (event) {
      this.reportSearchBtn.disabled = true;
      this.displayReportSearch();
    }
  }

  displayReportSearch() {
    // this.msgs = [{ severity: 'info', summary: 'yet to implement', detail: 'not implemented' }];
    if (!this.disable() && !this.submitInProgress) {
      this.submitInProgress = true;
      this.dataJson = {
        'group': this.selectedGroup,
        'reportType': this.selectedReport
      };
      this.reportService.setReportJson(this.dataJson);
      this.router.navigate([routerConstants.displayreports]);
      console.log(this.dataJson, 'this.dataJson');
    }
    this.submitInProgress = false;
  }
}
