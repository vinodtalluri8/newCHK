import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnlineChecklistComponent } from './search-online-checklist.component';

describe('SearchOnlineChecklistComponent', () => {
  let component: SearchOnlineChecklistComponent;
  let fixture: ComponentFixture<SearchOnlineChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOnlineChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOnlineChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
