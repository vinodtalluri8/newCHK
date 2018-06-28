import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {

  url = 'data/dropdown-mock.json';
  constructor(private httpClient: HttpClient) { }

  getReport() {
    return this.httpClient.get(this.url);
  }

}
