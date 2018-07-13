/* This service is used to save the data for addkey control */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseServiceService } from './base-service.service';

@Injectable()
export class AddchecklistService extends BaseServiceService {
  private addControlsSource = new BehaviorSubject<any[]>([]);
  currentAddControls = this.addControlsSource.asObservable();

  private serverURL;
  constructor(private httpClient: HttpClient) {
    super();
   }


  changeAddControls(addControls: any[]) {
    this.addControlsSource.next(addControls);
  }
  /** This method will POST the data of addkeycontrol screen to backend **/
  addChecklist(data: any) {
    this.serverURL = environment.serverUrl + 'DIVA-ChecklistService//addChecklistDetails';
    return this.httpClient.post(this.serverURL,
      data, appConstants.postHeaderOptions).map((res: Response) => res);
  }

  getDataByChecklistId(checklistID: number) {
    this.serverURL =  environment.serverUrl + 'DIVA-ChecklistService/getChecklistData';
    const inputJson = {
      'checklistId' : checklistID
    };
    return this.httpClient
    .post(this.serverURL, inputJson, appConstants.postHeaderOptions).map((data) => {
        return data;
    });
    // return this.checklistbyId;
  }

  updateSystemValue(data) {
    this.serverURL = environment.serverUrl + 'DIVA-ChecklistService/updateChecklistData';
    return this.httpClient.put(this.serverURL, data, appConstants.putHeaderOptions).catch(this.handleError);
  }
}

