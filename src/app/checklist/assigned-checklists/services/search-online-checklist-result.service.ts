import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SearchOnlineChecklistResultService extends BaseServiceService {
  private searchOnlineChecklistResultserverURL = environment.serverUrl + 'DIVA-ChecklistService/searchOnlineChecklists';

  public searchCriteria;

  setSearchCriteria(searchCriteria) {
    this.searchCriteria = searchCriteria;
  }
  constructor(private httpClient: HttpClient) {
    super();
   }
   getSearchOnlineChecklistResult() {
    return this.httpClient
      .post(this.searchOnlineChecklistResultserverURL, this.searchCriteria).map((data) => {
        console.log('in component', data);
        return data;
        }).catch(this.handleError);
        }

}
