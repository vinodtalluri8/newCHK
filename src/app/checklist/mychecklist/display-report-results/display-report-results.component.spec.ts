import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReportResultsComponent } from './display-report-results.component';

describe('DisplayReportResultsComponent', () => {
  let component: DisplayReportResultsComponent;
  let fixture: ComponentFixture<DisplayReportResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayReportResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayReportResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
