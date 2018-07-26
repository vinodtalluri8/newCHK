import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';


import 'rxjs/add/observable/throw';

@Injectable()
export class ChecklistManagersService extends BaseServiceService {

  private addManagerUrl;
  private deleteManagerUrl;
  private addDropdownUrl = environment.serverUrl + 'DIVA-CommonService/checklist/getActiveUsersNotManagers';
  private deleteDropdownUrl =  environment.serverUrl + 'DIVA-CommonService/checklist/getAllManagers';

  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will get the list of active employees for add manager dropdown
   * @returns list of active employees who are not managers
  **/
  getAddManagerList() {
  return this.httpClient
    .get(this.addDropdownUrl, appConstants.getHeaderOptions).map((evaluation: SelectItem[]) => {
    const addManagerList: any = [];
    let i = 0;
    for (const item of evaluation) {
      i++;
      addManagerList.push({ 'label': item['fullName'], 'value': { 'id': i, 'fullName': item['fullName'], 'loginId': item['loginId']} });
    }
    return addManagerList;
    }).catch(this.handleError);
  }


  /** This method will get the list of active managers for delete dropdown
   * @returns list of managers
  **/
  getDeleteManagerList() {
  return this.httpClient
    .get(this.deleteDropdownUrl, appConstants.getHeaderOptions).map((evaluation: SelectItem[]) => {
    const deleteManagerList: any = [];
    for (const item of evaluation) {
      deleteManagerList.push({ 'label': item['fullName'], 'value': { 'fullName': item['fullName'], 'loginId': item['loginId']} });
    }
    return deleteManagerList;
    }).catch(this.handleError);
  }


  /** This method will POST the data(selected manager) in add checklist manager screen to backend **/
  addChecklistManager(data: any) {
    // appConstants.postHeaderOptions.params = new HttpParams();
    console.log('inside add service n value passed is', data);
    this.addManagerUrl =  environment.serverUrl + 'DIVA-ChecklistService/adminAddManager';
    const inputJson = {
      'valueChar1': data['loginId'],
      'description': data['fullName']
    };
    console.log('inside add service n value passed is', inputJson);
    return this.httpClient.post(this.addManagerUrl,
      inputJson, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will delete the selected manager in delete checklist manager screen in backend **/
  deleteChecklistManager(value) {
    console.log('inside delete service n value passed is', value);
    this.deleteManagerUrl =  environment.serverUrl + 'DIVA-ChecklistService/adminDeleteManager';
    const inputJson = {
      'valueChar1' : value['loginId']
    };
    return this.httpClient.post(this.deleteManagerUrl, inputJson, appConstants.postHeaderOptions).map((res:
      Response) => res).catch(this.handleError);
  }

  refreshAddList() {
    return this.getAddManagerList();
  }
  refreshDeleteList() {
    return this.getDeleteManagerList();
  }

}
