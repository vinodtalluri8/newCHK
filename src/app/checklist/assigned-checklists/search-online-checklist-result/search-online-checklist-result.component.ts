// import { Component, OnInit } from '@angular/core';
// import { MenuItem, SelectItem } from 'primeng/api';
// import { routerConstants } from '../../../core/constants/routerConstants';
// import { AssignedChecklistService } from '../services/assigned-checklist.service';

// @Component({
//   selector: 'app-search-online-checklist-result',
//   templateUrl: './search-online-checklist-result.component.html',
//   styleUrls: ['./search-online-checklist-result.component.css']
// })
// export class SearchOnlineChecklistResultComponent implements OnInit {
//   searchOnlineChecklistResult: any = [];
//   itemsPath: MenuItem[];
//   home: MenuItem;
//   colHeaderSchedule: any[];
//   colHeaderInProgress: any[];
//   loading: boolean;
//   SOCR: any = [];
//   SOCRInProgress: any = [];
//   colHeaderFollowUp: any = [];
//   SOCRFollowUp: any = [];
//   colHeaderManaerReview: any = [];
//   SOCRManagerReview: any = [];
//   colHeaderCloseCompleted: any = [];
//   SOCRClosedCompleted: any = [];

//   constructor(private assignedChecklistService: AssignedChecklistService) {
//     this.home = { icon: 'fa fa-home' };
//     /** Initilase the breadcrumbs navigation data **/
//     this.itemsPath = [{ label: 'Checklists' },
//     { label: 'Search Online Checklist', routerLink: ['/searchonlinechecklist'] },
//     { label: 'Search Results' }
//     ];
//     this.colHeaderSchedule = [
//       { field: 'checklistName', header: 'Checklist', width: '30%' },
//       { field: 'checklistschedule', header: 'Schedule', width: '27%' },
//       { field: 'checklistFrequency', header: 'Frequency', width: '8%' },
//       { field: 'checklistReview', header: 'Review', width: '6%' },
//       { field: 'checklistDueDate', header: 'Due Date', width: '8%' },
//       { field: 'checklistAssignments', header: 'Assignments', width: '9%' },
//       { field: 'checklistProcess', header: 'Process', width: '12%' }
//     ];
//     this.colHeaderInProgress = [
//       { field: 'checklistName', header: 'Checklist', width: '29%' },
//       { field: 'checklistschedule', header: 'Schedule', width: '23%' },
//       { field: 'checklistFrequency', header: 'Frequency', width: '8%' },
//       { field: 'checklistStartDate', header: 'Start Date', width: '8%' },
//       { field: 'checklistReview', header: 'Review', width: '6%' },
//       { field: 'checklistDueDate', header: 'Due Date', width: '7%' },
//       { field: 'checklistAssignments', header: 'Assignments', width: '9%' },
//       { field: 'checklistView', header: 'View', width: '10%' }
//     ];
//     this.colHeaderFollowUp = [
//       { field: 'checklistName', header: 'Checklist', width: '22%' },
//       { field: 'checklistschedule', header: 'Schedule', width: '22%' },
//       { field: 'checklistFrequency', header: 'Frequency', width: '8%' },
//       { field: 'checklistIntendedComp', header: 'Intended Comp', width: '10%' },
//       { field: 'checklistStatus', header: 'Status', width: '6%' },
//       { field: 'checklistEndDate', header: 'End Date', width: '8%' },
//       { field: 'checklistReviewComment', header: 'Rev Cmnt', width: '8%' },
//       { field: 'checklistDueDate', header: 'Due Date', width: '8%' },
//       { field: 'checklistProcess', header: 'Process', width: '8%' }
//     ];
//     this.colHeaderManaerReview = [
//       { field: 'checklistName', header: 'Checklist', width: '22%' },
//       { field: 'checklistschedule', header: 'Schedule', width: '26%' },
//       { field: 'checklistFrequency', header: 'Frequency', width: '8%' },
//       { field: 'checklistLastRev', header: 'Last Rev', width: '7%' },
//       { field: 'checklistEndDate', header: 'End Date', width: '7%' },
//       { field: 'checklistEmployComment', header: 'Empl Comment', width: '10%' },
//       { field: 'checklistReviewComment', header: 'Rev Cmnt', width: '7%' },
//       { field: 'checklistDueDate', header: 'Due Date', width: '7%' },
//       { field: 'checklistReview', header: 'Review', width: '6%' }
//     ];
//     this.colHeaderCloseCompleted = [
//       { field: 'checklistName', header: 'Checklist', width: '19%' },
//       { field: 'checklistschedule', header: 'Schedule', width: '15%' },
//       { field: 'checklistFrequency', header: 'Frequency', width: '8%' },
//       { field: 'checklistStartDate', header: 'Start Date', width: '7%' },
//       { field: 'checklistEndDate', header: 'End Date', width: '7%' },
//       { field: 'checklistStatus', header: 'Status', width: '6%' },
//       { field: 'checklistAssignments', header: 'Assignments', width: '9%' },
//       { field: 'checklistDueDate', header: 'Due Date', width: '7%' },
//       { field: 'checklistLastToModify', header: 'Last To Modify', width: '9%' },
//       { field: 'checklistComments', header: 'Comments', width: '8%' },
//       { field: 'checklistView', header: 'View', width: '5%' }
//     ];
//   }

