import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupService {


  url="http://localhost:4200/data/dropdown-mock.json";
  constructor(private httpClient: HttpClient) { }

  getGroup() {
    return this.httpClient.get(this.url);
  }
}
