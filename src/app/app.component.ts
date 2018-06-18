/** This file is contains the business logic for app component level **/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Checklists';
  src = './assets/DIVA_Home.gif';
  headerStyle = 'header';
}
