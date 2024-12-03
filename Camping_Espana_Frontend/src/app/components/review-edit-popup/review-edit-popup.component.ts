import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';import { Place } from 'src/app/models/place';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-edit-popup',
  templateUrl: './review-edit-popup.component.html',
  styleUrls: ['./review-edit-popup.component.scss']
})
export class ReviewEditPopupComponent {
  //readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  options: { value: string; label: string }[] = [];
  reviewData = {
    score: 0,
    comment: ''
  };

  constructor(public dialogRef: MatDialogRef<ReviewEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private reviewService: ReviewService,) {
      // console.log("DATA PASADA", data.places);
      
      if (Array.isArray(data.places) )
      {
        data.places.forEach((element: Place) => {
          console.log(element);
          
          this.options.push({value: element.id.toString(), label: element.name })
        });
      }
  }

  delete() {
    this.reviewService.deleteReview(Math.round(this.data.place_id)).subscribe({
      next: (res) => {
        this.dialogRef.close({delete: true})
      },
    });
  }

  // Método para manejar el submit
  submit(): void {
    this.reviewData.score = Math.round(this.reviewData.score/10);
      this.dialogRef.close(this.reviewData); 
  }
}
