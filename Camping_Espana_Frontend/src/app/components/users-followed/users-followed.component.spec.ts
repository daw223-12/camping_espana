import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFollowedComponent } from './users-followed.component';

describe('UsersFollowedComponent', () => {
  let component: UsersFollowedComponent;
  let fixture: ComponentFixture<UsersFollowedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersFollowedComponent]
    });
    fixture = TestBed.createComponent(UsersFollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
