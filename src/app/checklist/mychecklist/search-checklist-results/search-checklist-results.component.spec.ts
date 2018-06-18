import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChecklistResultsComponent } from './search-checklist-results.component';

describe('SearchChecklistResultsComponent', () => {
  let component: SearchChecklistResultsComponent;
  let fixture: ComponentFixture<SearchChecklistResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChecklistResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChecklistResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
