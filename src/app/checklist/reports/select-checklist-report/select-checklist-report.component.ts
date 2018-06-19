import { ReportService } from './../services/report.service';
import { GroupService } from './../services/group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-checklist-report',
  templateUrl: './select-checklist-report.component.html',
  styleUrls: ['./select-checklist-report.component.css']
})
export class SelectChecklistReportComponent implements OnInit {
  group: Object;
  report: Object;
  selectedGroup: any;
  selectedReport: any;
  dataJson: { 'checklistGroup': any; 'checklistReport': any; };

  constructor(private groupService:GroupService,private reportService:ReportService) { }

 /** method to call data on page on load **/
 ngOnInit() {
  this.preloadData();
}

/** Populate all the required dropdown values during the screen load **/
preloadData() {
  this.reportService.getReport().subscribe(data => {
    this.report = data;
  });
  this.groupService.getGroup().subscribe(data => {
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
displayReports(){
  this.dataJson = {
    'checklistGroup': this.selectedGroup,
    'checklistReport': this.selectedReport
  };
  console.log(this.dataJson,"this.dataJson ");
}

}
