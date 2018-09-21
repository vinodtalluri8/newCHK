import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MenuItem, SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { routerConstants } from '../../../core/constants/routerConstants';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { ReportService } from '../services/report.service';
import { MessageService } from '../../services/message.service';
import { ViewChecklistsControlsService } from '../services/view-checklists-controls.service';

@Component({
  selector: 'app-display-report-results',
  templateUrl: './display-report-results.component.html',
  styleUrls: ['./display-report-results.component.css']
})
export class DisplayReportResultsComponent implements OnInit {
  public routePath: any = 'Reports';
  itemsPath: MenuItem[];
  home: MenuItem;
  msgs: Message[] = [];
  reportJson: any;
  dataJson: any;

  evaluationReportlabelList;
  reportType: string;
  evaluationReportdatalist: any;

  header: string;
  dialogHeader: string;
  isPaginator: boolean;
  filterable: boolean;
  value: string;
  loading: boolean;
  exportFileName: string;
  selectedRows: number;
  displayRows: SelectItem[];
  colHeaders: any[];


  constructor(private location: Location, private activatedRoute: ActivatedRoute,
    private router: Router, private messageService: MessageService, private reportService: ReportService,
    private viewChecklistsControlsService: ViewChecklistsControlsService) {
    /** Initilase the breadcrumbs navigation data **/
    this.home = { icon: 'fa fa-home' };
    this.itemsPath = [
      { label: 'Checklists', routerLink: [routerConstants.defaultRoute] },
      { label: 'Reports', routerLink: ['/' + routerConstants.reports] },
      { label: 'Report results' }
    ];
    this.reportJson = this.reportService.getReportJson();
    this.reportType = this.reportJson['reportType'];
    /** Initilase the column headers data **/
    if (this.reportType === 'ControlsWithoutProcs') {
      this.colHeaders = [
        { field: 'checklistName', header: 'Checklist', width: '40%' },
        { field: 'title', header: 'Control', width: '30%' },
        { field: 'primaryPerson', header: 'Primary', width: '15%' },
        { field: 'reviewPerson', header: 'Reviewer', width: '15%' }
      ];
      this.header = 'Controls Without a Procedure';
    } else if (this.reportType === 'EvalReport') {
      this.colHeaders = [
        { field: 'evaluation', header: 'Evaluation', width: '15%' },
        { field: 'title', header: 'Control', width: '15%' },
        { field: 'checklistName', header: 'Checklist', width: '30%' },
        { field: 'frequency', header: 'Frequency', width: '10%' },
        { field: 'department', header: 'Department', width: '10%' },
        { field: 'taskLength', header: 'Control Length', width: '10%' },
        { field: 'reviewLength', header: 'Review Length', width: '10%' },
        { field: 'savings', header: 'Savings', width: '10%' }
      ];
      this.header = 'Evaluation Report';
    } else if (this.reportType === 'ProcChecklists') {
      this.colHeaders = [
        { field: 'title', header: 'Title', width: '25%' },
        { field: 'checklistName', header: 'Checklist', width: '25%' },
        { field: 'description', header: 'Control Description', width: '50%' }
      ];
      this.header = 'Procedure Checklists';
    } else if (this.reportType === 'ProcsWithOutChecklists') {
      this.colHeaders = [
        { field: 'title', header: 'Title', width: '40%' },
        { field: 'department', header: 'Department', width: '20%' },
        { field: 'majorCategory', header: 'Major', width: '20%' },
        { field: 'minorCategory', header: 'Minor', width: '20%' },
      ];
      this.header = 'Procedures without a Checklist';
    } else if (this.reportType === 'YearlySumm') {
      this.colHeaders = [
        { field: 'checklist', header: 'Checklist', width: '40%' },
        { field: 'department', header: 'Department', width: '15%' },
        { field: 'frequency', header: 'Frequency', width: '15%' },
        { field: 'taskLength', header: 'Control Length', width: '15%' },
        { field: 'reviewLength', header: 'Review Length', width: '15%' }
      ];
      this.header = 'Yearly Summary';
    }
    //   this.activatedRoute.queryParams.subscribe(params => {
    //     this.reportType = params['reportType'];
    //     console.log('report type', this.reportType);
    // });

    /** Assign values to variables on page load **/
    this.displayRows = [
      { label: '15', value: 15 },
      { label: '20', value: 20 },
      { label: '30', value: 30 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }];
    this.loading = false;
    this.value = 'Report_Results';
    this.isPaginator = true;
    this.filterable = true;
    this.exportFileName = 'EvaluationReport';
    this.selectedRows = 15;
    this.loading = true;

  }
  /** method to call data on page on load **/
  ngOnInit() {
    // this.reportJson = this.reportService.getReportJson();
    // this.reportType = this.reportJson['reportType'];
    console.log('inside ng onit n report type is', this.reportType);
    this.reportService.getReportResults(this.reportJson).subscribe(data => {
      if (this.reportType === 'ControlsWithoutProcs') {

        this.evaluationReportdatalist = data['controlsWithoutProcs'];
        this.loading = false;
        console.log('this.evaluationReportdatalist', this.evaluationReportdatalist);

      } else if (this.reportType === 'EvalReport') {

        this.evaluationReportdatalist = data['evalReport'];
        this.loading = false;
        console.log('this.evaluationReportdatalist', this.evaluationReportdatalist);

      } else if (this.reportType === 'ProcChecklists') {

        this.evaluationReportdatalist = data['procChecklists'];
        this.loading = false;
        console.log('this.evaluationReportdatalist', this.evaluationReportdatalist);

      } else if (this.reportType === 'ProcsWithOutChecklists') {

        this.evaluationReportdatalist = data['procsWithOutChecklists'];
        this.loading = false;
        console.log('this.evaluationReportdatalist', this.evaluationReportdatalist);

      } else if (this.reportType === 'YearlySumm') {

        this.evaluationReportdatalist = data['yearlySumm'];
        this.loading = false;
        console.log('this.evaluationReportdatalist', this.evaluationReportdatalist);
      }

    });
    if (this.messageService.getMessage()) {
      this.msgs = [this.messageService.getMessage()];
      this.messageService.clearMessage();
    }

  }

  back() {
    this.location.back();
  }
  /** To check and enable or disable pagination**/
  checkAndEnablePage(value: number) {
    if (this.evaluationReportdatalist.length > value) {
      this.isPaginator = true;
    } else {
      this.isPaginator = false;
    }
    this.selectedRows = value;
    console.log(' mesagepage ', this.msgs);
  }

  pagination(isPaginator: boolean) {
    this.isPaginator = isPaginator;
  }

  routeTo(checklistId, checklistName) {
    console.log('inside reports  route to');
    /** This method will hit service get checklist data**/
    this.dataJson = {
      'checklistId': checklistId,
      'status': 'A',
    };
    this.viewChecklistsControlsService.setReportSearchCriteria(this.dataJson);
    this.router.navigate([routerConstants.viewchecklistControl, this.routePath, checklistId, checklistName]);
  }


}
