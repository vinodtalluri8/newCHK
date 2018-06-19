import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-report',
  templateUrl: './display-report.component.html',
  styleUrls: ['./display-report.component.css']
})
export class DisplayReportComponent implements OnInit {
  itemsPath: ({ label: string; routerLink: string[]; } | { label: string; routerLink?: undefined; })[];
  displayRows: { label: string; value: number; }[];
  selectedRows: number;
  exportFileName: string;
  dialogHeader: string;
  systemCodelabelList;
  sytemcodedatalist: any;
  constructor() {   /** Initilase the breadcrumbs navigation data **/
    this.itemsPath = [{ label: 'System Values', routerLink: ['/systemvalues'] },
    { label: 'Values' }];

    this.displayRows = [{ label: '15', value: 15 },
    { label: '20', value: 20 }, { label: '30', value: 30 },
    { label: '50', value: 50 }, { label: '100', value: 100 }];
    this.selectedRows = 15;
    this.exportFileName = 'SystemValuesList';
    this.dialogHeader = 'Add New Value';
    this.systemCodelabelList=[
      { field: 'evaluation', header: 'Evaluation' },
      { field: 'Frequency', header: 'Frequency' },
      { field: 'Checklist', header: 'Checklist' },
      { field: 'department', header: 'Department' },
      { field: 'control', header: 'Control Length' },
      { field: 'review', header: 'Review Length' },
      { field: 'savings', header: 'Savings' }
    ];
    this.sytemcodedatalist;
  }

  ngOnInit() {
  }

}
