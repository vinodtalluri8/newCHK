/* This service is used to save the data for addkey control */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AddchecklistService {
  private addControlsSource = new BehaviorSubject<any[]>([]);
  currentAddControls = this.addControlsSource.asObservable();

  private serverURL = environment.serverUrl + 'divachecklistservice/addChecklistDetails';
  constructor(private httpClient: HttpClient) { }


  changeAddControls(addControls: any[]) {
    this.addControlsSource.next(addControls);
  }
  /** This method will POST the data of addkeycontrol screen to backend **/
  addChecklist(data: any) {
    return this.httpClient.post(this.serverURL,
      data, appConstants.postHeaderOptions).map((res: Response) => res);
  }
}