//   ngOnInit() {
//     this.SOCR = [
//       {
//         'checklistName': 'Director of Global Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Daily',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/06/2018',
//         'checklistAssignments': 'Abc',
//         'checklistProcess': 'Abc'
//       },
//       {
//         'checklistName': 'Director of Global Investment Support Weekly ',
//         'checklistschedule': 'Robb Mansis Weekly Checklist',
//         'checklistFrequency': 'Weekly',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/09/2018',
//         'checklistAssignments': 'Abc',
//         'checklistProcess': 'Abc'
//       },
//       {
//         'checklistName': 'ACT Team Leaders Daily Checklist',
//         'checklistschedule': 'ACT Team Leader Checklist ',
//         'checklistFrequency': 'Daily',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/06/2018',
//         'checklistAssignments': 'Abc',
//         'checklistProcess': 'Abc'
//       },
//       {
//         'checklistName': 'Director of Global Investment Support Weekly ',
//         'checklistschedule': 'Robb Mansis Weekly Checklist',
//         'checklistFrequency': 'Weekly',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/09/2018',
//         'checklistAssignments': 'Abc',
//         'checklistProcess': 'Abc'
//       },
//       {
//         'checklistName': 'Director of Global Investment Support Weekly ',
//         'checklistschedule': 'Robb Mansis Weekly Checklist',
//         'checklistFrequency': 'Weekly',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/09/2018',
//         'checklistAssignments': 'Abc',
//         'checklistProcess': 'Abc'
//       }
//     ];
//     this.SOCRInProgress = [
//       {
//         'checklistName': 'Director of Global Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Daily',
//         'checklistStartDate': '02/06/2018',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/06/2018',
//         'checklistAssignments': 'Abc',
//         'checklistView': 'Abc'
//       },
//       {
//         'checklistName': 'Director Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Daily',
//         'checklistStartDate': '02/06/2018',
//         'checklistReview': 'No',
//         'checklistDueDate': '07/08/2018',
//         'checklistAssignments': 'Abc',
//         'checklistView': 'Abc'
//       }
//     ];
//     this.SOCRFollowUp = [
//       {
//         'checklistName': 'Director of Global Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Daily',
//         'checklistIntendedComp': '02/06/2018',
//         'checklistStatus': 'No',
//         'checklistEndDate': '07/16/2018',
//         'checklistReviewComment': 'Abc',
//         'checklistDueDate': 'Abc',
//         'checklistProcess': 'Abc',
//       },
//       {
//         'checklistName': 'Director of Global Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Anually',
//         'checklistIntendedComp': '02/06/2018',
//         'checklistStatus': 'No',
//         'checklistEndDate': '07/06/2018',
//         'checklistReviewComment': 'Abc',
//         'checklistDueDate': 'Abc',
//         'checklistProcess': 'Abc',
//       }
//     ];
//     this.SOCRManagerReview = [
//       {
//         'checklistName': 'Director of Global Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Daily',
//         'checklistLastRev': '02/06/2018',
//         'checklistEndDate': '07/06/2018',
//         'checklistEmployComment': 'Good',
//         'checklistReviewComment': 'Good',
//         'checklistDueDate': '07/06/2018',
//         'checklistReview': 'Abc',
//       }
//     ];
//     this.SOCRClosedCompleted = [
//       {
//         'checklistName': 'Director of Global Investment Support Daily ',
//         'checklistschedule': 'Robb Mansis Daily Checklist',
//         'checklistFrequency': 'Daily',
//         'checklistStartDate': '02/06/2018',
//         'checklistEndDate': '07/06/2018',
//         'checklistStatus': 'Closed',
//         'checklistAssignments': 'abc',
//         'checklistDueDate': '07/06/2018',
//         'checklistLastToModify': 'Person A',
//         'checklistComments': 'Completed',
//         'checklistView': 'Abc'
//       }
//     ];
//   }
// }
