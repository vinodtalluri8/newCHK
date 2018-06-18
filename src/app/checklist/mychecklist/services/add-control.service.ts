import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddControlService {

  constructor(private httpClient: HttpClient) { }

}
