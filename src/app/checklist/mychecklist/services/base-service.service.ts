import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';

@Injectable()
export class BaseServiceService {

  constructor() { }

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


