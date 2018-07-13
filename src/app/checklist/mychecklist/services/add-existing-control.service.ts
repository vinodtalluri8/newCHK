import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BaseServiceService } from './base-service.service';

@Injectable()
export class AddExistingControlService extends BaseServiceService {
   private serverURL ;
  // private serverURL = 'http://168.66.39.58:8083/addExistingControl' ;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will POST the data of add existing control screen to backend **/
  addExistingControl(data: any) {
    this.serverURL = environment.serverUrl + 'DIVA-ChecklistService/addExistingControl';
    console.log(data, 'in service');
    return this.httpClient.post(this.serverURL,
      data, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

}
