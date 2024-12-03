import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';import { Place } from 'src/app/models/place';
import { ReviewService } from 'src/app/services/review.service';
;

@Component({
  selector: 'app-review-new-popup',
  templateUrl: './review-new-popup.component.html',
  styleUrls: ['./review-new-popup.component.scss']
})
export class ReviewNewPopupComponent {
  //readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  options: { value: string; label: string }[] = [];
  reviewData = {
    place_id: '',
    score: 0,
    comment: ''
  };

  constructor(public dialogRef: MatDialogRef<ReviewNewPopupComponent>, reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      if (Array.isArray(data.places) )
      {
        data.places.forEach((element: Place) => {
          
          this.options.push({value: element.id.toString(), label: element.name })
        });
      }
  }

  // Método para cerrar el diálogo
  close(): void {
    this.dialogRef.close();
    
  }

  // Método para manejar el submit
  submit(): void {
    this.reviewData.score = Math.round(this.reviewData.score/10);
    if(this.reviewData.place_id!=""){
      this.dialogRef.close(this.reviewData); 
    }
  }
}
