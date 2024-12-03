import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSearchPopupComponent } from './users-search-popup.component';

describe('UsersSearchPopupComponent', () => {
  let component: UsersSearchPopupComponent;
  let fixture: ComponentFixture<UsersSearchPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersSearchPopupComponent]
    });
    fixture = TestBed.createComponent(UsersSearchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
