import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenuItemsComponent } from './navbar-menu-items.component';

describe('NavbarMenuItemsComponent', () => {
  let component: NavbarMenuItemsComponent;
  let fixture: ComponentFixture<NavbarMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
