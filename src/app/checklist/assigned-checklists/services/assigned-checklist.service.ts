import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class AssignedChecklistService extends BaseServiceService {


  private url = environment.serverUrl + 'divachecklistservice/getDisplayChecklist';
  private urlMock = 'data/addControls-mock.json';

  constructor(private httpClient: HttpClient) {
    super();
  }
  /** to get the data for the scheduled Checklists
   * @ return scheduledResults
   */
  getScheduledChecklists(subType) {
    console.log( 'getScheduledChecklists inside');
    return this.httpClient.get(this.urlMock);
    // appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
    // return this.httpClient.get(this.url,
    //   appConstants.getHeaderOptions).map((scheduledResults) => {
    //     return scheduledResults;
    //   }).catch(this.handleError);
  }
  /** to get the data for the InProgress Checklists
 * @ return inProgressResults
 */
  getInProgressChecklists(subType) {
    return this.httpClient.get(this.urlMock);
    // appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
    // return this.httpClient.get(this.url,
    //   appConstants.getHeaderOptions).map((inProgressResults) => {
    //     return inProgressResults;
    //   }).catch(this.handleError);
  }
  /** to get the data for the FollowUp Checklists
 * @ return followUpResults
 */
  getFollowUpChecklists(subType) {
    return this.httpClient.get(this.urlMock);
    // appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
    // return this.httpClient.get(this.url,
    //   appConstants.getHeaderOptions).map((followUpResults) => {
    //     return followUpResults;
    //   }).catch(this.handleError);
  }
  /** to get the data for the Awaiting Checklists
 * @ return awaitingResults
 */
  getAwaitingChecklists(subType) {
    return this.httpClient.get(this.urlMock);
    // appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
    // return this.httpClient.get(this.url,
    //   appConstants.getHeaderOptions).map((awaitingResults) => {
    //     return awaitingResults;
    //   }).catch(this.handleError);
  }
  /** to get the data for the Closed Checklists
   * @ return closedResults
  */
  getClosedChecklists(subType) {
    return this.httpClient.get(this.urlMock);
  //   appConstants.getHeaderOptions.params = new HttpParams().set('inSubType', subType);
  //   return this.httpClient.get(this.url,
  //     appConstants.getHeaderOptions).map((closedResults) => {
  //       return closedResults;
  //     }).catch(this.handleError);
  }
}
