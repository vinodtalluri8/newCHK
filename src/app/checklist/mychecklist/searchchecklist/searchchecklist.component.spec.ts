import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchchecklistComponent } from './searchchecklist.component';

describe('SearchchecklistComponent', () => {
  let component: SearchchecklistComponent;
  let fixture: ComponentFixture<SearchchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
