import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { appConstants } from '../../../core/constants/appConstants';


@Injectable()
export class SearchChecklistService {
public resultSearch: any[];
url = environment.serverUrl + 'divachecklistservice/getDisplayChecklist';

// setResults() {
//   this.results = this.results;
// }

getResultSearch() {
  return this.resultSearch;
}

setResultsSearch(results) {
  this.resultSearch = results;
}

  // searchresultdata: any;

  // private serverURL = environment.serverUrl + '/checklistservice/addChecklistDetails';
    constructor(private httpClient: HttpClient) { }

  // getSearchChecklistData(data: JSON) {
  //   return this.httpClient.post(this.url,
  //     data, appConstants.postHeaderOptions).map((results: JSON[]) => results);
  // }


  getSearchChecklistData(data: JSON) {
    return this.httpClient.post(this.url,
      data, appConstants.postHeaderOptions).map((results) => {
        console.log( 'results', results );
        return results;
      });
  }

}
