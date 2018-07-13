import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConstants } from '../../core/constants/appConstants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SelectItem } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BaseServiceService } from '../mychecklist/services/base-service.service';
import 'rxjs/add/observable/throw';
const allOption = { label: 'All', value: 'A' };

@Injectable()
export class ChecklistCommonService extends BaseServiceService {
  private listDepartmentsURL = environment.serverUrl + 'DIVA-CommonService/checklist/departmentList';
  private getAssigneeURL = environment.serverUrl + 'DIVA-CommonService/checklist/employeeList';
  private getBackupURL = environment.serverUrl + 'DIVA-CommonService/checklist/employeeList';
  private getEvaluationURL = environment.serverUrl + 'DIVA-CommonService/checklist/getEvaluationList';
  private getReviewerURL = environment.serverUrl + 'DIVA-CommonService/checklist/employeeList';
  private frequencyserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/getFrequencyList';
  private primaryserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/employeeList';
  private riskserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/getRiskList';
  private statusserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/getStatusList';
  private groupserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/groupList';
  private departmentserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/departmentList';
  private onlineserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/getOnlineList';
  private controlserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/allControls';
  private userDefaultserverURL = environment.serverUrl + 'DIVA-CommonService/checklist/userDefaultGroup';


  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will get deafult user group selected
   * @returns user group
  **/
  getDefaultGroup() {
    appConstants.getHeaderOptions.params = new HttpParams().set('loginId', 'Chuprin_a');
    return this.httpClient
      .get(this.userDefaultserverURL, appConstants.getHeaderOptions).map((defaultgroup: SelectItem[]) => {
        const defaultgroupList: any = [];
        for (const item of defaultgroup) {
          defaultgroupList.push({ 'label': item['departmentName'], 'value': item['departmentName'] });
        }
        return defaultgroup;
      }).catch(this.handleError);
  }

  /** This method will get the list of assignee
   * @returns list of assignee
  **/
  getAssignee(parameter) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.getAssigneeURL, appConstants.getHeaderOptions).map((assignee: SelectItem[]) => {
        const assigneeList: any = [];
        if (parameter === 'display') {
          assigneeList.push(allOption);
        }
        for (const item of assignee) {
          assigneeList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return assigneeList;
      }).catch(this.handleError);

  }


  /** This method will get the list of backup
   * @returns list of backup
  **/
  getBackup(parameter) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.getBackupURL, appConstants.getHeaderOptions).map((backup: SelectItem[]) => {
        const backupList: any = [];
        if (parameter === 'display') {
          backupList.push(allOption);
        }
        for (const item of backup) {
          backupList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return backupList;
      }).catch(this.handleError);

  }


  /** This method will get the list of evaluation
   * @param subtype
   * @returns list of evaluation
  **/
  getEvaluation(parameter) {
    return this.httpClient
      .get(this.getEvaluationURL, appConstants.getHeaderOptions).map((evaluation: SelectItem[]) => {
        const evaluationList: any = [];
        if (parameter === 'display') {
          evaluationList.push(allOption);
        }
        for (const item of evaluation) {
          evaluationList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return evaluationList;
      }).catch(this.handleError);

  }


  /** This method will get the list of reviewer
   * @returns list of reviewer
  **/
  getReviewer(parameter) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.getReviewerURL, appConstants.getHeaderOptions).map((reviewer: SelectItem[]) => {
        const reviewerList: any = [];
        if (parameter === 'display') {
          reviewerList.push(allOption);
        }
        for (const item of reviewer) {
          reviewerList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return reviewerList;
      }).catch(this.handleError);

  }

  /** This method will get the data of frequency dropdown
     * @returns frequencyList
    **/
  getFrequency(parameter) {
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
  /** This method will get the data of Primary dropdown
     * @returns primaryList
    **/
  getPrimary(parameter) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.primaryserverURL, appConstants.getHeaderOptions).map((primary: SelectItem[]) => {
        const primaryList: any = [];
        if (parameter === 'display') {
          primaryList.push(allOption);
        }
        for (const item of primary) {
          primaryList.push({ 'label': item['id'], 'value': item['value'] });
        }

        return primaryList;
      }).catch(this.handleError);
  }

  /** This method will get the data of Risk dropdown
     * @returns riskList
    **/
  getRisk(parameter) {
    return this.httpClient
      .get(this.riskserverURL, appConstants.getHeaderOptions).map((risk: SelectItem[]) => {
        const riskList: any = [];
        if (parameter === 'display') {
          riskList.push(allOption);
        }
        for (const item of risk) {
          riskList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return riskList;
      }).catch(this.handleError);
  }


  /** This method will get the data of Status dropdown
     * @returns statusList
    **/
  getStatus(parameter) {
    return this.httpClient
      .get(this.statusserverURL, appConstants.getHeaderOptions).map((status: SelectItem[]) => {
        const statusList: any = [];
        if (parameter === 'display') {
          statusList.push(allOption);
        }
        for (const item of status) {
          statusList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return statusList;
      }).catch(this.handleError);
  }

  /** This method will get the data of group dropdown
   * @returns groupsList
   * **/
  getGroup(value?) {
    appConstants.getHeaderOptions.params = new HttpParams().set('loginId', 'Chuprin_a');
    return this.httpClient
      .get(this.groupserverURL, appConstants.getHeaderOptions).map((groups: SelectItem[]) => {
        const groupsList: any = [];
        if (value === 'display') {
          groupsList.push(allOption);
        }
        for (const group of groups) {
          groupsList.push({ 'label': group['departmentName'], 'value': group['departmentName'] });
        }
        return groupsList;
      }).catch(this.handleError);

  }

  /** This method will get the data of group dropdown
    * @returns groupsList
    * **/
  getDepartment(subType, parameter) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
    return this.httpClient
      .get(this.departmentserverURL, appConstants.getHeaderOptions).map((department: SelectItem[]) => {
        const departmentList: any = [];
        if (parameter === 'display') {
          departmentList.push(allOption);
        }
        for (const item of department) {
          departmentList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return departmentList;
      }).catch(this.handleError);

  }

  /** This method will get the data of online dropdown
     * @returns onlineList
    **/
  getOnline(parameter) {
    return this.httpClient
      .get(this.onlineserverURL, appConstants.getHeaderOptions).map((online: SelectItem[]) => {
        const onlineList: any = [];
        if (parameter === 'display') {
          onlineList.push(allOption);
        }
        for (const item of online) {
          onlineList.push({ 'label': item['value'], 'value': item['id'] });
        }
        return onlineList;
      }).catch(this.handleError);
  }

  getControl(parameter) {
    return this.httpClient
      .get(this.controlserverURL, appConstants.getHeaderOptions).map((control: SelectItem[]) => {
        const controlList: any = [];
        if (parameter === 'display') {
          controlList.push(allOption);
        }
        for (const item of control) {
          controlList.push({ 'label': item['value'], 'value': item['id'] });
        }
        return controlList;
      }).catch(this.handleError);
  }
}
