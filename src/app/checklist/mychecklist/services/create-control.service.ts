import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/api';

// const allOption = { label: 'All', value: 'A' };

@Injectable()
export class CreateControlService {

  private getProcedureURL = environment.serverUrl + 'DIVA-CommonService/checklist/getProcedures';
  private getChecklistURL = environment.serverUrl + 'DIVA-CommonService/checklist/allChecklists';
  private serverURL =  environment.serverUrl + 'DIVA-ChecklistService/addDivaControlChecklist';

  constructor(private httpClient: HttpClient) { }

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
      return this.httpClient.post(this.serverURL, data,
        appConstants.postHeaderOptions).map((res: Response) => res);
    }

}
