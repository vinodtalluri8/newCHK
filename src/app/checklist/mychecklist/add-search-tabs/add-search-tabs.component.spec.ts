import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSearchTabsComponent } from './add-search-tabs.component';

describe('AddSearchTabsComponent', () => {
  let component: AddSearchTabsComponent;
  let fixture: ComponentFixture<AddSearchTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSearchTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSearchTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
