import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SearchOnlineChecklistResultService extends BaseServiceService {
  private searchOnlineChecklistResultserverURL = this.serverUrl + this.checklistServiceUrl + 'searchOnlineChecklists';

  public searchCriteria;

  setSearchCriteria(searchCriteria) {
    this.searchCriteria = searchCriteria;
  }
  constructor(private httpClient: HttpClient) {
    super();
   }
   getSearchOnlineChecklistResult() {
    return this.httpClient
      .post(this.searchOnlineChecklistResultserverURL, this.searchCriteria, appConstants.postHeaderOptions).map((data) => {
        console.log('in component', data);
        return data;
        }).catch(this.handleError);
        }

}
