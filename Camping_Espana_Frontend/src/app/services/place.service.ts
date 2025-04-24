import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ApiRoutes as api } from './../globals';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl: string = api.DEVELOP_AUTH_URL;
  private csrfUrl = api.DEVELOP_CSRF_URL;
  private apiUrl = api.DEVELOP_API_URL+'/places';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getCsrfToken(): Observable<any> {
    return this.http.get(this.csrfUrl, { withCredentials: true });
  }

  getPlaces(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders({
          'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
        });
        return this.http.get(this.apiUrl, { headers: headers, withCredentials: true });
      })
    );
  }
}
