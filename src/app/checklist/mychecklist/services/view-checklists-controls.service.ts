import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from './base-service.service';


@Injectable()
export class ViewChecklistsControlsService extends BaseServiceService {

  public viewSearchCriteria;
  private reportSearchCriteria;
  private url = this.serverUrl + this.checklistServiceUrl + 'getChecklistLinkData';

  setViewSearchCriteria(viewSearchCriteria) {
    this.viewSearchCriteria = viewSearchCriteria;
  }
  setReportSearchCriteria(reportSearchCriteria) {
    this.reportSearchCriteria = reportSearchCriteria;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }


  /** This method will POST the data for fetch checklists**/
  fetchViewCheckLists(routepath) {
    this.url = this.serverUrl + this.checklistServiceUrl + 'getChecklistLinkData';
    if (routepath === 'Controls') {
      this.viewSearchCriteria['status'] = 'A';
    } else if (routepath === 'Reports') {
      this.viewSearchCriteria = this.reportSearchCriteria;
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
    this.url = this.serverUrl + this.checklistServiceUrl + 'deleteControlData/';

    return this.httpClient.post(this.url, inputJson, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  reorder(reorderJson) {
    console.log('reorderJson', reorderJson);
    this.url = this.serverUrl + this.checklistServiceUrl + 'controlReOrder/';

    return this.httpClient.post(this.url, reorderJson, appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

}
