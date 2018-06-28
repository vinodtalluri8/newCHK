import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';
import { BaseServiceService } from './base-service.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class ViewChecklistsControlsService extends BaseServiceService {

  public viewSearchCriteria;
  private url = environment.serverUrl + 'DIVA-ChecklistService/getChecklistLinkData';

  setViewSearchCriteria(viewSearchCriteria) {
    this.viewSearchCriteria = viewSearchCriteria;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }


  /** This method will POST the data for fetch checklists**/
  fetchViewCheckLists() {
    return this.httpClient.post(this.url, this.viewSearchCriteria, appConstants.postHeaderOptions).
      map((viewResults) => {
        return viewResults;
      }).catch(this.handleError);

  }

}
