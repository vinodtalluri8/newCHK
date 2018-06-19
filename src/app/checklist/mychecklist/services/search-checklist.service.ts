import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import {BaseServiceService} from '../services/base-service.service';


@Injectable()
export class SearchChecklistService extends BaseServiceService {
  public resultSearch: any[];
  private url = environment.serverUrl + 'divachecklistservice/getDisplayChecklist';

  getResultSearch() {
    return this.resultSearch;
  }

  setResultsSearch(results) {
    this.resultSearch = results;
  }
  constructor(private httpClient: HttpClient) {
    super();
   }

  getSearchChecklistData(data: JSON) {
    return this.httpClient.post(this.url,
      data, appConstants.postHeaderOptions).map((results) => {
                return results;
      }).catch(this.handleError);
  }

}
