import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AssignedChecklistService {


  url = 'http://localhost:4200/data/addControls-mock.json';
  constructor(private httpClient: HttpClient) { }

  getassignedChecklist() {
    return this.httpClient.get(this.url);
  }
}
