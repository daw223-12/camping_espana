import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  constructor(private auth: AuthService) { }
  ngOnInit(): void {

    this.auth.getUser().subscribe({next: res => {
      console.log(res); 
    }})
    
  }
}
