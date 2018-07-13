import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import { SelectItem } from 'primeng/api';
import 'rxjs/add/observable/throw';
const allOption = { label: 'All', value: 'A' };

@Injectable()
export class AssignedChecklistService extends BaseServiceService {

  private getUserListURL = environment.serverUrl + 'DIVA-CommonService/checklist/getUserList';
  private url = 'http://168.66.39.47:8080/DIVA-ChecklistService/myOnlineScheduledChecklists';

  private urlMock = 'data/addControls-mock.json';

  constructor(private httpClient: HttpClient) {
    super();
  }
  /** to get the data for the scheduled Checklists
   * @ return scheduledResults
   */
  getScheduledChecklists(loginId) {
   this.url = environment.serverUrl + 'DIVA-ChecklistService/myOnlineScheduledChecklists';
    console.log( 'getScheduledChecklists inside');
    const inputJson = {
      'employeeLoginId' : loginId
    };
     return this.httpClient.post(this.url, inputJson,
       appConstants.postHeaderOptions).map((scheduledResults) => {
         return scheduledResults;
       }).catch(this.handleError);
  }
  /** to get the data for the InProgress Checklists
 * @ return inProgressResults
 */
  getInProgressChecklists(loginId) {
    this.url =  environment.serverUrl + 'DIVA-ChecklistService/myOnlineInprogressChecklists';
    const inputJson = {
      'employeeLoginId' : loginId
    };
     return this.httpClient.post(this.url, inputJson,
       appConstants.postHeaderOptions).map((inProgressResults) => {
         return inProgressResults;
       }).catch(this.handleError);
  }
  /** to get the data for the FollowUp Checklists
 * @ return followUpResults
 */
  getFollowUpChecklists(loginId) {
    this.url = environment.serverUrl + 'DIVA-ChecklistService/myOnlineFollowupChecklists';
    const inputJson = {
      'employeeLoginId' : loginId
    };
    return this.httpClient.post(this.url, inputJson,
      appConstants.postHeaderOptions).map((followUpResults) => {
        return followUpResults;
      }).catch(this.handleError);
  }
  /** to get the data for the Awaiting Checklists
 * @ return awaitingResults
 */
  getAwaitingChecklists(loginId) {
    this.url = environment.serverUrl + 'DIVA-ChecklistService/myOnlineAwaitingManagerReviewChecklists';
    const inputJson = {
      'employeeLoginId' : loginId
    };
    return this.httpClient.post(this.url, inputJson,
      appConstants.postHeaderOptions).map((awaitingResults) => {
        return awaitingResults;
      }).catch(this.handleError);
  }

  /** to get the data for the Manager Checklists
 * @ return managerResults
 */
geManagerChecklists(loginId) {
  this.url = environment.serverUrl + 'DIVA-ChecklistService/myOnlineManagerReviewChecklists';
  const inputJson = {
    'employeeLoginId' : loginId
  };
  return this.httpClient.post(this.url, inputJson,
    appConstants.postHeaderOptions).map((managerResults) => {
      return managerResults;
    }).catch(this.handleError);
}
  /** to get the data for the Closed Checklists
   * @ return closedResults
  */
  getClosedChecklists(loginId) {
    this.url = environment.serverUrl + 'DIVA-ChecklistService/myOnlineCompletedOrClosedChecklists';
    const inputJson = {
      'employeeLoginId' : loginId
    };
    return this.httpClient.post(this.url, inputJson,
      appConstants.postHeaderOptions).map((closedResults) => {
        return closedResults;
      }).catch(this.handleError);
  }
  getUserList(parameter) {
    return this.httpClient
      .get(this.getUserListURL, appConstants.getHeaderOptions).map((user: SelectItem[]) => {
        const userList: any = [];
        console.log('entered common services');
        if (parameter === 'display') {
          userList.push(allOption);
        }
        for (const item of user) {
          userList.push({ 'label': item['fullName'], 'value': item['loginId'] });
        }
        console.log('Before returing values from common services');
        return userList;
      }).catch(this.handleError);
  }
}
