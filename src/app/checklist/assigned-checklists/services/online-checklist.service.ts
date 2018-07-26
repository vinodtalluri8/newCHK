import { Injectable } from '@angular/core';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class OnlineChecklistService extends BaseServiceService {
  private additionalCommentsURL;
  private updateStatusURL;
  private onlineChecklistsURL;
  private rowData: any;
  private checklistJson: any;
  private controlJson: any;
  private commentsJson: any;

  /*to set control required data*/
  setControlJson(controlVal) {
    this.controlJson = controlVal;
  }
  /*to get control required data */
  getControlJson() {
    return this.controlJson;
  }
  /*to set checklist required data*/
  setChecklistJson(values) {
    this.checklistJson = values;
  }
  /*to get checklist required data*/
  getChecklistJson() {
    return this.checklistJson;
  }
  /*to set data*/
  setRowData(data) {
    this.rowData = data;
  }
  /*to get data*/
  getRowData() {
    return this.rowData;
  }
  /*to set comments required data*/
  setCommentsJson(comments) {
    this.commentsJson = comments;
  }
  /*to get comments required data*/
  getCommentsJson() {
    return this.commentsJson;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will POST the additional comments **/
  addAdditionalComments(data: any) {
    this.additionalCommentsURL = environment.serverUrl + 'DIVA-ChecklistService/addAdditionalComment';
    return this.httpClient.post(this.additionalCommentsURL, data,
      appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will POST the data from update checklist status to backend **/
  updateChecklistStatus(data: any) {
    this.updateStatusURL = environment.serverUrl + 'DIVA-ChecklistService/addAdditionalComment';
    return this.httpClient.post(this.updateStatusURL, data,
      appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will POST the data for fetch,view,update online checklists control **/
  fetchUpdateViewOnlineCheckLists(checklistsSearchCriteria) {
    this.onlineChecklistsURL = environment.serverUrl + 'DIVA-ChecklistService/viewChecklistItems';
    return this.httpClient.post(this.onlineChecklistsURL, checklistsSearchCriteria, appConstants.postHeaderOptions).
      map((viewControls) => {
        return viewControls;
      }).catch(this.handleError);
  }
}
