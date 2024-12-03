import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNewPopupComponent } from './review-new-popup.component';

describe('ReviewNewPopupComponent', () => {
  let component: ReviewNewPopupComponent;
  let fixture: ComponentFixture<ReviewNewPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewNewPopupComponent]
    });
    fixture = TestBed.createComponent(ReviewNewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
