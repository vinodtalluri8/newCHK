import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';

@Injectable()
export class ChecklistScheduleService extends BaseServiceService {

  private scheduleChecklistOnline: JSON;
  private checklistData: any;
  private checklistName: string;
  private checklistFrequency: string;

  private scheduleChecklistUrl = environment.serverUrl + 'DIVA-ChecklistService/getScheduleChecklistList';
  private scheduleServerURL =  environment.serverUrl + 'DIVA-ChecklistService/getScheduledList ';
  private frequencyserverURL = environment.serverUrl + 'DIVA-CommonService/scheduleChecklist/getFrequencyList';

  setResultScheduleCriteria(scheduleChecklistOnline) {
    this.scheduleChecklistOnline = scheduleChecklistOnline;
  }

  setChecklistSchedule(record) {
    this.checklistData = record;
   }

   getChecklistSchedule() {
     return this.checklistData;
   }

   setChecklistByName(name) {
    this.checklistName = name;
   }

   getChecklistByName() {
     return this.checklistName;
   }

   setChecklistByFrequency(frequency) {
    this.checklistFrequency = frequency;
   }

   getChecklistByFrequency() {
     return this.checklistFrequency;
   }

  constructor(private httpClient: HttpClient) {
    super();
  }

   /** To get the data for the schedule checklist accordion
   * @returns results
   */
  scheduleChecklist() {
    console.log('inside schedule checklist');
    return this.httpClient.post(this.scheduleChecklistUrl, this.scheduleChecklistOnline, appConstants.postHeaderOptions).
    map((results) => {
      console.log(results);
      return results;
    }).catch(this.handleError);

  }

  /** This method will get the data of frequency dropdown
   * @returns frequencyList
  **/
  getFrequency() {
  return this.httpClient
    .get(this.frequencyserverURL, appConstants.getHeaderOptions).map((frequency: SelectItem[]) => {
      const frequencyList: any = [];
      for (const item of frequency) {
        frequencyList.push({ 'label': item['value'], 'value': item['id'] });
      }
      return frequencyList;
    }).catch(this.handleError);
  }

  /** To get the data for the  checklist scheduled grid
   * @returns results
   */
  scheduledChecklist(data) {
    return this.httpClient.post(this.scheduleServerURL, data, appConstants.postHeaderOptions).
    map((results) => {
      console.log('inside the service', results);
      return results;
    }).catch(this.handleError);
  }
  //   refreshResults() {
  //   console.log('refresh');
  //   // return this.scheduledChecklist(this.checklistId);
  // }

}
