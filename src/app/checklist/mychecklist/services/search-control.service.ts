import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';
import { BaseServiceService } from './base-service.service';


@Injectable()
export class SearchControlService extends BaseServiceService {

  public controlResultSearch;
  private url = environment.serverUrl + 'divachecklistservice/getDisplayControlChecklist';

  getControlResultSearch() {
    return  this.controlResultSearch;
  }

  setControlResultSearch(controlsResults) {
    this.controlResultSearch = controlsResults;
  }



  constructor(private httpClient: HttpClient) {
    super();
  }


  /** This method will POST the data of search controls screen to backend **/
  fetchSearchControlList(data: JSON) {
    return this.httpClient.post(this.url, data, appConstants.postHeaderOptions).
      map((controlsResults) => {
        return controlsResults;
      }).catch(this.handleError);

  }
}
