import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../services/base-service.service';
import 'rxjs/add/observable/throw';


@Injectable()
export class SearchChecklistService extends BaseServiceService {

  private searchCriteria: JSON;
  private url;

  getResultSearchCriteria() {
    return this.searchCriteria;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
  /** To get the data for the search checklist grid
   * @returns results
   */
  getSearchChecklistData(data: JSON) {
    this.url = environment.serverUrl + 'DIVA-ChecklistService/getDisplayChecklist';
    this.searchCriteria = data;
    return this.httpClient.post(this.url,
      data, appConstants.postHeaderOptions).map((results) => {
        return results;
      }).catch(this.handleError);
  }

  refreshResults() {
    return this.getSearchChecklistData(this.searchCriteria);
  }

  /* This method will get the data of department dropdown based on the group selected by passing the
    application name and the system code as input parameters*/
  deleteChecklist(value) {
    this.url = environment.serverUrl + 'DIVA-ChecklistService/deleteChecklist';
    const inputJson = {
      'checklistId' : value
    };
    return this.httpClient.post(this.url, inputJson, appConstants.postHeaderOptions).map((results) => {
      return results;
    }).catch(this.handleError);
  }

}
