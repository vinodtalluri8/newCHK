import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConstants } from '../../core/constants/appConstants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SelectItem } from 'primeng/api';
import { environment } from '../../../environments/environment';

const allOption = { label: 'All', value: 'A' };

@Injectable()
export class ChecklistCommonService {
  private listDepartmentsURL = environment.serverUrl + 'divacommonservice/checklist/departmentList';
  private getAssigneeURL = environment.serverUrl + 'divacommonservice/checklist/employeeList';
  private getBackupURL = environment.serverUrl + 'divacommonservice/checklist/employeeList';
  private getEvaluationURL = environment.serverUrl + 'divacommonservice/checklist/getEvaluationList';
  private getReviewerURL = environment.serverUrl + 'divacommonservice/checklist/employeeList';
  private frequencyserverURL = environment.serverUrl + 'divacommonservice/checklist/getFrequencyList';
  private primaryserverURL = environment.serverUrl + 'divacommonservice/checklist/employeeList';
  private riskserverURL = environment.serverUrl + 'divacommonservice/checklist/getRiskList';
  private statusserverURL = environment.serverUrl + 'divacommonservice/checklist/getStatusList';
  private groupserverURL = environment.serverUrl + 'divacommonservice/checklist/groupList';
  private departmentserverURL = environment.serverUrl + 'divacommonservice/checklist/departmentList';
  private onlineserverURL = environment.serverUrl + 'divacommonservice/checklist/getOnlineList';
  private userDefaultserverURL = environment.serverUrl + 'divacommonservice/checklist/userDefaultGroup';
  constructor(private httpClient: HttpClient) { }

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
      });
  }

  /** This method will get the list of assignee
   * @returns list of assignee
  **/
  getAssignee() {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.getAssigneeURL, appConstants.getHeaderOptions).map((assignee: SelectItem[]) => {
        const assigneeList: any = [];
        assigneeList.push(allOption);
        for (const item of assignee) {
          assigneeList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return assigneeList;
      });

  }


  /** This method will get the list of backup
   * @returns list of backup
  **/
  getBackup() {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.getBackupURL, appConstants.getHeaderOptions).map((backup: SelectItem[]) => {
        const backupList: any = [];
        backupList.push(allOption);
        for (const item of backup) {
          backupList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return backupList;
      });

  }


  /** This method will get the list of evaluation
   * @param subtype
   * @returns list of evaluation
  **/
  getEvaluation() {
    return this.httpClient
      .get(this.getEvaluationURL, appConstants.getHeaderOptions).map((evaluation: SelectItem[]) => {
        const evaluationList: any = [];
        evaluationList.push(allOption);
        for (const item of evaluation) {
          evaluationList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return evaluationList;
      });

  }


  /** This method will get the list of reviewer
   * @returns list of reviewer
  **/
  getReviewer() {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.getReviewerURL, appConstants.getHeaderOptions).map((reviewer: SelectItem[]) => {
        const reviewerList: any = [];
        reviewerList.push(allOption);
        for (const item of reviewer) {
          reviewerList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return reviewerList;
      });

  }

  /** This method will get the data of frequency dropdown
     * @returns frequencyList
    **/
  getFrequency() {
    return this.httpClient
      .get(this.frequencyserverURL, appConstants.getHeaderOptions).map((frequency: SelectItem[]) => {
        const frequencyList: any = [];
        frequencyList.push(allOption);
        for (const item of frequency) {
          frequencyList.push({ 'label': item['value'], 'value': item['id'] });
        }
        console.log('frequencyList', frequencyList);
        return frequencyList;
      });
  }
  /** This method will get the data of Primary dropdown
     * @returns primaryList
    **/
  getPrimary() {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.primaryserverURL, appConstants.getHeaderOptions).map((primary: SelectItem[]) => {
        const primaryList: any = [];
        primaryList.push(allOption);
        for (const item of primary) {
          primaryList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return primaryList;
      });
  }

  /** This method will get the data of Risk dropdown
     * @returns riskList
    **/
  getRisk() {
    return this.httpClient
      .get(this.riskserverURL, appConstants.getHeaderOptions).map((risk: SelectItem[]) => {
        const riskList: any = [];
        riskList.push(allOption);
        for (const item of risk) {
          riskList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return riskList;
      });
  }


  /** This method will get the data of Status dropdown
     * @returns statusList
    **/
  getStatus() {
    return this.httpClient
      .get(this.statusserverURL, appConstants.getHeaderOptions).map((status: SelectItem[]) => {
        const statusList: any = [];
        statusList.push(allOption);
        for (const item of status) {
          statusList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return statusList;
      });
  }

  /** This method will get the data of group dropdown
   * @returns groupsList
   * **/
  getGroup() {
    appConstants.getHeaderOptions.params = new HttpParams().set('loginId', 'Chuprin_a');
    return this.httpClient
      .get(this.groupserverURL, appConstants.getHeaderOptions).map((groups: SelectItem[]) => {
        const groupsList: any = [];
        for (const group of groups) {
          groupsList.push({ 'label': group['departmentName'], 'value': group['departmentName'] });
        }
        return groupsList;
      });

  }

  /** This method will get the data of group dropdown
    * @returns groupsList
    * **/
  getDepartment(subType) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
    return this.httpClient
      .get(this.departmentserverURL, appConstants.getHeaderOptions).map((department: SelectItem[]) => {
        const departmentList: any = [];
        departmentList.push(allOption);
        for (const item of department) {
          departmentList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return departmentList;
      });

  }

  /** This method will get the data of online dropdown
     * @returns onlineList
    **/
  getOnline() {
    return this.httpClient
      .get(this.onlineserverURL, appConstants.getHeaderOptions).map((online: SelectItem[]) => {
        const onlineList: any = [];
        onlineList.push(allOption);
        console.log(onlineList, 'onlineList');
        for (const item of online) {
          onlineList.push({ 'label': item['value'], 'value': item['id'] });
        }
        console.log(onlineList, 'onlineList');
        return onlineList;
      });
  }
}
