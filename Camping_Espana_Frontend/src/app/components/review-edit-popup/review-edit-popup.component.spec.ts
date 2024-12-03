import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEditPopupComponent } from './review-edit-popup.component';

describe('ReviewEditPopupComponent', () => {
  let component: ReviewEditPopupComponent;
  let fixture: ComponentFixture<ReviewEditPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewEditPopupComponent]
    });
    fixture = TestBed.createComponent(ReviewEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
