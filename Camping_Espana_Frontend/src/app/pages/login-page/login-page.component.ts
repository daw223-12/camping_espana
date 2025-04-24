import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JcylTurismoService } from 'src/app/services/jcyl-turismo.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  ruta!: string;

  constructor(private route: ActivatedRoute, private jcylTurismo: JcylTurismoService) { }
  
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.ruta = segments.join('/');
    });
    // this.jcylTurismo.getData().subscribe({
    //   next: (data) => {console.log(data)}
    // })
    this.jcylTurismo.getCampings(
      'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/registro-de-turismo-de-castilla-y-leon/records',
      { refine: 'establecimiento:"Campings"'}
    ).subscribe({
      next: (data) => {
        console.log(data[111])
      }
    })
  }
}

