import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';


@Injectable()
export class SearchControlService {

  public controlResultSearch;
  url = environment.serverUrl + 'divachecklistservice/getdisplayControlchecklist';

  getControlResultSearch() {
  return this.controlResultSearch;
  }

  setControlResultSearch(controlsResults) {
  this.controlResultSearch = controlsResults;
  }



  constructor(private httpClient: HttpClient) { }


  /** This method will POST the data of search controls screen to backend **/
  fetchSearchControlList(data: JSON) {
    return this.httpClient.post(this.url, data, appConstants.postHeaderOptions).
    map((controlsResults) => {
      return  controlsResults;
    });
    // .catch(this.handleError);

  }
     /** This method will handle the error for add system code screen**/
  // private handleError(error: any) {
  //   const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   return Observable.throw(errMsg);
  // }
}
