import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-add-search-tabs',
  templateUrl: './add-search-tabs.component.html',
  styleUrls: ['./add-search-tabs.component.css']
})
export class AddSearchTabsComponent implements OnInit {

  data: string;
  itemsPath: { label: string; }[];
  home: MenuItem;

  constructor(private router: Router) {
    this.home = {icon: 'fa fa-home'};

    this.itemsPath = [
    { label: 'Checklists' },
    { label: 'Add & Search' },
    { label: 'Add Checklist' }];
  }

  ngOnInit() {

  }

  /* This method will navigate  to addchecklist screen */
  addChecklist() {
    this.router.navigate(['addSearch/addchecklist']);
  }

  routeToControls() {
    this.router.navigate(['addSearch/mychecklist/controls']);
  }
  routeToChecklists() {
    this.router.navigate(['addSearch/mychecklist']);
  }
  searchChecklist() {
    this.router.navigate(['addSearch/mychecklist']);
  }


}
