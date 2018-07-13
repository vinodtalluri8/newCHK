import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchScheduleResultsComponent } from './search-schedule-results.component';

describe('SearchScheduleResultsComponent', () => {
  let component: SearchScheduleResultsComponent;
  let fixture: ComponentFixture<SearchScheduleResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchScheduleResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchScheduleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
