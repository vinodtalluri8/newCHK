import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnlineChecklistResultComponent } from './search-online-checklist-result.component';

describe('SearchOnlineChecklistResultComponent', () => {
  let component: SearchOnlineChecklistResultComponent;
  let fixture: ComponentFixture<SearchOnlineChecklistResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOnlineChecklistResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOnlineChecklistResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
