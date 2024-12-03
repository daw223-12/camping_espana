import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewNewPopupComponent } from '../review-new-popup/review-new-popup.component';
import { ReviewEditPopupComponent } from '../review-edit-popup/review-edit-popup.component';
import { ReviewService } from 'src/app/services/review.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PlaceService } from 'src/app/services/place.service';
import { AuthService } from 'src/app/services/auth.service';
import { auto } from '@popperjs/core';
import { Review } from 'src/app/models/review';
import { Place } from 'src/app/models/place';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.scss'],
})
export class ReviewContainerComponent implements OnInit {
  places!: Place[];
  myForm: FormGroup;
  ruta!: string;
  @ViewChildren('scores') scores!: QueryList<ElementRef>;
  @ViewChildren('comments', { read: ElementRef })
  comments!: QueryList<ElementRef<HTMLTextAreaElement>>;
  @ViewChildren('editButtons') editButtons!: QueryList<ElementRef>;

  readonly dialog = inject(MatDialog);
  reviewsPublished: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private placeService: PlaceService,
    private authService: AuthService
  ) {
    this.myForm = new FormGroup({
      groupArray: new FormArray([]),
    });

    this.route.url.subscribe((segments) => {
      this.ruta = segments.join('/');
    });
  }

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe({
      next: (res) => {
        this.places = res;
      },
    });
    this.authService.getUser().subscribe({
      next: (res) => {
        // this.user_id = res.id;
        this.fillReviewsPublished(res.id);
      },
    });
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  fillReviewsPublished(user_id: number) {
    this.reviewService.getReviewsByUser(user_id).subscribe({
      next: (res: Review[]) => {
        this.reviewsPublished = res;
        if (this.reviewsPublished != null) {
          this.reviewsPublished.forEach((element) => {
            const newGroup = new FormGroup({
              score: new FormControl({ value: element.score, disabled: true }),
              comment: new FormControl({
                value: element.comment,
                disabled: true,
              }),
            });
            (this.myForm.get('groupArray') as FormArray).push(newGroup);
          });
        }
      },
    });
  }

  openNewReview(): void {
    const dialogRef = this.dialog.open(ReviewNewPopupComponent, {
      data: { places: this.places },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        const data = {
          place_id: result.place_id,
          score: result.score,
          comment: result.comment,
        };
        this.reviewService.postReview(data).subscribe({
          next: (res) => {
            this.addReviewtoForm(result);
          },
        });
      }
    });
  }

  openEditReview(index: number): void {
    const dialogRef = this.dialog.open(ReviewEditPopupComponent, {
      data: { place_id: this.places[index].id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const originalScore = this.scores.toArray()[index]?.nativeElement.value;
      const originalComment = this.comments.get(index)?.nativeElement.value;
      if (result.delete) {
        this.deleteReview(index);
      } else if (
        result.score != originalScore ||
        result.comment != originalComment
      ) {
        const data = {
          place_id: this.reviewsPublished[index].place_id,
          score: result.score,
          comment: result.comment,
        };

        this.reviewService.updateReview(data).subscribe({
          next: (res) => {
            console.log(res);
            this.updateReviewForm(result, index);
          },
        });
      }
    });
  }

  updateReviewForm(reviewData: any, index: number) {
    const scoreElement = this.scores.toArray()[index]?.nativeElement;
    const commentElement = this.comments.get(index)?.nativeElement;

    if (scoreElement) {
      scoreElement.value = reviewData.score;
    }
    if (commentElement) {
      commentElement.value = reviewData.comment;
    }
  }

  addReviewtoForm(reviewData: any) {
    const newGroup = new FormGroup({
      score: new FormControl({ value: reviewData.score, disabled: true }),
      comment: new FormControl({ value: reviewData.comment, disabled: true }),
    });
    (this.myForm.get('groupArray') as FormArray).push(newGroup);
  }

  deleteReview(index: number) {
    var inputsArray = (this.myForm.get('groupArray') as FormArray);
    
    this.reviewService.deleteReview(this.reviewsPublished[index].place_id).subscribe({
      next: (res) => {
        inputsArray.removeAt(index);
        
      }
    })
    
  }
}
