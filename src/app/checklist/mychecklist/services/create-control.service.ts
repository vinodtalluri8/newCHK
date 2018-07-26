import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from './base-service.service';

// const allOption = { label: 'All', value: 'A' };

@Injectable()
export class CreateControlService extends BaseServiceService {

  private getProcedureURL = environment.serverUrl + 'DIVA-CommonService/checklist/getProcedures';
  private getChecklistURL = environment.serverUrl + 'DIVA-CommonService/checklist/allChecklists';
  private serverURL = environment.serverUrl + 'DIVA-ChecklistService/addDivaControl';

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
  getProcedure() {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'GIST');
    return this.httpClient
      .get(this.getProcedureURL, appConstants.getHeaderOptions).map((procedure: SelectItem[]) => {
        const procedureList: any = [];
        // procedureList.push(allOption);
        for (const item of procedure) {
          procedureList.push({ 'label': item['value'], 'value': item['id'] });
        }
        return procedureList;
      });
  }

  /** This method will POST the data of create control screen to backend **/
  createControlList(data: any) {
    this.serverURL = environment.serverUrl + 'DIVA-ChecklistService/addDivaControl';
    return this.httpClient.post(this.serverURL, data,
      appConstants.postHeaderOptions).map((res: Response) => res);
  }

  /** This method will GET the data of control details to modify **/
  getControlDetails(checklistId, taskId, displayOrder) {
    console.log(checklistId.toString(), displayOrder, taskId);
    this.serverURL = environment.serverUrl + 'DIVA-ChecklistService/getControlData';
    appConstants.getHeaderOptions.params = new HttpParams()
      .set('checklistId', checklistId).set('taskId', taskId).set('displayOrder', displayOrder);
    return this.httpClient.get(this.serverURL, appConstants.getHeaderOptions).map((data) => {
      return data;
    }).catch(this.handleError);
  }

  /** This method will modify the data of control details**/
  updateControl(data) {
    this.serverURL = environment.serverUrl + 'DIVA-ChecklistService/updateControlData';
    appConstants.putHeaderOptions.params = new HttpParams();
    return this.httpClient.put(this.serverURL, data, appConstants.putHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }
}
