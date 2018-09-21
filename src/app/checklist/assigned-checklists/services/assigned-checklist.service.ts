import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import { SelectItem } from 'primeng/api';
import 'rxjs/add/observable/throw';
const allOption = { label: 'All', value: 'A' };

@Injectable()
export class AssignedChecklistService extends BaseServiceService {

  private getUserListURL = this.serverUrl + this.commonServiceURL + 'checklist/getUserList';
  private url: any; // 'http://168.66.39.47:8080/DIVA-ChecklistService/myOnlineScheduledChecklists';
  private urlMock = 'data/addControls-mock.json';
  private frequencyserverURL = this.serverUrl + this.commonServiceURL + 'scheduleChecklist/getFrequencyList';

  constructor(private httpClient: HttpClient) {
    super();
  }
  /** to get the data for the scheduled Checklists
   * @ return scheduledResults
   */
  getScheduledChecklists(loginId) {
    this.url = this.serverUrl + this.checklistServiceUrl + 'myOnlineScheduledChecklists';
    const inputJson = {
      'employeeLoginId': loginId
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
    this.url = this.serverUrl + this.checklistServiceUrl + 'myOnlineInprogressChecklists';
    const inputJson = {
      'employeeLoginId': loginId
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
    this.url = this.serverUrl + this.checklistServiceUrl + 'myOnlineFollowupChecklists';
    const inputJson = {
      'employeeLoginId': loginId
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
    this.url = this.serverUrl + this.checklistServiceUrl + 'myOnlineAwaitingManagerReviewChecklists';
    const inputJson = {
      'employeeLoginId': loginId
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
    this.url = this.serverUrl + this.checklistServiceUrl + 'myOnlineManagerReviewChecklists';
    const inputJson = {
      'managerLoginId': loginId
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
    this.url = this.serverUrl + this.checklistServiceUrl + 'myOnlineCompletedOrClosedChecklists';
    const inputJson = {
      'employeeLoginId': loginId
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
        if (parameter === 'display') {
          userList.push(allOption);
        }
        for (const item of user) {
          userList.push({ 'label': item['fullName'], 'value': item['loginId'] });
        }
        return userList;
      }).catch(this.handleError);
  }

  /** to post the data for the modifymanager Assignment */
  modifyManagerAssignment(data: any) {
    this.url = this.serverUrl + this.checklistServiceUrl + 'modifyAssignment';
    return this.httpClient.post(this.url,
      data, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);

  }

  /** to check whether the selected manager and
   * back up manager are active in modify
   * assignment screen
   */
  checkManagerActive(employeeId) {
    this.url = this.serverUrl + this.checklistServiceUrl + 'checkForActiveUser';
      const data = {
      'employeeLoginId': employeeId
    };
    return this.httpClient.post(this.url,
      data, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);

  }

  /** to post the data for the add manager Assignment */
  addManagerAssignment(data: any) {
    this.url = this.serverUrl + this.checklistServiceUrl + 'addAssignment';
    return this.httpClient.post(this.url,
      data, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);

  }

  /** This method will get the data of frequency dropdown
  * @returns frequencyList
 **/
  getFrequency(parameter?) {
    return this.httpClient
      .get(this.frequencyserverURL, appConstants.getHeaderOptions).map((frequency: SelectItem[]) => {
        const frequencyList: any = [];
        if (parameter === 'display') {
          frequencyList.push(allOption);
        }
        for (const item of frequency) {
          frequencyList.push({ 'label': item['value'], 'value': item['id'] });
        }
        return frequencyList;
      }).catch(this.handleError);
  }

  deleteAssignments(dataJson) {
    this.url = this.serverUrl + this.checklistServiceUrl + 'deleteAssignment';
    return this.httpClient.post(this.url, dataJson, appConstants.postHeaderOptions).map((res:
      Response) => res).catch(this.handleError);

  }


  /**to get the employee dropdown
   * @returns employeeList
   */
  getEmployee() {
    this.url = this.serverUrl + this.commonServiceURL + 'checklist/getAllActiveUsers';
     return this.httpClient
      .get(this.url, appConstants.getHeaderOptions).map((employee: SelectItem[]) => {
        const employeeList: any = [];
        for (const item of employee) {
          employeeList.push({ 'label': item['fullName'], 'value': item['loginId'] });
        }
        return employeeList;
      }).catch(this.handleError);
  }

  /**to get the Manager and backup Manager dropdown
   * @returns managerlist
  */
  getManager() {
    this.url = this.serverUrl + this.commonServiceURL + 'checklist/getAllManagers';
    return this.httpClient
      .get(this.url, appConstants.getHeaderOptions).map((manager: SelectItem[]) => {
        const managerList: any = [];
        for (const item of manager) {
          managerList.push({ 'label': item['fullName'], 'value': item['loginId'] });
        }
        return managerList;
      }).catch(this.handleError);
  }

  /**to get the Manager and backup Manager dropdown
 * @returns activeEmployeeslist
*/
  getActiveEmployees() {
    this.url = this.serverUrl + this.commonServiceURL + 'checklist/getActiveUsersNotManagers';
    return this.httpClient
      .get(this.url, appConstants.getHeaderOptions).map((activeEmployees: SelectItem[]) => {
        const activeEmployeesList: any = [];
        for (const item of activeEmployees) {
          activeEmployeesList.push({ 'label': item['fullName'], 'value': item['loginId'] });
        }
        return activeEmployeesList;
      }).catch(this.handleError);
  }
  /**to get the active manager dropdown in add new
   *  checklist manager screen
 * @returns activeEmployeeslist
*/
getActiveEmployeeForChecklist() {
  this.url = this.serverUrl + this.commonServiceURL + 'checklist/getActiveUsersNotManagers';
  return this.httpClient
    .get(this.url, appConstants.getHeaderOptions).map((activeEmployees: SelectItem[]) => {
      const activeEmployeesList: any = [];
      for (const item of activeEmployees) {
        activeEmployeesList.push({ 'label': item['fullName'], 'value': { 'fullName': item['fullName'] , 'loginId': item['loginId'] }});
      }
      return activeEmployeesList;
    }).catch(this.handleError);
}

}
