import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { SelectItem } from 'primeng/api';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';

@Injectable()
export class ReportService extends BaseServiceService {
  private reportType: any;
  private reportTypeUrl = this.serverUrl + this.checklistServiceUrl + 'checklist/getReportType';
  private reportResultsUrl = this.serverUrl + this.checklistServiceUrl + 'reportResult';
//  this.serverUrl + this.commonServiceURL +
  constructor(private httpClient: HttpClient) {
    super();
   }

   setReportJson(data) {
    this.reportType = data;
  }

  getReportJson() {
    return this.reportType;
  }

    /** This method will get the data of report type dropdown
     * @returns report type list
    **/
   getReportType() {
    return this.httpClient
      .get(this.reportTypeUrl, appConstants.getHeaderOptions).map((report: SelectItem[]) => {
        const reportTypeList: SelectItem[] = [];
        for (const item of report) {
          reportTypeList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return reportTypeList;
      }).catch(this.handleError);
  }

  /** This method will POST the data of  new checklist schedule screen to backend
  * @returns report results
  */
  getReportResults(data) {
    console.log('inside getReportResults service n json is', data);
    return this.httpClient.post(this.reportResultsUrl, data, appConstants.postHeaderOptions).
      map((res: Response) => res).catch(this.handleError);
  }

}
