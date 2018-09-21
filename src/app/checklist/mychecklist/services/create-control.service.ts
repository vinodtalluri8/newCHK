import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from './base-service.service';

// const allOption = { label: 'All', value: 'A' };

@Injectable()
export class CreateControlService extends BaseServiceService {

  private getProcedureURL = this.serverUrl + this.commonServiceURL + 'checklist/getProcedures';
  private getChecklistURL = this.serverUrl + this.commonServiceURL + 'checklist/allChecklists';
  private serverURL = this.serverUrl + this.checklistServiceUrl + 'addDivaControl';
  private getControlURL;


  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will get the data of Checklist dropdown
    * @returns checklistList
   **/
  getChecklist() {
    return this.httpClient
      .get(this.getChecklistURL, appConstants.getHeaderOptions).map((checklist: SelectItem[]) => {
        const checklistList: any = [];
        // checklistList.push(allOption);
        for (const item of checklist) {
          checklistList.push({ 'label': item['value'], 'value': item['id'] });
        }
        console.log(checklistList, 'checklistList');
        return checklistList;
      });
  }

  /** This method will get the data of Procedure dropdown
   * @returns procedureList
  **/
  getProcedure(getInactiveProcedure?) {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'GIST');
    return this.httpClient
      .get(this.getProcedureURL, appConstants.getHeaderOptions).map((procedure: SelectItem[]) => {
        const procedureList: any = [];
        // procedureList.push(allOption);
        for (const item of procedure)  {
          if (getInactiveProcedure === 'inactive') {
            procedureList.push({ 'label': item['value'], 'value': { 'id': item['id'], 'procLabel': item['value']}});
          } else {
            procedureList.push({ 'label': item['value'], 'value': item['id'] });
          }
        }
        return procedureList;
      });
  }

  /** This method will POST the data of create control screen to backend **/
  createControlList(data: any) {
    this.serverURL = this.serverUrl + this.checklistServiceUrl + 'addDivaControl';
    return this.httpClient.post(this.serverURL, data,
      appConstants.postHeaderOptions).map((res: Response) => res);
  }

  /** This method will GET the data of control details to modify **/

  getControlDetails(getControlCriteria) {
    console.log('criteria', getControlCriteria);
    this.getControlURL = this.serverUrl + this.checklistServiceUrl + 'getControlData';
    return this.httpClient.post(this.getControlURL, getControlCriteria, appConstants.postHeaderOptions).map((data) => {
      console.log('in service', data);
      return data;
    }).catch(this.handleError);
  }
  /** This method will modify the data of control details**/
  updateControl(data) {
    this.serverURL = this.serverUrl + this.checklistServiceUrl + 'updateControlData';
    appConstants.putHeaderOptions.params = new HttpParams();
    return this.httpClient.put(this.serverURL, data, appConstants.putHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }
}
