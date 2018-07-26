import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';
import { BaseServiceService } from './base-service.service';
import 'rxjs/add/observable/throw';


@Injectable()
export class SearchControlService extends BaseServiceService {

  public searchCriteria;
  private url = environment.serverUrl + 'DIVA-ChecklistService/getDisplayControlChecklist';

  setSearchCriteria(searchCriteria) {
    this.searchCriteria = searchCriteria;
  }

  getSearchCriteria() {
    return this.searchCriteria;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }


  /** This method will POST the data of search controls screen to backend **/
  fetchSearchControlList() {
    return this.httpClient.post(this.url, this.searchCriteria, appConstants.postHeaderOptions).
      map((controlsResults) => {
        return controlsResults;
      }).catch(this.handleError);

  }
}
