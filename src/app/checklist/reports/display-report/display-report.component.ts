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
    this.systemCodelabelList = [
      { field: 'evaluation', header: 'Evaluation' },
      { field: 'frequency', header: 'Frequency' },
      { field: 'checklist', header: 'Checklist' },
      { field: 'department', header: 'Department' },
      { field: 'control', header: 'Control' },
      { field: 'controlLength', header: 'Control Length' },
      { field: 'reviewLength', header: 'Review Length' },
      { field: 'savings', header: 'Savings' }
    ];
    this.sytemcodedatalist = [
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'AIM Currency Conversion',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
    {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'AIM Currency Conversion',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
    {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'AIM Currency Conversion',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
    {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'AIM Currency Conversion',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
    {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'AIM Currency Conversion',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    },
      {
      'evaluation': 'Candidate for Automation',
      'frequency':'Ad Hoc',
      'checklist':'Analytic Support Ad Hoc',
      'department':'Information Management',
      'control': 'AIM Currency Conversion',
      'controlLength':'50',
      'reviewLength':'50',
      'savings':'12.00'
    }
  ];
  }

  ngOnInit() {
  }

}
