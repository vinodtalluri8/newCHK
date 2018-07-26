import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { appConstants } from '../../../core/constants/appConstants';
import { BaseServiceService } from '../../mychecklist/services/base-service.service';
import { environment } from '../../../../environments/environment';
import { MenuItem, SelectItem, Message } from 'primeng/api';
const allOption = { label: 'All', value: 'A' };

@Injectable()
export class StatusSearchOnlineChecklistService extends BaseServiceService {
  private onlineChecklistStatusserverURL = environment.serverUrl + '/DIVA-CommonService/searchOnlineChecklist/getStatusList';
  constructor(private httpClient: HttpClient) {
    super();
  }
  getstatus() {
    appConstants.getHeaderOptions.params = new HttpParams().set('inType', 'CHECKLIST_PEOPLE').set('inSubType', 'GIST');
    return this.httpClient
      .get(this.onlineChecklistStatusserverURL, appConstants.getHeaderOptions).map((status: SelectItem[]) => {
        const onlineChecklistStatusList: any = [];
        onlineChecklistStatusList.push(allOption);
        for (const item of status) {
          onlineChecklistStatusList.push({ 'label': item['id'], 'value': item['value'] });
        }
        return onlineChecklistStatusList;
      }).catch(this.handleError);
    // .catch(this.handleError) add this code before semicolon in above line
  }
}
