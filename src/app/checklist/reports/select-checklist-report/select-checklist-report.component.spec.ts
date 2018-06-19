import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChecklistReportComponent } from './select-checklist-report.component';

describe('SelectChecklistReportComponent', () => {
  let component: SelectChecklistReportComponent;
  let fixture: ComponentFixture<SelectChecklistReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectChecklistReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChecklistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
