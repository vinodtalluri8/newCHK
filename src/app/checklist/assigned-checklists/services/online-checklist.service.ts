import { Injectable } from '@angular/core';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
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
  private attachmentJson: any;
  private attachmentsURL;
  private updateURL;
  private completeURL;
  private startChecklistURL;
  private updateStatusJson: any;
  private reviewStatusJson: any;
  private reviewURL;
  private deleteAttachmentUrl;
  private addAttachmentUrl;

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
  /*to set attachments required data*/
  setAttachmentJson(attachments) {
    this.attachmentJson = attachments;
  }
  /*to get attachments required data*/
  getAttachmentJson() {
    return this.attachmentJson;
  }

  /*to set status update required data*/
  setUpdateStatusJson(updateStatusJson) {
    this.updateStatusJson = updateStatusJson;
  }
  /*to get status update required data*/
  getUpdateStatusJson() {
    return this.updateStatusJson;
  }

  /*to set status update required data*/
  setReviewStatusJson(review) {
    this.reviewStatusJson = review;
  }
  /*to get status update required data*/
  getReviewStatusJson() {
    return this.reviewStatusJson;
  }


  constructor(private httpClient: HttpClient) {
    super();
  }

  /** This method will POST the additional comments **/
  addAdditionalComments(data: any) {
    this.additionalCommentsURL = this.serverUrl + this.checklistServiceUrl + 'addAdditionalComment';
    return this.httpClient.post(this.additionalCommentsURL, data,
      appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will POST the data from update checklist status to backend **/
  updateChecklistStatus(data) {
    this.updateStatusURL = this.serverUrl + this.checklistServiceUrl + 'updateChecklistStatus';
    return this.httpClient.post(this.updateStatusURL, data,
      appConstants.postHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will POST the data for fetch,view,update online checklists control **/
  fetchUpdateViewOnlineCheckLists(checklistsSearchCriteria) {
    this.onlineChecklistsURL = this.serverUrl + this.checklistServiceUrl + 'viewChecklistItems';
    return this.httpClient.post(this.onlineChecklistsURL, checklistsSearchCriteria, appConstants.postHeaderOptions).
      map((viewControls) => {
        return viewControls;
      }).catch(this.handleError);
  }

  /** This method will get attachments for  online checklists control **/
  fetchControlAttachments(attachmentCriteria) {
    this.attachmentsURL = this.serverUrl + this.checklistServiceUrl + 'viewChecklistAttachments';
    return this.httpClient.post(this.attachmentsURL, attachmentCriteria, appConstants.postHeaderOptions).
      map((getAttachments) => {
        return getAttachments;
      }).catch(this.handleError);
  }

  /** This method will modify the data of control details**/
  updateChecklistControl(data) {
    this.updateURL = this.serverUrl + this.checklistServiceUrl + 'updateChecklistItem';
    return this.httpClient.put(this.updateURL, data, appConstants.putHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }
  /** This method will perform complete action**/
  completeControl(data) {
    this.completeURL = this.serverUrl + this.checklistServiceUrl + 'completeChecklistItem';
    return this.httpClient.put(this.completeURL, data, appConstants.putHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }

  /** This method will perform start checklist**/
  startChecklist(data) {
    this.startChecklistURL = this.serverUrl + this.checklistServiceUrl + 'startChecklist';
    return this.httpClient.post(this.startChecklistURL, data, appConstants.postHeaderOptions)
      .map((res: Response) => res).catch(this.handleError);
  }

  /** This method will POST the data from review checklist status to backend **/
  reviewChecklist(data) {
    this.reviewURL = this.serverUrl + this.checklistServiceUrl + 'reviewChecklistItem';
    return this.httpClient.put(this.reviewURL, data,
      appConstants.putHeaderOptions).map((res: Response) => res).catch(this.handleError);
  }
  /** This method will add the attachments**/
  addAttachments(data) {
    this.addAttachmentUrl =  this.serverUrl + this.checklistServiceUrl + 'addAttachment';
    return this.httpClient.post(this.addAttachmentUrl, data, appConstants.postHeaderOptions).map((res:
      Response) => res).catch(this.handleError);
  }
   /** This method will delete the attachments**/
   deleteAttachments(data) {
    this.deleteAttachmentUrl =  this.serverUrl + this.checklistServiceUrl + 'deleteAttachment';
    return this.httpClient.post(this.deleteAttachmentUrl, data, appConstants.postHeaderOptions).map((res:
      Response) => res).catch(this.handleError);
  }
}
