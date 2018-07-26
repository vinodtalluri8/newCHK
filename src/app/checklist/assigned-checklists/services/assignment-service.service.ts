import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';


@Injectable()
export class AssignmentServiceService extends BaseServiceService {
  private assignmentserverURL = environment.serverUrl + 'DIVA-ChecklistService/scheduleAssignment';
  private dataJson: any;

  constructor(private httpClient: HttpClient) {
    super();
  }
  getAssignmentDetail(param) {
    this.dataJson = {
      'checklistScheduleId': param
    };
   return this.httpClient
     .post(this.assignmentserverURL, this.dataJson).map((data) => {
       return data;
       }).catch(this.handleError);
       }


}
