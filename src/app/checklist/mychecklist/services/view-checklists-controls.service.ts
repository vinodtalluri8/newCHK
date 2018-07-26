import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { environment } from '../../../../environments/environment';
import { BaseServiceService } from './base-service.service';


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
  fetchViewCheckLists(routepath) {
    this.url = environment.serverUrl + 'DIVA-ChecklistService/getChecklistLinkData';
    if (routepath === 'Controls') {
      this.viewSearchCriteria['status'] = 'A';
    }
    return this.httpClient.post(this.url, this.viewSearchCriteria, appConstants.postHeaderOptions).
      map((viewResults) => {
        return viewResults;
      }).catch(this.handleError);

  }
  /* This method will refresh results*/
  refreshResults(routepath) {
    return this.fetchViewCheckLists(routepath);
  }

  /* This method will delete the control*/
  deleteControl(inputJson) {
    console.log('inputjson', inputJson);
    this.url = environment.serverUrl + 'DIVA-ChecklistService/deleteControlData/';

    return this.httpClient.post(this.url, inputJson, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  reorder(reorderJson) {
    console.log('reorderJson', reorderJson);
    this.url = environment.serverUrl + 'DIVA-ChecklistService/controlReOrder/';

    return this.httpClient.post(this.url, reorderJson, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

}
