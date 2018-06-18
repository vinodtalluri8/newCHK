import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-mychecklist',
  templateUrl: './mychecklist.component.html',
  styleUrls: ['./mychecklist.component.css']
})
export class MychecklistComponent implements OnInit {

  itemsPath: MenuItem[];
   home: MenuItem;


  constructor(private router: Router) {
    this.home = {icon: 'fa fa-home'};

    this.itemsPath = [
      { label: 'Checklist' }];



  }

  ngOnInit() {
  }

  /* This method will navigate  to addchecklist screen */
  addChecklist() {
    this.router.navigate(['/addchecklist']);
  }
  searchChecklist() {
    this.router.navigate(['../checklist/searchchecklist']);
  }
  searchControls() {
    this.router.navigate(['../control/searchcontrol']);
  }

}
