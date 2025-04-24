import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UsersSearchPopupComponent } from 'src/app/components/users-search-popup/users-search-popup.component';
import { AuthService } from 'src/app/services/auth.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html',
  styleUrls: ['./place-page.component.scss']
})
export class PlacePageComponent {
 photos = [
    { url: 'assets/photo1.jpg', alt: 'Foto 1' },
    { url: 'assets/photo2.jpg', alt: 'Foto 2' },
    { url: 'assets/photo3.jpg', alt: 'Foto 3' },
    // Puedes seguir añadiendo más fotos
  ];
  readonly dialog = inject(MatDialog)
  search:string = "";

  constructor() { }

  ngOnInit(): void {

   
    
  }
  searchUsers(): void {
    console.log(this.search);
    
    const dialogRef = this.dialog.open(UsersSearchPopupComponent, {
      data: {user_email: this.search},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 
}
