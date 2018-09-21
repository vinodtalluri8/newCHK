import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import { appConstants } from '../../../core/constants/appConstants';


@Injectable()
export class AssignmentServiceService extends BaseServiceService {
  private assignmentserverURL = this.serverUrl + this.checklistServiceUrl + 'scheduleAssignment';
  private dataJson: any;

  constructor(private httpClient: HttpClient) {
    super();
  }
  getAssignmentDetail(param) {
    this.dataJson = {
      'checklistScheduleId': param
    };
   return this.httpClient
     .post(this.assignmentserverURL, this.dataJson, appConstants.postHeaderOptions).map((data) => {
       return data;
       }).catch(this.handleError);
       }


}
