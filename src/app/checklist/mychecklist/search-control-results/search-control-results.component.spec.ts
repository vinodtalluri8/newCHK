import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchControlResultsComponent } from './search-control-results.component';

describe('SearchControlResultsComponent', () => {
  let component: SearchControlResultsComponent;
  let fixture: ComponentFixture<SearchControlResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchControlResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchControlResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
