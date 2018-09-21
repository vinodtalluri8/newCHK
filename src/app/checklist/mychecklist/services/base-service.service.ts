import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Config } from '../../../../environments/config';

@Injectable()
export class BaseServiceService {
  serverUrl: string;
  checklistServiceUrl: string;
 commonServiceURL: string;
  constructor() {
    this.serverUrl = Config.getEnvironmentVariable('serverUrl');
    this.checklistServiceUrl = Config.getEnvironmentVariable('checklistServiceUrl');
    this.commonServiceURL = Config.getEnvironmentVariable('commonServiceURL');
  }

  /** This method will handle the error**/

  handleError(error: any) {
    console.log('Error Message', error.error.message);
    console.log('Error Message', error.status);
    let errMsg = (error.error.message) ? (error.error.message) : error.message ? error.message : error.status ?
      `${error.status} - ${error.statusText}` : 'Server error';
    if (errMsg.length) {
      errMsg = errMsg.toString();
    }
    return Observable.throw(errMsg);
  }
}


