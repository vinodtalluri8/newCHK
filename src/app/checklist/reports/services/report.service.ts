import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {

  url = 'http://localhost:4200/data/dropdown-mock.json';
  constructor(private httpClient: HttpClient) { }

  getReport() {
    return this.httpClient.get(this.url);
  }
}
