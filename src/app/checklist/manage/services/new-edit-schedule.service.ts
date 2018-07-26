import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';

@Injectable()
export class NewEditScheduleService extends BaseServiceService {

  private newChecklistScheduleData: JSON;
  private dataJsonAssignment: any;
  private scheduleName: string;
  private newChecklistScheduleUrl = environment.serverUrl + 'DIVA-ChecklistService/createSchedule';
  private modifyChecklistScheduleUrl = environment.serverUrl + 'DIVA-ChecklistService/getChecklistScheduledData';
  private updateChecklistScheduleUrl = environment.serverUrl + 'DIVA-ChecklistService/updateChecklistScheduledData';

  setResultScheduleCriteria(scheduleChecklistOnline) {
    this.newChecklistScheduleData = scheduleChecklistOnline;
  }
  setJsonAssignment(dataJson) {
    this.dataJsonAssignment = dataJson;
  }
  getJsonAssignment() {
    return this.dataJsonAssignment;
  }

  setScheduleByName(name) {
    this.scheduleName = name;
  }

  getScheduleByName() {
    return this.scheduleName;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
  /** This method will POST the data of  new checklist schedule screen to backend
* @returns results
*/
  newChecklistSchedule(data) {
    console.log('inside newChecklistSchedule service', data);
    return this.httpClient.post(this.newChecklistScheduleUrl, data, appConstants.postHeaderOptions).
      map((res: Response) => res).catch(this.handleError);
  }

  /** This method will GET the data of checklist scheduled details to modify **/
  toModifyChecklistSchedule(scheduleID) {
    console.log(scheduleID);
    const inputJson = {
      'checklistScheduleID': scheduleID
    };
    console.log('inside add service n value passed is', inputJson);
    return this.httpClient.post(this.modifyChecklistScheduleUrl,
      inputJson, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will modify the data of checklist schedule details**/
  updateChecklistSchedule(data) {
    console.log('inside update service n value passed is', data);
    appConstants.putHeaderOptions.params = new HttpParams();
    return this.httpClient.put(this.updateChecklistScheduleUrl, data, appConstants.putHeaderOptions)
      .map((res: Response) => res).catch(this.handleError);
  }

}
