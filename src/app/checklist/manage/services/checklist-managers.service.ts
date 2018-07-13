import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';


import 'rxjs/add/observable/throw';

@Injectable()
export class ChecklistManagersService extends BaseServiceService {

  private searchCriteria;
  private url;
  private addManagerUrl = 'http://168.66.39.58:8080/DIVA-CommonService/checklist/getActiveUsersNotManagers';
  private deleteManagerUrl = 'http://168.66.39.58:8080/DIVA-CommonService/checklist/getAllManagers';
  private getBackupURL = environment.serverUrl + 'DIVA-CommonService/checklist/employeeList';

  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will get the list of active employees who are not managers
   * @returns list of active employees who are not managers
  **/
  getAddManagerList() {
  return this.httpClient
    .get(this.addManagerUrl, appConstants.getHeaderOptions).map((evaluation: SelectItem[]) => {
    const addManagerList: any = [];
    for (const item of evaluation) {
      addManagerList.push({ 'label': item['fullName'], 'value': item['fullName'] });
    }
    return addManagerList;
    }).catch(this.handleError);
  }


  /** This method will get the list of active managers
   * @returns list of managers
  **/
  getDeleteManagerList() {
  return this.httpClient
    .get(this.deleteManagerUrl, appConstants.getHeaderOptions).map((evaluation: SelectItem[]) => {
    const deleteManagerList: any = [];
    for (const item of evaluation) {
      deleteManagerList.push({ 'label': item['fullName'], 'value': item['fullName'] });
    }
    return deleteManagerList;
    }).catch(this.handleError);
  }


  /** This method will POST the data(selected manager) in add checklist manager screen to backend **/
  addChecklistManager(data: string) {
    // appConstants.postHeaderOptions.params = new HttpParams();
    console.log('inside add service n value passed is', data);
    this.addManagerUrl = environment.serverUrl + 'DIVA-ChecklistService/getDisplayChecklist';
    return this.httpClient.post(this.addManagerUrl,
      data, appConstants.postHeaderOptions).map((res: Response) => res);
  }

  /** This method will delete the selected manager in delete checklist manager screen in backend **/
  deleteChecklistManager(value) {
    console.log('inside delete service n value passed is', value);
    this.deleteManagerUrl = environment.serverUrl + 'DIVA-ChecklistService/deleteChecklist/' + value;
    appConstants.deleteHeaderOptions.params = {};
    return this.httpClient.delete(this.deleteManagerUrl, appConstants.deleteHeaderOptions).catch(this.handleError);
  }

}
